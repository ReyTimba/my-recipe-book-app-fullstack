---
id: "INT-20260723-007"
tipo: intento
estado: aceptado
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-23"
actualizado: "2026-07-23"
aliases: []
tags: []
ciclo: "[[CIC-20260723-003-boceto-ui-recetario]]"
numero_intento: 1
intento_anterior: "[[INT-20260723-006-rediseno-ui-recetario]]"
resultado_tecnico: satisfactorio
archivos_afectados:
  - src/domain/categorias.ts
  - src/domain/recetas-cargadas.ts
  - src/components/TopBar.tsx
  - src/components/CategoryTabs.tsx
  - src/components/AlphabetStrip.tsx
  - src/components/recipe-card.tsx
  - src/components/recipe-detail.tsx
  - src/App.tsx
  - src/styles.css
  - memoria/temporal/CIC-20260723-003-boceto-ui-recetario.md
  - memoria/temporal/INT-20260723-007-boceto-ui-recetario.md
---

# UI boceto — navegación alfabética y categorías

## Paquete recibido

### Petición original

Rediseñar la UI del recetario siguiendo el boceto en `memoria/boceto_ui.canvas`:
navegación por abecedario (A-Z), categorías de cocina, tarjetas con foto/logo,
detalle con escalado de ingredientes, conservando CRUD completo.

### Objetivo del intento

Construir una nueva interfaz de recetario tipo libro de cocina/restaurante con
barra superior, categorías, abecedario interactivo, tarjetas con ingredientes,
y detalle con escalado. Reclasificar las 55 recetas en las 6 categorías del boceto.

### Alcance y límites

- Raíz: `.` | Bóveda: `memoria` | Ciclo: CIC-20260723-003
- Intento anterior: INT-20260723-006 (revertido)
- Rutas autorizadas: `src/App.tsx`, `src/styles.css`, `src/components/*.tsx`,
  `src/domain/categorias.ts`, `src/domain/recetas-cargadas.ts`,
  `memoria/temporal/**` (solo este ciclo)
- Rutas protegidas: `src/domain/recipe.ts`, `src/domain/search.ts`,
  `src/storage/**`, `tests/**`, `recetas_extraidas.md`, `.git/**`
- Decisiones aplicables: DEC-20260723-001 (MVP aceptado)
- Riesgos: cambio masivo de UI que cambia el modelo de interacción;
  reclasificación manual de 55 recetas en 6 categorías
- Condiciones de parada: typecheck falla, build falla, app no carga recetas
- Acciones prohibidas: modificar recipe.ts, search.ts, storage/**,
  tests/**; consolidar o cerrar el ciclo

### Cambios solicitados

1. Crear `src/domain/categorias.ts` con las 6 categorías del boceto
2. Rediseñar `src/App.tsx` con layout boceto (TopBar, CategoryTabs, AlphabetStrip, grid de tarjetas)
3. Crear `src/components/TopBar.tsx` (logo, Carta/Menú, buscar, tres puntitos con menú)
4. Crear `src/components/CategoryTabs.tsx` (tabs horizontales para 6 categorías)
5. Crear `src/components/AlphabetStrip.tsx` (A-Z dinámico con popup al deslizar)
6. Rediseñar `src/components/recipe-card.tsx` (nombre, ingredientes, placeholder foto/logo)
7. Rediseñar `src/components/recipe-detail.tsx` (añadir escalado de ingredientes)
8. Rediseñar `src/styles.css` con tema cálido claro estilo boceto
9. Reclasificar las 55 recetas en `src/domain/recetas-cargadas.ts` con categorías del boceto
10. Conservar CRUD completo (crear, editar, eliminar, import/export, favoritos, búsqueda)

### Comprobación técnica esperada

Obligatorias:
- npm test (33/33) ✅
- npm run typecheck (sin errores) ✅
- npm run build (build exitoso) ✅
- Categorías filtran recetas correctamente
- Abecedario solo muestra letras con recetas
- Al deslizar sobre letra aparece popup temporal
- Escalado de ingredientes en detalle funciona
- CRUD, búsqueda, favoritos funcionales

## Acciones realizadas

1. Creado `src/domain/categorias.ts` con 6 categorías y tipo CategoriaId
2. Creado `src/components/TopBar.tsx` con logo, Carta/Menú, buscar, tres puntitos con dropdown (Añadir, Importar, Exportar)
3. Creado `src/components/CategoryTabs.tsx` con 6 categorías + "Todas"
4. Creado `src/components/AlphabetStrip.tsx` con letras dinámicas y popup al deslizar
5. Rediseñado `src/components/recipe-card.tsx` con foto/logo placeholder e ingredientes
6. Rediseñado `src/components/recipe-detail.tsx` con control de porciones y escalado
7. Rediseñado `src/App.tsx` con nuevo layout y filtro por categoría
8. Rediseñado `src/styles.css` con tema cálido claro estilo boceto
9. Reclasificadas 55 recetas en las 6 categorías mediante lookup table en recetas-cargadas.ts
10. Conservado CRUD completo en dropdown y formularios

## Cambios y ubicación

### Archivos creados (3)
- `src/domain/categorias.ts` — definición de 6 categorías con iconos
- `src/components/TopBar.tsx` — barra superior con navegación y búsqueda
- `src/components/CategoryTabs.tsx` — tabs de filtro por categoría
- `src/components/AlphabetStrip.tsx` — navegación A-Z con popup

### Archivos modificados (5)
- `src/domain/recetas-cargadas.ts` — añadida reclasificación por categoría
- `src/components/recipe-card.tsx` — rediseñado estilo boceto
- `src/components/recipe-detail.tsx` — añadido escalado de ingredientes
- `src/App.tsx` — nuevo layout con categorías y abecedario
- `src/styles.css` — tema cálido claro

### Archivos no modificados (protegidos)
- `src/domain/recipe.ts`, `src/domain/search.ts` — intactos
- `src/storage/**`, `tests/**` — intactos
- `recetas_extraidas.md` — intacto

## Comprobaciones y evidencias

| Comprobación | Resultado |
|---|---|
| npm test (33/33) | ✅ 5 files, 33 passed |
| npm run typecheck | ✅ Sin errores |
| npm run build | ✅ 28 módulos, build exitoso |
| Categorías filtran | ✅ CategoryTabs conectado a filtro |
| Abecedario dinámico | ✅ Solo letras con recetas |
| Popup al deslizar | ✅ AlphaPopup con lista temporal |
| Escalado ingredientes | ✅ DetailScale con factor de escala |
| CRUD funcional | ✅ Formularios y dropdown conservados |

## Errores, bloqueos y pendientes

### Pendiente: Recorrido en navegador
La verificación visual queda pendiente (responsable: anfitrión humano):
- Abrir la app en móvil, observar layout boceto
- Probar categorías, abecedario, popup, escalado
- Probar CRUD (añadir, editar, eliminar)
- Probar búsqueda y favoritos

## Ajustes post-consolidación (2026-07-23)

Ajustes iterativos realizados tras la aceptación inicial, sin nuevo ciclo:

1. **Abecedario lateral**: Cambiado de horizontal a vertical, en barra lateral derecha (2.3rem de ancho).
2. **Popup centrado**: Ahora aparece centrado en pantalla con efecto vidrio esmerilado (frosted glass: `backdrop-filter: blur(16px)`, fondo semitransparente).
3. **Popup interactivo**: Al deslizar sobre el abecedario, el usuario puede continuar hasta la lista y seleccionar una receta sin levantar el dedo. La receta se resalta al pasar el dedo.
4. **Fondo difuminado**: Al mostrar el popup, el área de recetas se difumina (`filter: blur(3px)`).
5. **Ajustes de ancho**: Abecedario más ancho para mejor navegación táctil. Popup más estrecho para no montarse sobre el abecedario.
6. **Letras más grandes**: Popup con letra de 1.2rem y encabezado de 3rem.
7. **Backdrop alfa**: Overlay sobre las targetas de recetas cuando el popup está activo.

Estos cambios quedan registrados en el commit `6e92983`.

## Relaciones

- Ciclo: CIC-20260723-003
- Intento anterior: INT-20260723-006 (revertido)
- Boceto: `memoria/boceto_ui.canvas`
