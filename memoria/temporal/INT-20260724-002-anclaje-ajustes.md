---
id: "INT-20260724-002"
tipo: intento
estado: aceptado
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-24"
actualizado: "2026-07-24"
aliases: []
tags: []
ciclo: "[[CIC-20260724-005-anclaje-ajustes]]"
numero_intento: 1
intento_anterior: null
resultado_tecnico: satisfactorio
archivos_afectados:
  - src/domain/settings.ts
  - src/components/SettingsPanel.tsx
  - src/components/AlphabetStrip.tsx
  - src/components/TopBar.tsx
  - src/App.tsx
  - src/styles.css
  - memoria/temporal/CIC-20260724-005-anclaje-ajustes.md
  - memoria/temporal/INT-20260724-002-anclaje-ajustes.md
---

# Anclaje/desanclaje en abecedario y panel de ajustes

## Paquete recibido

### Petición original

1. **Anclaje en abecedario** — Al detener el dedo ≥500ms sobre una letra, anclarla. Al salir de la letra anclada, esperar 200ms y soltar el ancla. Sin ancla, el deslizamiento cambia letras al instante.
2. **Panel de ajustes** — Diálogo para configurar anchorDelay y unanchorDelay, persistido en localStorage.

### Objetivo del intento

Implementar ambas funcionalidades en el recetario existente (React 19, TypeScript 7, Vite 8).

### Alcance y límites

- No se modifican archivos de dominio existentes (`categorias.ts`, `recipe.ts`, `search.ts`, `recetas-cargadas.ts`)
- No se modifican archivos de storage ni tests
- No se introduce ruteo, estado global ni dependencias externas

### Cambios solicitados

1. `src/domain/settings.ts` — crear tipo `AppSettings`, constantes `DEFAULT_SETTINGS`, funciones `loadSettings` y `saveSettings`
2. `src/components/SettingsPanel.tsx` — crear diálogo con campos anchorDelay y unanchorDelay, validación (200–10000ms), botones Guardar/Cancelar
3. `src/components/AlphabetStrip.tsx` — integrar props `anchorDelay` y `unanchorDelay`, lógica de anclaje con timers, estado `anchoredLetter`, data-anchored en DOM
4. `src/components/TopBar.tsx` — añadir prop `onSettings` y botón "Ajustes" en dropdown
5. `src/App.tsx` — importar settings, estado `settingsOpen` y `settings`, conectar props
6. `src/styles.css` — estilos para `.settings-dialog`, `.settings-field`, `.settings-hint`, `[data-anchored]`

### Comprobación técnica esperada

- npm run typecheck sin errores
- npm test (33/33) pasa
- npm run build exitoso

## Acciones realizadas

1. Creado `src/domain/settings.ts` con interfaz, defaults y persistencia localStorage
2. Creado `src/components/SettingsPanel.tsx` con diálogo modal accesible
3. Modificado `src/components/AlphabetStrip.tsx`: añadidos props `anchorDelay`/`unanchorDelay`, lógica de timers de anclaje, estado `anchoredLetter`, atributo `data-anchored`
4. Modificado `src/components/TopBar.tsx`: prop `onSettings`, botón "Ajustes" en dropdown con divider
5. Modificado `src/App.tsx`: import de settings y SettingsPanel, estado `settingsOpen`/`settings`, conexión de props a AlphabetStrip y TopBar
6. Modificado `src/styles.css`: estilos para diálogo, campos, divider, letra anclada

## Cambios y ubicación

### Archivos creados
- `src/domain/settings.ts` — tipo, defaults, load, save
- `src/components/SettingsPanel.tsx` — diálogo modal con dos campos, validación

### Archivos modificados
- `src/components/AlphabetStrip.tsx` — props anchorDelay/unanchorDelay, lógica de anclaje
- `src/components/TopBar.tsx` — prop onSettings, botón "Ajustes"
- `src/App.tsx` — integración de settings, estado, paso de props
- `src/styles.css` — estilos nuevos para settings y anclaje

### Archivos no modificados (protegidos)
- `src/domain/categorias.ts`, `src/domain/recipe.ts`, `src/domain/search.ts`, `src/domain/recetas-cargadas.ts`
- `src/storage/**`, `tests/**`

## Comprobaciones y evidencias

| Comprobación | Resultado |
|---|---|
| npm run typecheck | ✅ Sin errores |
| npm test (33/33) | ✅ 5 files, 33 passed |
| npm run build | ✅ Build exitoso |

## Relaciones

- Ciclo: CIC-20260724-005
