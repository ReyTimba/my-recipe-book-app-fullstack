---
id: "INT-20260723-004"
tipo: intento
estado: comprobado
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-23"
actualizado: "2026-07-23"
aliases: []
tags: []
ciclo: "[[CIC-20260721-001-construir-mvp-del-recetario]]"
numero_intento: 4
intento_anterior: "[[INT-20260723-003-modelo-recetas-v2]]"
resultado_tecnico: satisfactorio
archivos_afectados:
  - README.md
  - docs/modelo-recetas-v2.md
  - src/App.tsx
  - src/components/recipe-card.tsx
  - src/components/recipe-detail.tsx
  - src/components/recipe-form.tsx
  - src/domain/recipe.ts
  - src/domain/search.ts
  - src/storage/recipe-storage.ts
  - tests/fixtures/browser-v1-backup.json
  - tests/fixtures/browser-v2-backup.json
  - tests/fixtures/recipe-v2.ts
  - tests/recipe-v2.test.ts
  - tests/recipe.test.ts
  - tests/storage.test.ts
  - memoria/temporal/transportes/MSG-20260723-004-paquete-recuperacion-modelo-recetas-v2.yaml
  - memoria/temporal/INT-20260723-004-modelo-recetas-v2.md
  - memoria/temporal/CIC-20260721-001-construir-mvp-del-recetario.md
---

# Modelo evolutivo de recetas v2

## Paquete recibido

Sobre literal `MSG-20260723-004-paquete-recuperacion-modelo-recetas-v2`, conservado una sola vez en `memoria/temporal/transportes/MSG-20260723-004-paquete-recuperacion-modelo-recetas-v2.yaml`.

SHA-256 del sobre conservado: `05A1CCC31C3E04CC3339AF47A197E3235AF457AD9A4B1977ECBB1BB32A955046`. Protocolo, tipo, autor, destino, identidad, autorización manual y cinco campos del paquete verificados; `huella_contenido: null` es válida en modo manual.

Raíz resuelta en ejecución: `C:/Users/Reynel/Desktop/sor-proyectos/recetario`. Bóveda resuelta en ejecución: `C:/Users/Reynel/Desktop/sor-proyectos/recetario/memoria`.

## Estado recuperado y línea base

- Se recuperó el único ciclo no cerrado `CIC-20260721-001`, con aceptación humana pendiente, y la parada de `INT-20260723-003`.
- La evidencia interactiva previa fue aportada por el anfitrión en el paquete y satisfizo la precondición del recorrido sin cambios productivos.
- Antes de editar coincidieron las huellas protegidas: `recetas_extraidas.md` `F25FF7F44FDD5786138864C9B473FDD19E3C35A99AC2D2E79D8F899D4A2F80CA`; `src/domain/recipe.ts` `C8F0E85FC7A459AE71A71372A08D2F7E7CAC278CFE1D7207B2F16599717D61D3`; `src/storage/recipe-storage.ts` `4660D6943C8F24016BA09B760AD20005C951A44FDCF3BB120C03E700FA5D5DB5`.
- Línea base: `npm test` aprobó 4 archivos y 26 pruebas; `npm run typecheck` y `npm run build` aprobaron.
- Se leyó `recetas_extraidas.md` completa y se clasificaron recetas simples, múltiples preparaciones, componentes y referencias; rendimientos por ración, lote y texto libre; cantidades exactas, rangos, aproximadas, proporcionales, al gusto y desconocidas; preparación ausente o incompleta; tiempos, temperaturas, equipos, conservación, fuentes e incertidumbres.

## Cambios realizados

- `Recipe` evolucionó a `schemaVersion: 2` con estados explícitos para ausencia, incertidumbre e incompletitud; cantidades y rendimientos discriminados; pasos enriquecidos; secciones, referencias estables por id, fuentes, conservación e incertidumbres.
- El texto original permanece junto a la interpretación estructurada. `null` representa ausencia en porciones y tiempos, sin confundirla con el valor numérico `0`.
- Se añadieron parsing, validación, copias defensivas, unicidad de identificadores, integridad de destinos, rechazo de autorreferencias y ciclos, creación y edición preservando datos avanzados.
- La migración v1→v2 es determinista e idempotente y conserva una copia íntegra tipada en `migration.original`; la clave v1 nunca se modifica. Persistencia y backups validan la colección completa antes de una única escritura; importan v1/v2, exportan v2 y rechazan versiones o datos inválidos.
- Listado, detalle, tarjeta, formulario, búsqueda y CRUD se adaptaron mínimamente. La eliminación se impide si dejaría una referencia colgante.
- `docs/modelo-recetas-v2.md` documenta matriz, contrato, invariantes, reversibilidad, límites y evolución.
- Se añadieron fixtures sintéticas solo bajo `tests/fixtures/`; no se cargaron las 55 preparaciones en producción.

## Comprobación estática

- La primera compilación tras adaptar dominio, almacenamiento y UI detectó cinco errores exclusivamente en pruebas v1 que todavía construían ingredientes y pasos con la forma antigua. Se actualizaron esas pruebas; no se atribuyó el fallo al producto final.
- Resultado final repetido: `npm test` aprobó 5 archivos y 33/33 pruebas; `npm run typecheck` aprobó; `npm run build` aprobó con 24 módulos transformados.
- Las pruebas cubren conservación completa v1, origen recuperable, doble migración idempotente, carga no destructiva, round-trip v2, importación v1, rechazo sin escritura parcial, matriz avanzada, referencias ausentes/duplicadas/cíclicas, copias defensivas y edición sin pérdida.
- Los dos archivos de navegador fueron validados por el mismo importador de la aplicación dentro de la suite.
- Huellas finales relevantes: `src/domain/recipe.ts` `C0E8C9E9DE3AB72831B94E1874753E470A2EDA9CE22ABE0AFF0ACDB14B2468FD`; `src/storage/recipe-storage.ts` `44B74F1AC697FFCFA525728A1C61835F9BC74CE1A11A9A8F7D304C857265DE05`; `docs/modelo-recetas-v2.md` `7D351DCEFB42FFD763C8914A6AB9D9287370516574EC6087D1E85FAA9D51F933`; fixture v1 `A309326D585149A7B2EDE0502D14466437D9A65E26756A5B87D2D41E1DDFBA66`; fixture v2 `55C79A39C1D929031B8878C875488CB279EA2E4C6A846A774C2F523E1F758B53`.
- `recetas_extraidas.md` conserva al final la huella protegida `F25FF7F44FDD5786138864C9B473FDD19E3C35A99AC2D2E79D8F899D4A2F80CA`.
- El alcance se limitó a las rutas autorizadas. No se cambiaron dependencias, archivos de paquete, datos iniciales, servicios externos, servidor ni memoria operativa; no hubo commit.

## Evidencia interactiva final atribuida

Productor: anfitrión mediante navegador integrado, sobre el origen aislado `http://127.0.0.1:4174`.

- Importó `tests/fixtures/browser-v1-backup.json`, confirmó la restauración y abrió una receta migrada. Observó rendimiento 4, preparación 0 min, cocción 35 min, Agua 1–2 L y Sal con cantidad no indicada. Tras editar solo la descripción, rango, ausencia explícita y pasos permanecieron visibles.
- Ejecutó Exportar JSON y observó `Copia de seguridad descargada`. La superficie no expuso el archivo descargado: `schemaVersion: 2` y `migration.original` se atribuyen a las pruebas estáticas verdes, no a una lectura del archivo en navegador.
- Importó `tests/fixtures/browser-v2-backup.json` y restauró dos recetas. En la receta avanzada observó rendimiento libre, preparación no indicada, cocción 0 min, preparación incompleta, cantidades aproximada/desconocida/proporcional, tiempo, temperatura, equipo, sección, fuente, conservación, referencia e incertidumbre.
- Editó solo la descripción; al guardar y reabrir, todos los datos avanzados siguieron visibles.
- La búsqueda `salsa base` devolvió ambas recetas, incluida la coincidencia por referencia. Alternó favorita, recargó y comprobó persistencia.
- Una pestaña nueva al terminar mostró el estado v2 persistido y consola con 0 warnings y 0 errors. Dos errores HMR históricos aparecieron únicamente en una pestaña abierta durante la edición de `App` y formulario; no se reprodujeron en la sesión final limpia.

La comprobación interactiva obligatoria es satisfactoria. La limitación de observabilidad de la descarga no degrada el resultado porque la exportación se activó en navegador y la estructura y conservación fueron comprobadas directamente por pruebas de dominio y almacenamiento.

## Resultado, límites y pendientes

Resultado técnico: `satisfactorio`. El modelo v2 representa los casos identificados, mantiene compatibilidad reversible con v1 y conserva los flujos esenciales del MVP.

No quedan errores o bloqueos dentro del paquete. Quedan fuera de alcance la carga de las 55 recetas y un editor avanzado completo. La aceptación humana permanece pendiente; no se consolidó ni cerró el ciclo y no se creó commit.

Inicio, fin, duración, bytes, líneas, intervenciones, recuperaciones y tokens/contexto: `null`, porque el anfitrión no aportó esas métricas y no se estimaron.
