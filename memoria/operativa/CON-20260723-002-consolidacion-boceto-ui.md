---
id: "CON-20260723-002"
tipo: conocimiento
estado: vigente
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-23"
actualizado: "2026-07-23"
aliases: []
tags: []
ciclo_origen: "[[CIC-20260723-003-boceto-ui-recetario]]"
intentos_origen:
  - "[[INT-20260723-007-boceto-ui-recetario]]"
decisiones_relacionadas:
  - "[[DEC-20260723-002-aceptacion-resultados-boceto-ui]]"
sustituye: []
---

# Consolidación del ciclo boceto UI

## Conocimiento estable

1. **Interfaz boceto**: UI tipo libro de cocina/restaurante con barra superior (logo, Carta/Menú, buscar, ⋮), categorías de cocina como tabs horizontales, abecedario A-Z estático con interacción por deslizamiento, tarjetas de receta con foto/logo placeholder e ingredientes, y detalle con escalado de porciones.

2. **Categorías de cocina**: 6 categorías que reemplazan el sistema de etiquetas anterior: Carnes y Aves, Pescados y Mariscos, Arroces/Pastas/Guisos, Salsas/Fondos/Aderezos, Guarniciones/Verduras, Masas/Entrantes/Postres. Definidas en `src/domain/categorias.ts`.

3. **Reclasificación**: Las 55 recetas en `recetas-cargadas.ts` se reclasificaron en las 6 categorías mediante lookup table interna. Cada receta tiene un único tag correspondiente a su categoría.

4. **CRUD completo**: Se conserva crear, editar, eliminar, importar y exportar recetas, accesible desde el menú ⋮ en la barra superior. Los formularios y diálogos existentes se mantienen funcionales.

5. **Escalado de ingredientes**: En vista detalle, el usuario puede ajustar el número de porciones y los ingredientes se escalan proporcionalmente.

6. **Abecedario interactivo**: Strip A-Z que solo muestra letras con recetas. Al deslizar el dedo aparece un popup temporal con los nombres. La letra seleccionada queda resaltada. Al tocar la misma letra se deselecciona.

## Contexto de aplicación

Aplicación web React 19 + TypeScript 7 + Vite 8, diseño responsive mobile-first, persistencia en localStorage, sin backend.

## Límites y excepciones

- La reclasificación en 6 categorías es manual y puede contener errores.
- Las recetas solo tienen un tag (su categoría), perdiendo los tags descriptivos originales.
- La búsqueda textual sigue funcionando sobre nombre, ingredientes y pasos.

## Trazabilidad

- Ciclo: CIC-20260723-003
- Intento: INT-20260723-007
- Decisión: DEC-20260723-002
