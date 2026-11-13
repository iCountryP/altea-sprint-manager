/* Datos iniciales de ALTEA · Sprints 1, 2 y 3. Los datos compartidos se leen de Supabase. */
window.ALTEA_SEED = [
  {
    "code": "01",
    "category": "GIT",
    "title": "Configurar repositoris SRV, APP i DESKTOP amb branques dev, pre i pro",
    "description": "Crear tres repositoris independents (SRV, APP i DESKTOP) a GitHub, cadascun amb les branques dev, pre i pro.",
    "hours": 1,
    "modules": [
      "MP06",
      "MP07",
      "MP08",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "02",
    "category": "GIT",
    "title": "Fer almenys 4 commits per membre de l’equip",
    "description": "Tots els membres de l’equip han de realitzar almenys 4 commits al llarg del sprint.",
    "hours": 0,
    "modules": [
      "MP06",
      "MP07",
      "MP08",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "03",
    "category": "DISSENY",
    "title": "Definir la identitat visual i documentar-la a la wiki",
    "description": "Definir el nom, el logotip, la paleta de colors i les tipografies de les aplicacions. Documentar la identitat visual a la wiki de GitHub.",
    "hours": 2,
    "modules": [
      "MP07",
      "MP08"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "04",
    "category": "DISSENY",
    "title": "Crear wireframes de l’APP i DESKTOP i documentar-los",
    "description": "Dibuixar els wireframes de les pantalles principals de l’APP (cartellera, cistella i les meves entrades) i del DESKTOP (llistat de vendes i detall de venda). Documentar-los a la wiki.",
    "hours": 3,
    "modules": [
      "MP07",
      "MP08"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "05",
    "category": "SRV",
    "title": "Servidor WebSocket amb proves JSON (ping/bounce)",
    "description": "Implementar un servidor WebSocket que accepti connexions de clients i respongui a missatges JSON de prova (ping i bounce).",
    "hours": 1,
    "modules": [
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "06",
    "category": "SRV",
    "title": "Crear i carregar ESDEVENIMENTS.XML amb recintes i entrades",
    "description": "Crear el catàleg ESDEVENIMENTS.XML i llegir-lo des del servidor a estructures de dades adequades. Incloure esdeveniments amb ID, nom, data i hora, categoria, descripció i imatge; recintes amb zones numerades o generals i aforament; tipus d’entrada amb nom, zona, preu i quota. Mínim 20 recintes, cadascun amb 1 o 2 esdeveniments.",
    "hours": 3,
    "modules": [
      "MP06",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "07",
    "category": "SRV",
    "title": "Atendre peticions d’esdeveniments, entrades i disponibilitat",
    "description": "El servidor ha d’atendre les peticions dels clients: retornar el llistat d’esdeveniments i, per a cadascun, els tipus d’entrada amb les unitats disponibles.",
    "hours": 2,
    "modules": [
      "MP06",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "08",
    "category": "SRV-CLI",
    "title": "Client de consola per provar les peticions al servidor",
    "description": "Crear un client de línia de comandes que permeti provar contra el servidor les peticions d’esdeveniments i de tipus d’entrada.",
    "hours": 1,
    "modules": [
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "09",
    "category": "DESKTOP",
    "title": "JavaFX: configuració inicial, WebSocket i CONFIG.XML",
    "description": "Crear l’aplicació JavaFX bàsica per al personal de sala. Al primer inici ha de demanar ubicació (taquilla, porta o oficina) i URL del servidor; connectar-se per WebSocket i mostrar l’èxit o error; desar la configuració a CONFIG.XML per no tornar-la a demanar.",
    "hours": 2,
    "modules": [
      "MP06",
      "MP07",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "10",
    "category": "DESKTOP",
    "title": "Mostrar esdeveniments i tipus d’entrada a DESKTOP",
    "description": "Mostrar al DESKTOP el llistat d’esdeveniments i els seus tipus d’entrada. No cal mostrar imatges de les entrades.",
    "hours": 2,
    "modules": [
      "MP07",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "11",
    "category": "APP",
    "title": "APP: configuració inicial del comprador i CONFIG.XML",
    "description": "Al primer inici de l’APP, demanar URL del servidor, nom i correu del comprador (entrades nominals). Desar les dades a CONFIG.XML, connectar-se al servidor i informar de l’èxit o l’error.",
    "hours": 2,
    "modules": [
      "MP06",
      "MP08"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "12",
    "category": "APP",
    "title": "APP: cartellera d’esdeveniments i detall de preus",
    "description": "Mostrar la cartellera segons el disseny previst. En tocar un esdeveniment, mostrar els tipus d’entrada amb nom i preu. No cal incloure imatges en aquest sprint.",
    "hours": 2,
    "modules": [
      "MP06",
      "MP08"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "13",
    "category": "APP",
    "title": "APP: afegir entrades generals a la cistella i comptador",
    "description": "En tocar un tipus d’entrada, afegir-lo a la cistella. Només s’han de mostrar entrades GENERALS (no numerades). Mostrar en algun lloc de la vista el nombre d’elements de la cistella.",
    "hours": 1,
    "modules": [
      "MP08"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "14",
    "category": "APP",
    "title": "APP: vista de cistella amb quantitats, preus i total",
    "description": "Crear una vista de cistella que mostri cada tipus d’entrada, la quantitat, el preu unitari i el total.",
    "hours": 1,
    "modules": [
      "MP08"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "15",
    "category": "APP + SRV",
    "title": "Compra d’entrades generals, localitzadors i JSON",
    "description": "Quan l’usuari valida una cistella amb entrades generals, el servidor les reserva i assigna un localitzador únic per reserva. El servidor registra la reserva i retorna els localitzadors a l’APP, que mostra OK o ERROR. Desar les entrades en un fitxer JSON amb nom <id_esdeveniment>.json, incloent tipus d’entrada, localitzador, nom i correu del comprador.",
    "hours": 4,
    "modules": [
      "MP06",
      "MP08",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "16",
    "category": "MOTILLA",
    "title": "MOTILLA #2",
    "description": "Segona motilla del projecte. El professor no ha proporcionat més indicacions en l’enunciat.",
    "hours": 4,
    "modules": [
      "MP06",
      "MP07",
      "MP08",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "17",
    "category": "SRV",
    "title": "Disseny i implementació de la base de dades",
    "description": "Dissenyar i implementar la base de dades del servidor i documentar-ne el diagrama a la wiki. Les entrades numerades han de permetre diversos espais i zones rectangulars definides per files i seients, i cal registrar l’estat de les reserves. ABANS d’implementar la BD, enviar el disseny al professor perquè el validi.",
    "hours": 3,
    "modules": [
      "MP06"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "18",
    "category": "SRV",
    "title": "Migració del catàleg XML i de les connexions a BD",
    "description": "Migrar les dades del catàleg XML a la base de dades i adaptar les connexions del servidor. La migració s’ha d’integrar amb el disseny validat a la tasca #17.",
    "hours": 3,
    "modules": [
      "MP06",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "19",
    "category": "DESKTOP",
    "title": "Mapa del recinte i estat de les butaques",
    "description": "Representar gràficament el recinte amb els seients lliures i venuts, i l’ocupació de cada zona respecte de l’aforament. Des de qualsevol seient venut s’ha de poder obrir el detall de la venda. Afegir dades de prova amb butaques venudes.",
    "hours": 3,
    "modules": [
      "MP06",
      "MP07"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "20",
    "category": "APP + SRV",
    "title": "Les meves entrades: recuperar i mostrar les compres",
    "description": "Implementar la vista «Les meves entrades», recuperant del servidor les entrades del comprador. Cada entrada ha de mostrar l’esdeveniment, el tipus d’entrada, el seient (si en té) i el titular.",
    "hours": 2,
    "modules": [
      "MP06",
      "MP08",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "21",
    "category": "MOTXILLA",
    "title": "MOTXILLA #3",
    "description": "Tercera motxilla del projecte. L'enunciat no inclou més indicacions.",
    "hours": 3,
    "modules": [
      "MP06",
      "MP07",
      "MP08",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "22",
    "category": "APP + SRV",
    "title": "Selecció de seients numerats per zona",
    "description": "Per a un esdeveniment i un tipus d'entrada numerada, l'APP demana al servidor l'estat de les butaques i mostra la zona com una graella rectangular de files × seients. Diferenciar per colors les butaques lliures, venudes i seleccionades. Tocar una butaca lliure l'afegeix a la cistella i la destaca; tornar-la a tocar la desselecciona i la treu de la cistella.",
    "hours": 3,
    "modules": [
      "MP06",
      "MP08",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "23",
    "category": "APP + SRV",
    "title": "Compra atòmica d'entrades numerades i generals",
    "description": "El botó COMPRAR envia les butaques numerades seleccionades al servidor. El servidor registra la compra a la BD i assigna un localitzador únic a cada entrada. Garantir que una butaca no es vengui dues vegades i que cap tipus superi la seva quota. Si alguna entrada no està disponible, rebutjar tota la compra, indicar les butaques afectades i marcar-les amb error a la cistella. Incloure les entrades generals en la mateixa operació. Si la compra és correcta, mostrar els localitzadors i buidar les entrades comprades de la cistella.",
    "hours": 2,
    "modules": [
      "MP06",
      "MP08",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "24",
    "category": "APP",
    "title": "Configuració de servidor i dades del comprador",
    "description": "Afegir un menú de configuració per modificar la URL del servidor i el nom del comprador, però no el correu electrònic. Les entrades ja comprades han de conservar el nom original de la compra.",
    "hours": 1,
    "modules": [
      "MP08"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "25",
    "category": "APP",
    "title": "Cistella: quantitats d'entrades i eliminació",
    "description": "Permetre augmentar o disminuir la quantitat de les entrades generals de la cistella. Quan una línia arriba a zero, demanar confirmació i eliminar-la. Les entrades numerades no tenen quantitat; es poden eliminar amb confirmació i han de deixar d'aparèixer seleccionades al mapa de butaques.",
    "hours": 2,
    "modules": [
      "MP08"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "26",
    "category": "SRV + DESKTOP",
    "title": "Llistat cronològic d'entrades venudes",
    "description": "Sota el mapa del recinte, mostrar per a l'esdeveniment seleccionat un llistat d'entrades venudes en ordre cronològic. Per cada entrada: data i hora de compra, localitzador, tipus, seient (si en té), nom del comprador i estat de l'entrada.",
    "hours": 3,
    "modules": [
      "MP06",
      "MP07",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "27",
    "category": "DESKTOP",
    "title": "Configuració d'ubicació i servidor al DESKTOP",
    "description": "Permetre canviar la ubicació (taquilla, porta, oficina) i la URL del servidor. En canviar la URL, connectar al servidor nou i informar de l'èxit o de l'error. Mostrar o amagar funcions segons la ubicació; en mode porta, només el validador. Desar els canvis a CONFIG.XML.",
    "hours": 2,
    "modules": [
      "MP06",
      "MP07",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "28",
    "category": "SRV + DESKTOP",
    "title": "Validació d'entrades per localitzador en mode porta",
    "description": "Amb el DESKTOP configurat com a «porta», validar una entrada introduint el seu localitzador. El servidor comprova el codi, marca l'entrada com a validada i rebutja els codis inexistents o ja validats. Mostrar clarament si l'entrada és vàlida (titular, tipus i seient si n'hi ha) o el motiu del rebuig.",
    "hours": 3,
    "modules": [
      "MP06",
      "MP07",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  },
  {
    "code": "29",
    "category": "VÍDEO",
    "title": "Vídeo de presentació del projecte a YouTube",
    "description": "Gravar i publicar a YouTube un vídeo de presentació del projecte ALTEA. Incloure l'enllaç al vídeo a la plataforma de gestió del projecte.",
    "hours": 5,
    "modules": [
      "MP06",
      "MP07",
      "MP08",
      "MP09"
    ],
    "status": "todo",
    "owner": "",
    "priority": "normal",
    "notes": "",
    "updated_by": "",
    "updated_at": null
  }
];

