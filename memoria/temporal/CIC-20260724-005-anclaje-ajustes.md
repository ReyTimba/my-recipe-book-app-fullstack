---
id: "CIC-20260724-005"
tipo: ciclo
estado: consolidado_cerrado
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-24"
actualizado: "2026-07-24"
aliases: []
tags: []
intentos:
  - "[[INT-20260724-002]]"
ciclo_anterior: "[[CIC-20260724-004-filtros-exclusivos]]"
aceptacion_humana: aceptada
fecha_aceptacion: "2026-07-24"
consolidado_en:
  - "[[CON-20260724-002-consolidacion-anclaje]]"
---

# Anclaje/desanclaje en abecedario y panel de ajustes

## Petición original

Implementar dos funcionalidades:
1. **Anclaje en el abecedario**: al detener el dedo ≥500ms sobre una letra → se ancla. Al salir de la letra anclada → espera 200ms → suelta el ancla. En modo normal, el deslizamiento cambia letras al instante.
2. **Panel de ajustes**: permitir configurar los tiempos de anclaje y desanclaje desde un diálogo accesible desde el menú superior.

## Objetivo y alcance acordados

- Añadir lógica de anclaje con timers configurables en `AlphabetStrip.tsx`
- Crear módulo `src/domain/settings.ts` con tipo, constantes y load/save en localStorage
- Crear componente `src/components/SettingsPanel.tsx` con dos campos numéricos y validación
- Agregar botón "Ajustes" en el dropdown de `TopBar.tsx`
- Integrar settings en `App.tsx` y pasar props a AlphabetStrip
- Añadir estilos para diálogo y letra anclada en `styles.css`
- typecheck, tests y build deben pasar

## Seguimiento

- 2026-07-24 — Ciclo creado, trabajo ejecutado directamente por el humano sin ciclo SOR formal. Cambios revisados y verificados.
- 2026-07-24 — Humano aceptó el resultado y solicitó consolidar y cerrar.

## Relaciones y trazabilidad

- Proyecto: [[PRO-20260721-001-recetario]]
- Intento: [[INT-20260724-002]]
- Consolidación: [[CON-20260724-002-consolidacion-anclaje]]
