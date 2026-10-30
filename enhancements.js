/* ALTEA · anotaciones visibles + tema claro/oscuro.
   No cambia los datos ni los permisos de Supabase. */
(() => {
  'use strict';
  const STORAGE_TASKS='altea-sprint01-tasks-v1';
  const STORAGE_CONNECTION='altea-sprint01-connection-v1';
  let cache=new Map(), hasCloudData=false;

  function isCloudConfigured() {
    const fragment=new URLSearchParams(location.hash.slice(1));
    if (fragment.has('url') && fragment.has('key')) return true;
    try { return Boolean(JSON.parse(localStorage.getItem(STORAGE_CONNECTION))?.key); }
    catch { return false; }
  }
  function updateLocalNotes() {
    if(isCloudConfigured()) return;
    let rows=window.ALTEA_SEED || [];
    try { const stored=JSON.parse(localStorage.getItem(STORAGE_TASKS)); if(Array.isArray(stored)) rows=stored; }
    catch {}
    cache=new Map(rows.map(t=>[String(t.code),t]));
    hasCloudData=false;
  }
  function makeNote(text) {
    const box=document.createElement('div'); box.className='card-team-note';
    const title=document.createElement('div'); title.className='team-note-label'; title.textContent='✎ Anotaciones del equipo';
    const body=document.createElement('p'); body.className='team-note-text'; body.textContent=text;
    box.append(title,body); return box;
  }
  function applyNotes() {
    if(!hasCloudData) updateLocalNotes();
    document.querySelectorAll('#kanbanBoard .task-card').forEach(card=>{
      const task=cache.get(card.dataset.code), text=String(task?.notes||'').trim();
      let box=card.querySelector('.card-team-note');
      if(!text) { box?.remove(); return; }
      if(!box) {box=makeNote(text);card.querySelector('.card-modules')?.before(box);}
      else {const p=box.querySelector('.team-note-text');if(p.textContent!==text)p.textContent=text;}
      box.title=text;
    });
    document.querySelectorAll('#listView .list-row').forEach(row=>{
      const task=cache.get(row.dataset.code), text=String(task?.notes||'').trim();
      let wrapper=row.querySelector('.list-title-with-note');
      if(!text) {wrapper?.querySelector('.list-team-note')?.remove();return;}
      if(!wrapper) {
        wrapper=document.createElement('div');wrapper.className='list-title-with-note';
        const heading=row.querySelector('strong');if(!heading)return;
        heading.before(wrapper);wrapper.append(heading);
      }
      let span=wrapper.querySelector('.list-team-note');
      if(!span){span=document.createElement('span');span.className='list-team-note';wrapper.append(span);}
      span.textContent='✎ '+text;span.title=text;
    });
  }

  // Reutiliza las respuestas de Supabase que la aplicación ya obtiene;
  // NO introduce lecturas adicionales ni modifica las peticiones existentes.
  const originalFetch=window.fetch.bind(window);
  window.fetch=function(input,init) {
    const path=typeof input==='string'?input:(input?.url||'');
    const read=path.includes('/rest/v1/rpc/altea_get_tasks');
    const write=path.includes('/rest/v1/rpc/altea_update_task');
    return originalFetch(input,init).then(response=>{
      if(response.ok&&(read||write))response.clone().json().then(data=>{
        if(read&&Array.isArray(data?.tasks)){cache=new Map(data.tasks.map(t=>[String(t.code),t]));hasCloudData=true;}
        else if(write&&data?.code){cache.set(String(data.code),data);hasCloudData=true;}
        applyNotes();
      }).catch(()=>{});
      return response;
    });
  };

  function setup() {
    const bar=document.querySelector('.top-actions');
    if(bar){
      const button=document.createElement('button');button.className='icon-button theme-toggle';button.type='button';
      const renderSwitch=()=>{
        const dark=document.documentElement.dataset.theme==='dark';
        button.textContent=dark?'☀':'☾';button.title=dark?'Cambiar a tema claro':'Cambiar a tema oscuro';
        button.setAttribute('aria-label',button.title);button.setAttribute('aria-pressed',String(dark));
      };
      button.addEventListener('click',()=>{
        const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
        document.documentElement.dataset.theme=next;localStorage.setItem('altea-theme-v1',next);renderSwitch();
      });
      bar.insertBefore(button,bar.firstChild);renderSwitch();
    }
    for(const id of ['kanbanBoard','listView']) {
      const target=document.getElementById(id);
      if(target)new MutationObserver(applyNotes).observe(target,{childList:true});
    }
    updateLocalNotes();applyNotes();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});
  else setup();
})();