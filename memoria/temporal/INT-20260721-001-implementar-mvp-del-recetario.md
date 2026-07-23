---
id: "INT-20260721-001"
tipo: intento
estado: comprobado
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-21"
actualizado: "2026-07-21"
aliases: []
tags: []
ciclo: "[[CIC-20260721-001-construir-mvp-del-recetario]]"
numero_intento: 1
intento_anterior: ""
resultado_tecnico: parcial
archivos_afectados:
  - README.md
  - index.html
  - package.json
  - package-lock.json
  - tsconfig.json
  - vite.config.ts
  - src/main.tsx
  - src/App.tsx
  - src/styles.css
  - src/vite-env.d.ts
  - src/components/backup-actions.tsx
  - src/components/confirm-dialog.tsx
  - src/components/recipe-card.tsx
  - src/components/recipe-detail.tsx
  - src/components/recipe-form.tsx
  - src/domain/recipe.ts
  - src/domain/search.ts
  - src/storage/recipe-storage.ts
  - tests/recipe.test.ts
  - tests/search.test.ts
  - tests/storage.test.ts
  - tests/confirm-dialog.test.ts
  - memoria/temporal/CIC-20260721-001-construir-mvp-del-recetario.md
  - memoria/temporal/INT-20260721-001-implementar-mvp-del-recetario.md
---

# Implementar el MVP del recetario

## Paquete recibido

### Petición original

> un recetario.

El humano quiere probar SOR creando aplicaciones reales y refinarlo únicamente cuando el trabajo revele fricciones concretas.

### Objetivo del intento

Entregar un MVP completo y agradable de usar que permita gestionar y consultar un recetario personal desde móvil o escritorio, sin cuentas ni servicios externos.

### Alcance y límites

Producto:

- una sola persona y un solo dispositivo por ahora;
- aplicación web responsive con React, TypeScript y Vite;
- funcionamiento local, sin backend, cuenta, telemetría ni llamadas externas en tiempo de ejecución;
- persistencia versionada en `localStorage`, separada de la lógica de dominio;
- copia de seguridad completa mediante exportación e importación JSON validada;
- interfaz en español, accesible y diseñada para cocinar y consultar con rapidez.

Cada receta tendrá:

- identificador estable;
- nombre obligatorio y descripción opcional;
- porciones, tiempo de preparación y tiempo de cocción;
- ingredientes ordenados con cantidad, unidad y nombre;
- pasos ordenados;
- etiquetas normalizadas;
- estado favorito;
- fechas de creación y actualización.

Funciones incluidas:

- listado y detalle de recetas;
- creación, edición y eliminación con confirmación;
- búsqueda por nombre, ingrediente o etiqueta;
- filtros por todas, favoritas y etiqueta;
- estados vacíos y mensajes de validación útiles;
- datos de ejemplo solo durante el primer uso;
- exportación e importación del recetario completo;
- diseño adaptable a móvil y escritorio.

Fuera de alcance:

- autenticación, nube, sincronización y colaboración;
- imágenes y archivos adjuntos;
- nutrición, lista de compras y planificación de comidas;
- generación o análisis mediante IA;
- publicación y despliegue público;
- cambios en `sor-nucleo` o `sor-interfaz`.

No ampliar el alcance para resolver posibilidades futuras. Detenerse ante una decisión que cambie el modelo de producto, requiera un servicio externo, implique pérdida de datos no recuperable o contradiga estos límites.

### Cambios solicitados

1. Inicializar React, TypeScript y Vite con versiones fijadas y scripts claros.
2. Definir el modelo de receta, normalización, validación y almacenamiento versionado.
3. Implementar CRUD completo sin mutaciones accidentales y con identificadores estables.
4. Añadir búsqueda, filtros y favoritos sin alterar las recetas almacenadas.
5. Implementar importación y exportación JSON con validación total antes de reemplazar datos.
6. Diseñar una experiencia cálida, legible y responsive, con navegación simple entre listado, detalle y formulario.
7. Incluir recetas de ejemplo en el primer uso y estados vacíos comprensibles.
8. Añadir pruebas del dominio, almacenamiento, búsqueda, filtros, importación y regresiones esenciales.
9. Documentar instalación, ejecución, pruebas, datos y límites.
10. Realizar un recorrido funcional real en navegador: crear, editar, buscar, filtrar, marcar favorita, recargar, exportar, importar y eliminar.
11. Registrar evidencia y dejar el ciclo pendiente de una sola aceptación humana del MVP completo.

### Comprobación técnica esperada

- instalación reproducible y lockfile presente;
- TypeScript sin errores, pruebas completas y build de producción satisfactorio;
- pruebas de creación, normalización, actualización, eliminación y persistencia tras una instancia nueva;
- búsquedas por nombre, ingrediente y etiqueta; filtros sin mutación;
- importación inválida rechazada sin cambiar datos e importación válida completa;
- flujo accesible mediante teclado, etiquetas y mensajes anunciables;
- recorrido funcional real sin errores de consola;
- presentación usable en anchura móvil y de escritorio;
- solo un ciclo abierto con un intento enlazado;
- ninguna escritura fuera de esta raíz ni cambios en otros proyectos;
- sin aceptación, consolidación, cierre o commit del resultado funcional hasta revisión humana.

## Acciones realizadas

- Se inicializó React, TypeScript, Vite y Vitest con versiones exactas y lockfile.
- Se creó un dominio puro con recetas, ingredientes, pasos, normalización, validación, identificadores estables y fechas de creación/actualización.
- Se implementaron datos de primer uso, persistencia local versionada y recuperación sin sobrescribir datos corruptos.
- Se implementaron exportación e importación JSON con validación total previa, control de versión e identificadores únicos.
- Se construyeron listado, tarjetas, búsqueda por texto e ingredientes, filtros, favoritos, detalle, formulario dinámico, edición y eliminación.
- Se diseñó una interfaz cálida y responsive con navegación clara, estados vacíos, etiquetas accesibles y mensajes anunciables.
- Durante el recorrido se detectó que las confirmaciones nativas bloqueaban el navegador integrado; se sustituyeron por diálogos propios accesibles para importación y eliminación.
- Se añadieron pruebas de dominio, búsqueda, almacenamiento y diálogo de confirmación, y se actualizó README.

## Cambios y ubicación

Los 24 archivos enumerados en Properties son el alcance completo del intento. `node_modules/` y `dist/` son artefactos ignorados.

No se modificaron `sor-nucleo`, `sor-interfaz` ni ninguna ruta fuera de este proyecto, salvo copias temporales de edición y una fixture sintética de navegador que se retirarán tras la auditoría.

## Comprobaciones y evidencias

- `npm.cmd install`: 53 paquetes instalados, 0 vulnerabilidades reportadas.
- `npm.cmd test`: 4 archivos y 26 pruebas aprobadas, 0 fallos.
- `npm.cmd run typecheck`: satisfactorio.
- `npm.cmd run build`: satisfactorio; 24 módulos transformados y salida de producción generada bajo `dist/`.
- Las pruebas cubren creación, normalización, campos obligatorios, edición conservando identidad y fecha de creación, tiempos inválidos, copias independientes, colecciones e ids duplicados.
- La búsqueda comprobó nombre, ingredientes y etiquetas sin depender de mayúsculas o acentos, filtros combinados, orden y ausencia de mutación.
- El almacenamiento comprobó primer uso, recuperación desde otra instancia, datos corruptos, exportación/importación completa, archivos incompatibles, recetas inválidas e ids duplicados sin resultados parciales.
- El diálogo propio se comprobó como modal accesible con cancelación, confirmación y tono destructivo.
- Recorrido real observado antes de la corrección final: carga de dos ejemplos; creación de «Pasta cremosa de limón» con dos ingredientes y dos pasos; favorita; detalle correcto; edición; búsqueda `limon`; filtros de favoritas y etiqueta; persistencia tras recarga; acción de exportación con mensaje de éxito.
- Revisión visual de escritorio satisfactoria: composición amplia, navegación y jerarquía correctas.
- No existen `fetch`, WebSocket, API, backend, cuenta, telemetría ni servicios externos en producción.

## Errores, bloqueos y pendientes

- El evento de descarga del navegador integrado no se notificó, aunque la aplicación completó la acción y mostró su señal de éxito. La serialización se encuentra cubierta por pruebas puras.
- Al seleccionar una copia válida, el `window.confirm` original bloqueó toda la superficie del navegador integrado y evitó continuar con pestañas nuevas. Esa fricción se corrigió eliminando las confirmaciones nativas y usando diálogos React propios.
- Debido a ese bloqueo ambiental, no se repitieron en navegador la importación, la eliminación y la captura móvil después de la corrección. Tipos, 26 pruebas y build finales sí aprobaron con el código corregido.
- Pendiente: revisión humana única del MVP, especialmente restauración, eliminación y apariencia móvil.
- No se aceptó, consolidó, cerró ni realizó commit del resultado funcional.

## Rectificaciones

- Se añadió `src/vite-env.d.ts` al detectar que TypeScript 7 requería las declaraciones para la importación lateral de CSS.
- Se reemplazaron las confirmaciones nativas de importación y eliminación por `ConfirmDialog` y se hizo más robusta la descarga añadiendo temporalmente el enlace al documento antes de liberar su URL.
