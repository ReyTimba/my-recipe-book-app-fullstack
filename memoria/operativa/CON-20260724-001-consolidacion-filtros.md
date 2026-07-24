---
id: "CON-20260724-001"
tipo: conocimiento
estado: vigente
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-24"
actualizado: "2026-07-24"
aliases: []
tags: []
ciclo_origen: "[[CIC-20260724-004-filtros-exclusivos]]"
intentos_origen:
  - "[[INT-20260724-001-filtros-exclusivos]]"
decisiones_relacionadas:
  - "[[DEC-20260723-002-aceptacion-resultados-boceto-ui]]"
sustituye: []
---

# Consolidación: filtros exclusivos categoría / abecedario

## Conocimiento estable

1. **Filtros mutuamente excluyentes**: Al seleccionar una categoría se resetea el filtro de letra (`letterFilter = ""`). Al seleccionar una letra del abecedario se resetea la categoría (`categoria = null`). Ambos filtros nunca se aplican simultáneamente: actúan como alternativas excluyentes.

2. **Abecedario completo**: El AlphabetStrip recibe siempre `data.recipes` (todas las recetas), no las recetas ya filtradas. Esto garantiza que se muestren todas las letras del alfabeto que tienen recetas, independientemente del filtro de categoría activo.

3. **Comportamiento esperado**:
   - Usuario selecciona «Carne» → se filtran solo recetas de carne, se limpia cualquier letra seleccionada.
   - Usuario selecciona letra «A» → se filtran recetas que empiezan por A, se limpia cualquier categoría seleccionada.
   - Usuario pulsa «Todas» en categorías → se limpia el filtro de categoría y el de letra, mostrando todas las recetas.

## Contexto de aplicación

Aplicación web React 19 + TypeScript 7 + Vite 8. Filtros controlados mediante estado React (`useState`) en `src/App.tsx` con dos variables: `categoria` (string | null) y `letterFilter` (string).

## Cambios realizados

### `src/App.tsx`
- **Línea 216** — `CategoryTabs onSelect`: al seleccionar categoría se ejecuta `setCategoria(id); setLetterFilter("")`.
- **Línea 249** — `AlphabetStrip`: recibe `data.recipes` (todas las recetas) y `onLetterSelect` ejecuta `setLetterFilter(letter); setCategoria(null)`.

## Límites y excepciones

- No existe un tercer filtro combinado. Si en el futuro se desea aplicar categoría y letra simultáneamente, será necesario un cambio de comportamiento.
- El abecedario siempre muestra todas las letras de todas las recetas, incluso si hay una categoría activa. Esto es intencional por diseño.

## Trazabilidad

- Ciclo: CIC-20260724-004
- Intento: INT-20260724-001
- Decisión relacionada: DEC-20260723-002 (UI boceto — base sobre la que se aplica este ajuste)
