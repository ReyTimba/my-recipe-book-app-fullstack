---
id: "INT-20260723-005"
tipo: intento
estado: aceptado
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-23"
actualizado: "2026-07-23"
aliases: []
tags: []
ciclo: "[[CIC-20260721-001-construir-mvp-del-recetario]]"
numero_intento: 5
intento_anterior: "[[INT-20260723-004-modelo-recetas-v2]]"
resultado_tecnico: satisfactorio
archivos_afectados:
  - src/domain/recetas-cargadas.ts
  - src/App.tsx
  - memoria/temporal/transportes/MSG-20260723-005-paquete-cargar-recetas.yaml
  - memoria/temporal/INT-20260723-005-cargar-recetas-en-recetario.md
  - memoria/temporal/CIC-20260721-001-construir-mvp-del-recetario.md
---

# Cargar las 55 recetas en el recetario

## Paquete recibido

Sobre literal `MSG-20260723-005-paquete-cargar-recetas`, conservado en `memoria/temporal/transportes/MSG-20260723-005-paquete-cargar-recetas.yaml`.

Autorización humana otorgada el 2026-07-23 para ejecutar el objetivo exacto descrito.

Raíz resuelta: `C:/Users/Reynel/Desktop/sor-proyectos/recetario`. Bóveda resuelta: `C:/Users/Reynel/Desktop/sor-proyectos/recetario/memoria`.

## Acciones realizadas

1. Verificado estado inicial: npm test (33/33), npm run typecheck, npm run build — todos correctos
2. Verificada huella SHA-256 de recetas_extraidas.md: F25FF7F44FDD5786138864C9B473FDD19E3C35A99AC2D2E79D8F899D4A2F80CA ✅
3. Creado `src/domain/recetas-cargadas.ts` con las 55 recetas convertidas al modelo Recipe v2
4. Modificado `src/App.tsx` para cargar las 55 recetas como datos iniciales (`obtenerRecetasCargadas()`)
5. `src/domain/recipe.ts` y `exampleRecipes()` se mantienen intactos para compatibilidad con tests existentes
6. Verificación final: npm test (33/33), typecheck, build — todos correctos

## Cambios y ubicación

### Archivos creados
- `src/domain/recetas-cargadas.ts` (7030 líneas, 193 KB)
  - Exporta `obtenerRecetasCargadas(): Recipe[]` con las 55 recetas
  - Cada receta incluye: ingredientes con cantidades estructuradas, pasos con estado, fuentes JPG, incertidumbres, tags y metadatos

### Archivos modificados
- `src/App.tsx`
  - Añadido import de `obtenerRecetasCargadas` desde `./domain/recetas-cargadas`
  - Modificado `initialState()` para usar `obtenerRecetasCargadas()` como fallback en lugar de `exampleRecipes()`

### Archivos no modificados (protegidos)
- `src/domain/recipe.ts` — sin cambios en tipos, interfaces, validación ni migración
- `src/storage/recipe-storage.ts` — sin cambios
- `src/domain/search.ts` — sin cambios
- `tests/**` — sin cambios
- `recetas_extraidas.md` — huella original conservada

## Comprobaciones y evidencias

### Obligatorias — todas aprobadas
| Comprobación | Resultado |
|---|---|
| npm test (33/33) | ✅ 5 files, 33 passed |
| npm run typecheck | ✅ Sin errores |
| npm run build | ✅ Producción generada (310 KB) |
| SHA-256 recetas_extraidas.md | ✅ F25FF7F44FDD5786138864C9B473FDD19E3C35A99AC2D2E79D8F899D4A2F80CA |
| 55 recetas presentes | ✅ 55 objetos con schemaVersion: 2 |
| IDs únicos, nombres no vacíos | ✅ Cada receta tiene id único via rId() y name no vacío |
| Fuentes imagen como RecipeSource | ✅ Todas con kind "image" vía img() |
| 3 dudas documentadas | ✅ Goulash (roux), Scrippelle (agua), Sarde in saor (cebolla) — state "uncertain" |
| 2 continuaciones ausentes | ✅ Albóndigas, Gravlax — preparationStatus "incomplete" |
| Modelo Recipe no modificado | ✅ Sin cambios en tipos, interfaces, validación |
| Storage no modificado | ✅ recipe-storage.ts sin cambios |

### Recomendadas
| Comprobación | Estado |
|---|---|
| Recetas con secciones | ✅ Lingote (2 components), Puerro (5 phases), Pastrami (2 phases), Fresas (3 components) |
| Referencias entre recetas | ✅ Puerro references crema-de-pecorino y crema-de-yema |
| Rendimiento explícito | ✅ Volcán (x3), Steak Tartar (x3), Salsa torrijas (500 ml), Tonnata (x2) |
| Texto original conservado | ✅ Campos originalText en cantidades, pasos completos |

## Errores, bloqueos y pendientes

### Bloqueo resuelto: Tests acoplados a datos de ejemplo
Los tests existentes (search, recipe, storage) están acoplados a las recetas de ejemplo originales (tortilla, lentejas). La solución fue:
- Mantener `exampleRecipes()` sin cambios (compatible con tests)
- Modificar `App.tsx` para que use `obtenerRecetasCargadas()` como datos iniciales
- Así la app carga las 55 recetas y los tests siguen pasando

### Pendiente: Recorrido en navegador
La verificación visual en navegador queda pendiente (responsable: anfitrión humano):
- Abrir la app, observar al menos 10 recetas listadas
- Abrir detalle de una receta compleja (Fresas con crema, Lingote de chocolate)
- Verificar que ingredientes y pasos son legibles

## Rectificaciones

- Durante la generación se corrigió: cantidades con kind "unknown" no pueden tener originalText no vacío (validación del modelo). Todas las instancias se serializaron correctamente desde el generador con originalText vacío para unknown.
- Se evitó modificar recipe.ts ante el conflicto tests/datos; se optó por modificar App.tsx como alternativa autorizada.
