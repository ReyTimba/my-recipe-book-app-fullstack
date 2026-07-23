---
id: "CON-20260723-001"
tipo: conocimiento
estado: vigente
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-23"
actualizado: "2026-07-23"
aliases: []
tags: []
ciclo_origen: "[[CIC-20260721-001-construir-mvp-del-recetario]]"
intentos_origen:
  - "[[INT-20260721-001-implementar-mvp-del-recetario]]"
  - "[[INT-20260723-002-extraer-recetas-de-imagenes]]"
  - "[[INT-20260723-004-modelo-recetas-v2]]"
  - "[[INT-20260723-005-cargar-recetas-en-recetario]]"
decisiones_relacionadas:
  - "[[DEC-20260723-001-aceptacion-resultados-ciclo-mvp]]"
sustituye: []
---

# Consolidación del ciclo MVP del recetario

## Conocimiento adoptado

### 1. Aplicación recetario (INT-20260721-001)
App web 100% frontend con React 19 + TypeScript 7 + Vite 8, sin backend, persistencia en localStorage.
Capacidades: CRUD de recetas, búsqueda sin acentos (NFD), filtros por favoritos/etiquetas, marcado de favoritos, exportación/importación de copias de seguridad JSON validadas, diálogos de confirmación accesibles.
Arquitectura: `src/domain/` (tipos, validación, búsqueda), `src/storage/` (persistencia), `src/components/` (UI), 33 tests.

### 2. 55 recetas extraídas (INT-20260723-002)
Transcripción de 55 recetas/preparaciones desde 48 imágenes JPG, documentadas en `recetas_extraidas.md`.
Incluye tabla de cobertura, 3 dudas marcadas (Goulash roux, Scrippelle agua, Sarde in saor cebolla) y 2 preparaciones incompletas (albóndigas cacio e ove, gravlax de bonito).

### 3. Modelo Recipe v2 (INT-20260723-004)
Evolución del modelo de datos a schemaVersion 2 con:
- Ingredientes con cantidades estructuradas (exacta, rango, aproximada, proporcional, al gusto, desconocida)
- Pasos con estado, tiempo, temperatura y equipo
- Secciones (componente, fase, servicio) para recetas compuestas
- Referencias entre recetas con validación de grafo acíclico
- Fuentes, conservación e incertidumbres
- Migración reversible desde v1 manteniendo el original
- Persistencia versionada con clave `recetario:datos:v2`
- Documentación en `docs/modelo-recetas-v2.md`

### 4. 55 recetas cargadas (INT-20260723-005)
Las 55 recetas convertidas al modelo v2 e integradas como datos precargados en `src/domain/recetas-cargadas.ts`.
Cada receta incluye ingredientes estructurados, pasos, fuentes JPG, incertidumbres y metadatos.
`exampleRecipes()` se conserva intacto para compatibilidad con tests; la app usa `obtenerRecetasCargadas()` como fallback.

## Material no adoptado

- **INT-20260723-003**: Bloqueado por falta de navegador para prueba previa. Su objetivo fue retomado y completado por INT-20260723-004. Sin conocimiento que adoptar.
- **Verificación visual de importación/eliminación en MVP v1**: Limitación aceptada; los tests automáticos cubren esos caminos.
- **Dudas y continuaciones ausentes en recetas**: No resueltas; documentadas como incertidumbres en las recetas cargadas.

## Límites y trabajo pendiente

- La app es 100% local; no tiene cuentas, nube, sincronización ni colaboración.
- No incluye nutrición, lista de compras, planificación semanal ni imágenes de recetas.
- Las 3 dudas y 2 continuaciones ausentes de `recetas_extraidas.md` siguen abiertas para resolución futura.
- Pendiente de definir próximas iteraciones.

## Trazabilidad

- Ciclo: CIC-20260721-001
- Decisión de aceptación: DEC-20260723-001
- Intentos: 5 (1 bloqueado sin efecto, 1 parcial aceptado, 3 satisfactorios)
