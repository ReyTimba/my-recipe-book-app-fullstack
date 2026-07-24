---
id: "CON-20260724-002"
tipo: conocimiento
estado: vigente
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-24"
actualizado: "2026-07-24"
aliases: []
tags: []
ciclo_origen: "[[CIC-20260724-005-anclaje-ajustes]]"
intentos_origen:
  - "[[INT-20260724-002-anclaje-ajustes]]"
decisiones_relacionadas: []
sustituye: []
---

# Consolidación: anclaje en abecedario y panel de ajustes

## Conocimiento estable

1. **Mecanismo de anclaje en AlphabetStrip**: El componente mantiene un estado `anchoredLetter` que se activa tras mantener el dedo quieto ≥`anchorDelay` ms sobre una letra. Cuando está anclado, al salir de esa letra se inicia un temporizador de `unanchorDelay` ms; si no se regresa a la letra anclada en ese tiempo, se desancla (`setAnchoredLetter(null)`). En modo no anclado, el deslizamiento cambia la letra activa al instante sin espera.

2. **Persistencia de ajustes**: `src/domain/settings.ts` expone `loadSettings()` y `saveSettings()` que leen/escriben en localStorage bajo la clave `recetario-settings`. Los valores por defecto son `anchorDelay: 500` y `unanchorDelay: 200`. La función `loadSettings` hace merge con los defaults para tolerar claves faltantes.

3. **Panel de ajustes**: `SettingsPanel.tsx` es un diálogo modal accesible (role="dialog", aria-modal, aria-labelledby) con dos campos numéricos validados (rango 200–10000ms, step 100). Se abre desde el botón "Ajustes" en el dropdown de TopBar. Al guardar, se actualiza el estado en App.tsx y se persiste en localStorage.

4. **Integración**: App.tsx posee el estado `settings` (inicializado con `loadSettings()`) y lo pasa como props a AlphabetStrip (`anchorDelay`, `unanchorDelay`). TopBar recibe `onSettings` que abre el panel. El panel recibe los valores actuales y un `onSave` que actualiza estado y localStorage.

5. **Indicador visual**: Las letras ancladas reciben el atributo `data-anchored="true"` en el DOM, permitiendo estilos CSS diferenciados.

## Contexto de aplicación

Aplicación web React 19 + TypeScript 7 + Vite 8. El AlphabetStrip usa eventos pointer (pointerdown/move/up) y timers con `setTimeout`/`clearTimeout`. El panel de ajustes usa estado local con `useState` para los campos de texto antes de confirmar. La persistencia usa `localStorage` con sincronización manual (sin efectos reactivos automáticos más allá del guardado en `onSave`).

## Límites y excepciones

- Los valores se validan en cliente (200–10000ms, números finitos) pero no hay validación en servidor porque no lo hay.
- No hay sincronización entre pestañas: cambiar ajustes en una pestaña no afecta a otras abiertas.
- El desanclaje usa `unanchorDelay` si está definido, o cae a `anchorDelay` como fallback.
- El anclaje solo aplica en interacción táctil/puntero; no hay equivalente por teclado.
- Si se pulsa la letra activa (click sin arrastre) se deselecciona (comportamiento preexistente, no modificado).

## Trazabilidad

- Ciclo: CIC-20260724-005
- Intento: INT-20260724-002
