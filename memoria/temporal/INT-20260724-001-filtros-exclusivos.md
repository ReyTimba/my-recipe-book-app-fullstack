---
id: "INT-20260724-001"
tipo: intento
estado: aceptado
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-24"
actualizado: "2026-07-24"
aliases: []
tags: []
ciclo: "[[CIC-20260724-004-filtros-exclusivos]]"
numero_intento: 1
intento_anterior: null
resultado_tecnico: satisfactorio
archivos_afectados:
  - src/App.tsx
  - memoria/temporal/CIC-20260724-004-filtros-exclusivos.md
  - memoria/temporal/INT-20260724-001-filtros-exclusivos.md
---

# Filtros exclusivos — categoría y abecedario como modos mutuamente excluyentes

## Paquete recibido

### Petición original

Hacer que categoría y abecedario sean filtros exclusivos:
- Categoría seleccionada resetea letra activa
- Letra seleccionada resetea categoría activa
- Abecedario siempre muestra todas las letras

### Cambios solicitados

1. En CategoryTabs onSelect: al seleccionar categoría, resetear letterFilter
2. En AlphabetStrip: pasar data.recipes (todas las recetas) para que siempre muestre todas las letras
3. En onLetterSelect: al seleccionar letra, resetear categoria a null

### Comprobación técnica esperada

- typecheck sin errores
- tests (33/33) pasan
- build exitoso

## Acciones realizadas

1. Revertido cambio previo que eliminaba setLetterFilter("") de CategoryTabs onSelect
2. Revertido cambio previo que pasaba visibleRecipes a AlphabetStrip (volviendo a data.recipes)
3. Añadido setCategoria(null) en onLetterSelect del AlphabetStrip

## Cambios y ubicación

### Archivos modificados
- `src/App.tsx` — líneas 216 y 249

### Archivos no modificados (protegidos)
- Componentes AlphabetStrip.tsx, CategoryTabs.tsx — intactos
- domain/, storage/, tests/ — intactos

## Comprobaciones y evidencias

| Comprobación | Resultado |
|---|---|
| npm run typecheck | ✅ Sin errores |
| npm test (33/33) | ✅ 5 files, 33 passed |
| npm run build | ✅ 28 módulos, build exitoso |

## Relaciones

- Ciclo: CIC-20260724-004
