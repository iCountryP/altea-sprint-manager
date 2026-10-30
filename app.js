/* ALTEA Sprint Manager — aplicación estática, sin dependencias externas.
   Demo: localStorage. Equipo: RPC de Supabase, con comprobación de clave en SQL. */
(() => {
  'use strict';
  const STORAGE_TASKS = 'altea-sprint01-tasks-v1';
  const STORAGE_CONNECTION = 'altea-sprint01-connection-v1';
  const STORAGE_NAME = 'altea-sprint01-name-v1';
  const STATUSES = [
    { key: 'todo', name: 'TODO', subtitle: 'Pendiente de empezar', icon: '○' },
    { key: 'doing', name: 'IN PROGRESS', subtitle: 'En desarrollo', icon: '◉' },
    { key: 'testing', name: 'TESTING', subtitle: 'Listo para validar', icon: '◇' },
    { key: 'done', name: 'DONE', subtitle: 'Validado y entregado', icon: '✓' }
  ];
  const $ = id => document.getElementById(id);
  const safe = input => String(input ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
  const clone = data => JSON.parse(JSON.stringify(data));
  const seed = clone(window.ALTEA_SEED || []);
  const validStatus = value => STATUSES.some(s => s.key === value) ? value : 'todo';
  const initialLocal = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_TASKS));
      if (!Array.isArray(parsed)) return clone(seed);
      return seed.map(t => ({ ...t, ...(parsed.find(v => v.code === t.code) || {}) }));
    } catch { return clone(seed); }
  };
  const restoreConnection = () => {
    const fragment = new URLSearchParams(location.hash.replace(/^#/, ''));
    if (fragment.get('url') && fragment.get('api') && fragment.get('board') && fragment.get('key')) {
      return { url: fragment.get('url'), api: fragment.get('api'), board: fragment.get('board'), key: fragment.get('key') };
    }
    try { return JSON.parse(localStorage.getItem(STORAGE_CONNECTION)); } catch { return null; }
  };
  const state = {
    tasks: initialLocal(), mode: 'demo', online: false, connection: restoreConnection(),
    actor: localStorage.getItem(STORAGE_NAME) || '',
    view: 'board', query: '', module: '', owner: '', editingCode: null,
    saving: false, polling: false, dragCode: null, noticeDismissed: false
  };
  let toastTimeout;
  function toast(message, error = false) {
    const el = $('toast');
    el.textContent = message; el.classList.toggle('error', error); el.classList.add('visible');
    clearTimeout(toastTimeout); toastTimeout = setTimeout(() => el.classList.remove('visible'), 3400);
  }
  function taskCount(status) { return state.tasks.filter(task => task.status === status).length; }
  function ownerNames() { return [...new Set(state.tasks.map(t => t.owner?.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b)); }
  function selectedTasks() {
    const query = state.query.trim().toLocaleLowerCase();
    return state.tasks.filter(task => {
      if (state.module && !(task.modules || []).includes(state.module)) return false;
      if (state.owner && (task.owner || '') !== state.owner) return false;
      return !query || [task.code, task.category, task.title, task.description, task.owner, task.notes]
        .join(' ').toLocaleLowerCase().includes(query);
    });
  }
  function prettyStatus(status) { return STATUSES.find(s => s.key === status)?.name || 'TODO'; }
  function categoryClass(category) {
    if (category === 'DESKTOP') return 'desktop';
    if (category === 'GIT') return 'git';
    if (category === 'DISSENY') return 'design';
    if (category === 'APP + SRV') return 'full';
    if (category.startsWith('SRV')) return 'srv';
    return '';
  }
  function renderCard(t) {
    return `<article class="task-card" data-code="${safe(t.code)}" draggable="true" role="button" tabindex="0" aria-label="Editar tarea ${safe(t.code)}: ${safe(t.title)}">
      <div class="card-top"><span class="card-code">#${safe(t.code)}</span><span class="card-label ${categoryClass(t.category)}">${safe(t.category)}</span></div>
      <h3>${safe(t.title)}</h3><p class="card-description">${safe(t.description)}</p>
      <div class="card-modules">${(t.modules || []).map(m => `<span>${safe(m)}</span>`).join('')}</div>
      <div class="card-divider"></div>
      <div class="card-bottom"><div class="card-owner"><span class="mini-avatar ${t.owner ? '' : 'unassigned'}">${safe(t.owner ? t.owner.charAt(0).toUpperCase() : '–')}</span><span class="owner-name">${safe(t.owner || 'Sin asignar')}</span></div>
      ${t.priority !== 'normal' ? `<span class="priority-dot ${safe(t.priority)}" title="Prioridad ${safe(t.priority)}"></span>` : ''}
      <span class="card-hours"><svg><use href="#i-clock"/></svg>${safe(t.hours)}h</span></div></article>`;
  }
  function renderBoard() {
    const visible = selectedTasks();
    $('kanbanBoard').innerHTML = STATUSES.map(s => {
      const tasks = visible.filter(t => t.status === s.key).sort((a,b)=>a.code.localeCompare(b.code));
      return `<section class="kanban-column" data-status="${s.key}"><div class="column-head"><span class="column-indicator"></span><span class="column-title">${s.name}</span><span class="column-count">${tasks.length}</span></div><p class="column-subtitle">${s.subtitle}</p>
        <div class="card-list">${tasks.length ? tasks.map(renderCard).join('') : '<div class="empty-column"><span>✦</span>No hay tareas aquí<br>¡Arrastra una para empezar!</div>'}</div></section>`;
    }).join('');
    for (const card of $('kanbanBoard').querySelectorAll('.task-card')) {
      card.addEventListener('click', () => openTask(card.dataset.code));
      card.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openTask(card.dataset.code); } });
      card.addEventListener('dragstart', ev => {
        state.dragCode = card.dataset.code;
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.setData('text/plain', state.dragCode);
        requestAnimationFrame(() => card.classList.add('dragging'));
      });
      card.addEventListener('dragend', () => { state.dragCode = null; card.classList.remove('dragging'); clearDragTargets(); });
    }
    for (const column of $('kanbanBoard').querySelectorAll('.kanban-column')) {
      column.addEventListener('dragover', ev => { if (!state.dragCode) return; ev.preventDefault(); ev.dataTransfer.dropEffect = 'move'; column.classList.add('drag-target'); });
      column.addEventListener('dragleave', ev => { if (!column.contains(ev.relatedTarget)) column.classList.remove('drag-target'); });
      column.addEventListener('drop', async ev => {
        ev.preventDefault(); const code = ev.dataTransfer.getData('text/plain') || state.dragCode;
        clearDragTargets(); state.dragCode = null;
        if (code) await changeStatus(code, column.dataset.status);
      });
    }
  }
  function clearDragTargets() { document.querySelectorAll('.drag-target').forEach(e => e.classList.remove('drag-target')); }
  function renderList() {
    const visible = selectedTasks();
    $('listView').innerHTML = `<div class="list-head"><span>CÓDIGO</span><span>TAREA</span><span>ESTADO</span><span>RESPONSABLE</span><span>HORAS</span><span>ÁREA</span></div>` +
      (visible.length ? visible.map(t => `<div class="list-row" tabindex="0" role="button" data-code="${safe(t.code)}"><span class="list-code">#${safe(t.code)}</span><strong>${safe(t.title)}</strong><span class="list-state ${safe(t.status)}">${prettyStatus(t.status)}</span><span>${safe(t.owner || 'Sin asignar')}</span><span>${safe(t.hours)} h</span><span>${safe(t.category)}</span></div>`).join('') : '<div class="list-empty">No hay tareas que coincidan con los filtros.</div>');
    for (const row of $('listView').querySelectorAll('.list-row')) {
      row.addEventListener('click', () => openTask(row.dataset.code));
      row.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openTask(row.dataset.code); } });
    }
  }
  function renderFilterOptions() {
    const select = $('ownerFilter'); const current = select.value || state.owner;
    const owners = ownerNames();
    select.innerHTML = '<option value="">Todos</option>' + owners.map(name=>`<option value="${safe(name)}">${safe(name)}</option>`).join('');
    if (owners.includes(current)) select.value = current; else { select.value = ''; state.owner = ''; }
    $('ownerSuggestions').innerHTML = owners.map(name=>`<option value="${safe(name)}"></option>`).join('');
  }
  function renderSummary() {
    const done = taskCount('done'); const count = state.tasks.length;
    const percentage = count ? Math.round(100*done/count) : 0;
    const totalHours = state.tasks.filter(t=>t.status==='done').reduce((sum,t)=>sum+(Number(t.hours)||0),0);
    $('progressPercent').textContent = `${percentage}%`;
    $('heroProgress').style.width = `${percentage}%`; $('sideProgress').style.width = `${percentage}%`;
    $('sideCount').textContent = `${done} de ${count} tareas`;
    $('statDone').innerHTML = `${String(done).padStart(2,'0')}<span class="stat-total">/${count}</span>`;
    $('statHours').innerHTML = `${String(totalHours).padStart(2,'0')}<span class="stat-suffix"> h</span>`;
    $('totalTasksLabel').textContent = `(${count})`;
    $('footerStatus').textContent = `${count} tareas · ${done} completadas · ${state.tasks.reduce((sum,t)=>sum+(Number(t.hours)||0),0)} h estimadas`;
    const owners = ownerNames();
    $('teamCount').textContent = `${owners.length} responsable${owners.length===1?'':'s'}`;
    $('teamAvatars').innerHTML = owners.length ? owners.slice(0,5).map(name=>`<span class="team-avatar" title="${safe(name)}">${safe(name.charAt(0).toUpperCase())}</span>`).join('') : '<span class="team-avatar">A</span>';
    $('profileButton').textContent = (state.actor || 'T').charAt(0).toUpperCase();
  }
  function renderConnection() {
    const badge = $('connectionBadge'); badge.classList.toggle('online', state.mode==='cloud' && state.online);
    badge.classList.toggle('error', state.mode==='cloud' && !state.online);
    $('connectionText').textContent = state.mode==='demo' ? 'Modo demostración' : state.online ? 'Equipo sincronizado' : 'Sin conexión';
    $('connectButtonLabel').textContent = state.mode==='demo' ? 'Activar colaboración' : 'Configurar conexión';
    $('syncLabel').textContent = state.mode==='demo' ? 'Guardado local' : state.online ? 'Sincroniza cada 8 s' : 'Conexión interrumpida';
    const notice = $('cloudNotice'); notice.classList.toggle('online', state.mode==='cloud' && state.online);
    notice.classList.toggle('error', state.mode==='cloud' && !state.online);
    if (state.mode==='cloud' && state.online) notice.innerHTML = `<span class="notice-icon">✓</span><span><strong>Tablero compartido activo.</strong> Los cambios se guardan en la nube y el resto del equipo los recibe automáticamente en unos segundos.</span><button id="noticeDismiss" title="Cerrar aviso" aria-label="Cerrar aviso">×</button>`;
    else if (state.mode==='cloud') notice.innerHTML = `<span class="notice-icon">!</span><span><strong>No se puede acceder al tablero.</strong> Comprueba la conexión y la clave. Por seguridad, la edición está bloqueada mientras no haya conexión.</span><button id="noticeDismiss" title="Cerrar aviso" aria-label="Cerrar aviso">×</button>`;
    else notice.innerHTML = `<span class="notice-icon">✦</span><span><strong>Modo de prueba:</strong> puedes mover, editar y asignar tareas. Los cambios se guardan en este navegador. Para que todos vean lo mismo, activa la colaboración.</span><button id="noticeDismiss" title="Cerrar aviso" aria-label="Cerrar aviso">×</button>`;
    notice.hidden = state.noticeDismissed;
    $('noticeDismiss').addEventListener('click', () => { state.noticeDismissed = true; notice.hidden=true; });
  }
  function render() {
    renderSummary(); renderFilterOptions(); renderConnection();
    const isList = state.view === 'list'; $('listView').hidden = !isList; $('kanbanBoard').hidden = isList;
    $('viewTitle').innerHTML = `${isList ? 'Listado de tareas' : 'Tablero de tareas'} <span id="totalTasksLabel">(${state.tasks.length})</span>`;
    $('navBoard').classList.toggle('selected', !isList); $('navList').classList.toggle('selected', isList);
    renderBoard(); renderList();
  }
  function openOverlay(id) { $(id).hidden = false; document.body.style.overflow='hidden'; }
  function closeOverlay(id) { $(id).hidden = true; document.body.style.overflow=''; if (id==='taskOverlay') state.editingCode=null; }
  function closeTopOverlay() { const opened = [...document.querySelectorAll('.modal-backdrop:not([hidden])')].pop(); if (opened) closeOverlay(opened.id); }
  function openTask(code) {
    const t = state.tasks.find(t=>t.code===code); if (!t) return;
    state.editingCode=code;
    $('taskCode').textContent = `TAREA #${t.code} · ${t.category}`;
    $('taskModalTitle').textContent = t.title;
    $('taskDescription').textContent = t.description;
    $('taskFacts').innerHTML = (t.modules || []).map(m=>`<span>${safe(m)}</span>`).join('') + `<span>⏱ ${safe(t.hours)} h estimadas</span>`;
    $('taskStatus').value=validStatus(t.status); $('taskPriority').value=t.priority || 'normal';
    $('taskOwner').value=t.owner||''; $('taskNotes').value=t.notes||'';
    $('taskUpdated').textContent = t.updated_by ? `Último cambio: ${t.updated_by}${t.updated_at ? ' · ' + new Date(t.updated_at).toLocaleString('es-ES') : ''}` : 'Todavía no se han registrado cambios.';
    openOverlay('taskOverlay');
  }
  function validateConnection(conn) {
    try { const url = new URL(conn.url); if (url.protocol !== 'https:' || !url.hostname.endsWith('.supabase.co')) throw Error(); }
    catch { throw new Error('Introduce una URL HTTPS válida de Supabase (*.supabase.co).'); }
    if (!conn.api?.startsWith('sb_publishable_')) throw new Error('Usa una publishable key (sb_publishable_...), nunca una secret key.');
    if (!/^[a-z0-9-]{3,60}$/.test(conn.board||'')) throw new Error('El ID del tablero solo admite minúsculas, números y guiones.');
    if (!conn.key || conn.key.length<32) throw new Error('La clave compartida debe tener al menos 32 caracteres.');
  }
  async function rpc(conn, fn, params) {
    validateConnection(conn);
    const endpoint = conn.url.replace(/\/$/, '') + '/rest/v1/rpc/' + fn;
    const response = await fetch(endpoint, {method:'POST',headers:{'Content-Type':'application/json','apikey':conn.api},body:JSON.stringify(params)});
    let data;
    try { data = await response.json(); } catch { throw new Error('La respuesta del servidor no es válida.'); }
    if (!response.ok) throw new Error(data.message || `Error de Supabase (${response.status}).`);
    return data;
  }
  function makeShareLink() {
    if (state.mode!=='cloud' || !state.connection) return location.href.split('#')[0];
    const c = state.connection;
    const fragment = new URLSearchParams({url:c.url,api:c.api,board:c.board,key:c.key});
    return location.href.split('#')[0] + '#' + fragment.toString();
  }
  function updateLocation() {
    const link = makeShareLink();
    history.replaceState(null,'',link);
  }
  async function startCloud(conn, persist = true) {
    validateConnection(conn);
    const response = await rpc(conn,'altea_get_tasks',{p_board_id:conn.board,p_key:conn.key});
    if (!response || !Array.isArray(response.tasks)) throw new Error('El tablero no existe o la clave es incorrecta.');
    state.tasks = response.tasks.map(task=>({...task,status:validStatus(task.status)}));
    state.connection = conn; state.mode = 'cloud'; state.online=true;
    if (persist) localStorage.setItem(STORAGE_CONNECTION,JSON.stringify(conn));
    updateLocation(); render();
  }
  async function refreshCloud(silent = true) {
    if (state.mode!=='cloud' || state.polling || state.saving || state.dragCode || !$('taskOverlay').hidden) return;
    state.polling=true;
    try {
      const response=await rpc(state.connection,'altea_get_tasks',{p_board_id:state.connection.board,p_key:state.connection.key});
      if (!response || !Array.isArray(response.tasks)) throw new Error('Acceso al tablero denegado.');
      if (JSON.stringify(response.tasks)!==JSON.stringify(state.tasks)) state.tasks=response.tasks.map(t=>({...t,status:validStatus(t.status)}));
      state.online=true; render(); if (!silent) toast('Tablero actualizado ✓');
    } catch (error) { state.online=false; renderConnection(); if(!silent) toast(error.message,true); }
    finally { state.polling=false; }
  }
  async function saveTaskUpdate(t, data) {
    if (state.saving) { toast('Hay otra operación en curso.',true); return false; }
    if (state.mode==='cloud' && !state.online) { toast('Sin conexión: no se pueden guardar cambios.',true); return false; }
    state.saving=true;
    const old = clone(t);
    const update = {...data,owner:(data.owner||'').trim().slice(0,60),notes:(data.notes||'').slice(0,2500),updated_by:(state.actor||'Equipo').trim().slice(0,60)};
    try {
      if (state.mode==='cloud') {
        const result = await rpc(state.connection,'altea_update_task',{
          p_board_id:state.connection.board,p_key:state.connection.key,p_code:t.code,
          p_status:update.status,p_owner:update.owner,p_priority:update.priority,p_notes:update.notes,p_actor:update.updated_by
        });
        if (!result || result.code!==t.code) throw new Error('No se pudo guardar la tarea.');
        Object.assign(t,result);
      } else {
        Object.assign(t,update,{updated_at:new Date().toISOString()});
        localStorage.setItem(STORAGE_TASKS,JSON.stringify(state.tasks));
      }
      render(); return true;
    } catch (error) { Object.assign(t,old); render(); toast(error.message || 'No se ha podido guardar el cambio.',true); return false; }
    finally {state.saving=false;}
  }
  async function changeStatus(code,status) {
    const t=state.tasks.find(t=>t.code===code);
    if (!t || t.status===status) return;
    const ok=await saveTaskUpdate(t,{status,owner:t.owner,priority:t.priority,notes:t.notes});
    if (ok) toast(`#${code} movida a ${prettyStatus(status)} ✓`);
  }
  function openConnect() {
    const conn=state.connection||{url:'',api:'',board:'altea-sprint-1',key:''};
    $('supabaseUrl').value=conn.url||''; $('supabaseKey').value=conn.api||'sb_publishable_Maii1YIdc_FkpvkGfkcpBg_JL1AMGAg';
    $('boardIdInput').value=conn.board||'altea-sprint-1'; $('boardSecretInput').value=conn.key||'';
    $('yourNameInput').value=state.actor;
    $('connectError').textContent='';openOverlay('connectOverlay');
  }
  function openShare() {
    const cloud=state.mode==='cloud' && state.online;
    $('shareLink').value=makeShareLink();
    $('shareInfo').textContent=cloud ? 'Envía este enlace a tus compañeros. Todos veréis las mismas tareas y sus cambios.' : 'Esta versión todavía guarda los cambios solo en tu navegador.';
    $('shareWarning').textContent=cloud ? '🔑 El enlace contiene la clave de acceso del tablero. Compártelo solo con los integrantes de tu equipo.' : '⚠️ Para compartir cambios necesitas publicar la web y activar la colaboración con Supabase.';
    $('copyLink').textContent=cloud ? 'Copiar' : 'Configurar';
    openOverlay('shareOverlay');
  }
  function showTeamModal() {
    const owners=ownerNames();
    const overlay=document.createElement('div'); overlay.className='modal-backdrop'; overlay.id='teamOverlay';
    const list=owners.length ? owners.map(name=>`<button class="team-member-row" type="button" data-owner="${safe(name)}"><span class="mini-avatar">${safe(name.charAt(0).toUpperCase())}</span><strong>${safe(name)}</strong><span>${state.tasks.filter(t=>t.owner===name).length} tareas →</span></button>`).join('') : '<p class="profile-help">Aún no hay responsables asignados. Abre una tarea para añadir el primero.</p>';
    overlay.innerHTML=`<section class="modal profile-modal" role="dialog" aria-modal="true"><div class="modal-heading"><div><span class="modal-overline">COLABORACIÓN</span><h2>Personas del equipo</h2></div><button class="icon-button close-button" id="closeTeam" aria-label="Cerrar"><svg><use href="#i-x"/></svg></button></div><div class="modal-body"><p class="profile-help">Selecciona una persona para ver sus tareas.</p><div class="team-members-list">${list}</div></div></section>`;
    document.body.appendChild(overlay);document.body.style.overflow='hidden';
    const close=()=>{overlay.remove();document.body.style.overflow='';};
    $('closeTeam').addEventListener('click',close);
    overlay.addEventListener('click',ev=>{if(ev.target===overlay)close();});
    overlay.querySelectorAll('[data-owner]').forEach(el=>el.addEventListener('click',()=>{
      state.owner=el.dataset.owner;$('ownerFilter').value=state.owner;close();setView('board');render();toast(`Tareas de ${state.owner}`);
    }));
  }
  function setView(view) { state.view=view;render(); }
  async function boot() {
    // UI initial, independent of the backend.
    render();
    if (state.connection) {
      state.mode='cloud';state.online=false;renderConnection();
      try { await startCloud(state.connection, true); }
      catch(error){state.online=false;renderConnection();toast('No se pudo conectar: '+error.message,true);}
    }
  }
  // Events
  $('searchInput').addEventListener('input',ev=>{state.query=ev.target.value;renderBoard();renderList();});
  $('moduleFilter').addEventListener('change',ev=>{state.module=ev.target.value;renderBoard();renderList();});
  $('ownerFilter').addEventListener('change',ev=>{state.owner=ev.target.value;renderBoard();renderList();});
  $('navBoard').addEventListener('click',ev=>{ev.preventDefault();setView('board');});
  $('navList').addEventListener('click',()=>setView('list'));
  $('navTeam').addEventListener('click',showTeamModal);
  $('connectButton').addEventListener('click',openConnect);
  $('shareButton').addEventListener('click',openShare);
  $('profileButton').addEventListener('click',()=>{$('profileName').value=state.actor;openOverlay('profileOverlay');});
  $('refreshButton').addEventListener('click',()=>{if(state.mode==='cloud')refreshCloud(false);else{render();toast('Tablero local actualizado ✓');}});
  document.querySelectorAll('[data-close]').forEach(btn=>btn.addEventListener('click',()=>closeOverlay(btn.dataset.close)));
  document.querySelectorAll('.modal-backdrop').forEach(el=>el.addEventListener('mousedown',ev=>{if(ev.target===el)closeOverlay(el.id);}));
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape')closeTopOverlay();});
  $('taskForm').addEventListener('submit',async ev=>{
    ev.preventDefault();const t=state.tasks.find(item=>item.code===state.editingCode);if(!t)return;
    $('saveTaskButton').disabled=true;
    const ok=await saveTaskUpdate(t,{status:$('taskStatus').value,priority:$('taskPriority').value,owner:$('taskOwner').value,notes:$('taskNotes').value});
    $('saveTaskButton').disabled=false;
    if(ok){closeOverlay('taskOverlay');toast(`Tarea #${t.code} guardada ✓`);}
  });
  $('connectForm').addEventListener('submit',async ev=>{
    ev.preventDefault();const conn={url:$('supabaseUrl').value.trim(),api:$('supabaseKey').value.trim(),board:$('boardIdInput').value.trim(),key:$('boardSecretInput').value.trim()};
    $('connectError').textContent='';$('connectSubmit').disabled=true;
    try {
      await startCloud(conn,true);
      state.actor=$('yourNameInput').value.trim();localStorage.setItem(STORAGE_NAME,state.actor);
      closeOverlay('connectOverlay');render();toast('¡Tablero colaborativo conectado! ✓');
    }catch(error){$('connectError').textContent=error.message;}
    finally{$('connectSubmit').disabled=false;}
  });
  $('generateSecret').addEventListener('click',()=>{const bytes=new Uint8Array(32);crypto.getRandomValues(bytes);$('boardSecretInput').value=Array.from(bytes,byte=>byte.toString(16).padStart(2,'0')).join('');toast('Clave segura generada. Cópiala al SQL antes de ejecutarlo.');});
  $('backToDemo').addEventListener('click',()=>{state.connection=null;state.mode='demo';state.online=false;state.tasks=initialLocal();localStorage.removeItem(STORAGE_CONNECTION);history.replaceState(null,'',location.pathname+location.search);closeOverlay('connectOverlay');render();toast('Estás usando el tablero local.');});
  $('copyLink').addEventListener('click',async()=>{
    if(state.mode!=='cloud'||!state.online){closeOverlay('shareOverlay');openConnect();return;}
    const link=$('shareLink').value;
    try {await navigator.clipboard.writeText(link);toast('Enlace copiado al portapapeles ✓');}
    catch{$('shareLink').focus();$('shareLink').select();toast('Copia el enlace seleccionado con Ctrl+C.');}
  });
  $('profileForm').addEventListener('submit',ev=>{ev.preventDefault();state.actor=$('profileName').value.trim();localStorage.setItem(STORAGE_NAME,state.actor);closeOverlay('profileOverlay');renderSummary();toast('Nombre guardado ✓');});
  window.addEventListener('hashchange',async()=>{
    const fragment=new URLSearchParams(location.hash.replace(/^#/,''));
    if(fragment.get('url')&&fragment.get('key')&&fragment.get('board')&&fragment.get('api')) {
      const c={url:fragment.get('url'),api:fragment.get('api'),board:fragment.get('board'),key:fragment.get('key')};
      if(JSON.stringify(c)!==JSON.stringify(state.connection)){try{await startCloud(c);}catch(e){toast(e.message,true);}}
    }
  });
  setInterval(()=>refreshCloud(true),8000);
  boot();
})();

