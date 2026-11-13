# 🎟️ ALTEA · Sprint Manager

Tablero Kanban de los **Sprints 1, 2 y 3 (29 tareas)** del proyecto de DAM. Puedes abrirlo desde `index.html` y utilizarlo sin instalar nada.

![ALTEA](assets/favicon.svg)

## Sprint 3 (11–18 de noviembre de 2026)

- **9 tareas nuevas (#21–#29)** y **24 horas estimadas**.
- Distribución indicada por el profesor: MP06 7 specs / 21 h; MP07 5 specs / 16 h; MP08 6 specs / 16 h; MP09 7 specs / 21 h. Estas horas se solapan entre módulos y **no deben sumarse** para obtener las 24 horas del sprint.
- Seleccionado de inicio en la barra lateral. Sprint 01, Sprint 02 y vista global permanecen accesibles.
- **Importante:** quienes utilicen Supabase deben ejecutar [`supabase/sprint-3.sql`](supabase/sprint-3.sql) una vez en **Supabase → SQL Editor**. No requiere contraseña del tablero ni introduce claves nuevas. La migración es idempotente (`on conflict do nothing`) y **no cambia estados, responsables, notas ni tareas anteriores**.
- Una vez ejecutada, la comprobación SQL debe mostrar `sprint_3 = 9`, `hores_sprint_3 = 24` y, si estaban los dos sprints anteriores, `total_tasques = 29`.
- No vuelvas a ejecutar `supabase/setup.sql` para añadir el Sprint 3: se usa solamente `supabase/sprint-3.sql`.

## Funciones

- Columnas **TODO / IN PROGRESS / TESTING / DONE**.
- Arrastrar tarjetas entre estados (en móvil, abrir la tarjeta y cambiar *Estado*).
- Editar responsable, prioridad y notas; consultar el enunciado, las horas y los módulos.
- Buscador, filtros, vista de lista y panel del equipo.
- Progreso total y horas estimadas completadas.
- **Modo demostración:** guardado en `localStorage` (solo en este navegador).
- **Modo compartido:** conexión a Supabase, persistencia online y sincronización automática **cada 8 segundos**. Los demás reciben los cambios después de la siguiente actualización.

## 1. Probar ya (sin registrarte)

Abre `index.html` directamente en Chrome, Edge, Firefox o Safari. Las tareas ya están incluidas. Si mueves o editas tarjetas, se guardan localmente.

**Importante:** el modo demostración **NO** sincroniza dispositivos. No confundas «Compartir» con «colaboración activa».

## 2. Publicar gratis con GitHub Pages

1. Crea un **repositorio público** nuevo en GitHub, por ejemplo `altea-sprint-manager`.
2. Sube estos archivos y carpetas a la raíz del repositorio: `index.html`, `styles.css`, `app.js`, `tasks-data.js` y `assets/`. Puedes subir el README y `supabase/` también **mientras `setup.sql` solo contenga la clave de ejemplo, nunca una real**.
3. En GitHub ve a **Settings → Pages → Build and deployment → Deploy from a branch**. Selecciona **main / (root)** y guarda.
4. Abre el enlace de tu GitHub Pages: `https://TU_USUARIO.github.io/altea-sprint-manager/`.

La web estática funciona sin backend en modo demostración.

## 3. Activar el tablero compartido (Supabase)

1. Crea un proyecto en [Supabase](https://supabase.com/). Su plan gratuito puede ser suficiente para un proyecto de clase, sujeto a los límites vigentes de Supabase.
2. En la web ALTEA, pulsa **Activar colaboración** y luego **Generar** para obtener una clave privada aleatoria de 64 caracteres. **Copia esta clave.**
3. Abre `supabase/setup.sql` en un editor de texto y sustituye **solo** la cadena `'REEMPLAZAR_ESTA_CLAVE_POR_UNA_ALEATORIA_DE_64_CARACTERES'` por la clave generada. Copia todo el SQL al **SQL Editor** de Supabase y ejecútalo. **No hagas commit del SQL con la clave real.**
4. En Supabase, abre **Settings → API Keys** (el nombre de la sección puede variar). Copia **Project URL** y la **publishable key** (empieza por `sb_publishable_`). **Nunca uses una secret key ni service_role.**
5. Vuelve a ALTEA y rellena URL, publishable key, ID de tablero `altea-sprint-1`, tu nombre y **la misma clave aleatoria** que utilizaste en el SQL. Pulsa **Conectar y sincronizar**.
6. Cuando el indicador diga **Equipo sincronizado**, pulsa **Compartir tablero → Copiar** y manda ese enlace a tus compañeros. Ellos no necesitan configurar Supabase; solo abrir el enlace.

⚠️ **Quien tenga el enlace compartido podrá leer y modificar el tablero.** Este proyecto usa un enlace privado como permiso de edición, no cuentas individuales. Si lo compartes fuera del grupo, tendrás que cambiar la clave desde la base de datos y generar un enlace nuevo.

### ¿Por qué es seguro poner la publishable key en la web?

La **publishable key** está pensada para usarse en clientes públicos. El SQL del proyecto aplica RLS y revoca el acceso directo a las tablas; las dos funciones RPC de lectura/edición exigen una clave privada del tablero y comprueban su hash SHA-256 en la base de datos. Eso **no equivale a gestión de usuarios**, pero evita que el mero acceso a la publishable key permita leer o editar tareas.

### Privacidad del enlace

El enlace compartido incluye la dirección Supabase, su publishable key, el ID del tablero y la clave privada en el **fragmento** (`#...`) de la URL. No publiques ese enlace en un repositorio ni en canales abiertos. ALTEA almacena el acceso en el `localStorage` del navegador del miembro del equipo.

## 4. Estructura de archivos

```
altea-sprint-manager/
├── index.html             # interfaz
├── styles.css             # diseño responsivo
├── tasks-data.js          # 15 tareas precargadas
├── app.js                 # lógica, edición, drag & drop, persistencia y API
├── assets/favicon.svg     # icono
├── supabase/setup.sql     # tablas, controles de acceso y datos iniciales
└── README.md
```

## Notas

- Sin frameworks, compiladores, npm ni servidor propio.
- Las tareas no se pueden crear/eliminar desde la interfaz (el sprint inicial incluye exactamente 15); sí se pueden mover y editar sus campos de seguimiento.
- La sincronización entre pestañas/dispositivos conectados es por sondeo cada 8 s, **no WebSockets en tiempo real**. Si alguien mueve una tarea simultáneamente con otra edición, gana la última escritura.
- El modo demo y el modo compartido guardan estados independientes; al conectar al tablero compartido se cargan las tareas de la base de datos.
- Las descripciones originales están en catalán y los controles de interfaz en español.
- No incluyas datos personales sensibles en las notas ni compartas el enlace fuera del equipo.