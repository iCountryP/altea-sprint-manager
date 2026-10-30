/* Tareas originales del Sprint 1 de ALTEA */
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
  }
];

