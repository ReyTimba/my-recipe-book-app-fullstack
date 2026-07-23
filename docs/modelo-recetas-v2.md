# Modelo de recetas v2

La versión 2 amplía el modelo original sin cargar las recetas extraídas en la aplicación. Su objetivo es representar fielmente recetas simples y compuestas, conservar incertidumbres y permitir una migración reversible desde v1.

## Casos cubiertos

| Caso observado | Representación v2 |
| --- | --- |
| Receta simple | `ingredients` y `steps` de nivel raíz |
| Preparaciones, fases o servicio | `sections[]`, cada una con ingredientes, pasos y referencias |
| Componente definido en otra receta | `references[]` por `targetRecipeId`; nunca por nombre |
| Cantidad exacta, intervalo o aproximada | `quantity.kind`: `exact`, `range` o `approximate` |
| Proporción, “al gusto” o dato ausente | `proportional`, `to_taste` o `unknown` |
| Rendimiento por raciones, unidades, peso, volumen o lote | `yield.kind` y `yield.originalText` |
| Rendimiento libre o desconocido | `free_text` o `unknown` |
| Preparación no visible o incompleta | `preparationStatus`: `absent` o `incomplete` |
| Tiempo, temperatura y equipo por paso | metadatos opcionales de cada `RecipeStep` |
| Conservación | `conservation`, manteniendo el texto original |
| Fuente y duda trazable | `sources[]` y `uncertainties[]` con referencia opcional a la fuente |

## Contrato e invariantes

- Toda receta persistida tiene `schemaVersion: 2` e identificador estable.
- Ausencia no equivale a cero: porciones y tiempos desconocidos son `null`; `0` conserva su significado numérico real.
- Los textos originales de cantidades, rendimientos y metadatos se conservan junto a su interpretación estructurada.
- Los identificadores de receta son únicos. Una referencia debe apuntar a una receta presente, no puede apuntarse a sí misma y el grafo no admite ciclos.
- Ingredientes, pasos, secciones, referencias, fuentes e incertidumbres tienen identificadores no vacíos y únicos dentro de su ámbito.
- La colección completa se valida antes de reemplazar el estado o escribir almacenamiento.
- El formulario básico modifica solo los campos que expone y conserva los campos avanzados que no edita.

## Migración y reversibilidad

La aplicación busca primero `recetario:datos:v2`. Si no existe, lee `recetario:datos:v1`, lo migra en memoria y no altera ni elimina la clave v1. El primer guardado posterior escribe una única clave v2.

Cada receta migrada guarda en `migration.original` una copia tipada e íntegra de la receta v1 y declara `sourceSchemaVersion: 1`. Así se conserva el dato de origen y puede reconstruirse exactamente el registro anterior. Aplicar la migración a una receta ya v2 es idempotente.

Las copias de seguridad v1 siguen siendo importables. La exportación siempre produce v2. Una copia desconocida o inválida se rechaza antes de modificar datos.

## Evolución futura

Los discriminantes (`kind`, `status`, `state`, `relation`) permiten añadir representaciones sin reinterpretar silenciosamente datos existentes. Una futura versión debe añadir un nuevo número de esquema, migración explícita, validación de colección y conservación de la representación de origen; no debe reutilizar un significado existente para otro concepto.

## Fixtures de comprobación

- `tests/fixtures/browser-v1-backup.json`: copia v1 mínima para comprobar migración y edición.
- `tests/fixtures/browser-v2-backup.json`: copia v2 con componente, intervalo, “al gusto”, cantidad aproximada/proporcional/desconocida, rendimiento libre, preparación incompleta, tiempo, temperatura, equipo, fuente, conservación e incertidumbre.

Estas copias son datos aislados de prueba y no forman parte del recetario inicial.
