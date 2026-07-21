---
id: "PRO-20260721-001"
tipo: proyecto
estado: activo
raiz_proyecto: "."
ruta_boveda: "memoria"
creado: "2026-07-21"
actualizado: "2026-07-21"
aliases:
  - Recetario
tags: []
---

# Recetario

## Identidad

- Nombre: Recetario
- Raíz lógica: `.`
- Bóveda: `memoria`
- Estado: activo

La ubicación absoluta se resuelve en cada ejecución y no forma parte de la identidad portable.

## Propósito vigente

Crear un recetario personal que ayude a guardar, encontrar y cocinar recetas propias de forma sencilla, local y adaptable a móvil.

## Alcance

El primer MVP cubrirá recetas, ingredientes, pasos, porciones, tiempos, etiquetas, favoritos, búsqueda, filtros, persistencia local y copias de seguridad JSON.

## Estado estable

- Repositorio y bóveda SOR inicializados desde el kit oficial de `sor-nucleo`.
- Producto tratado como proyecto real e independiente, no como prueba interna de SOR.
- Primer ciclo funcional preparado como un bloque grande y revisable.

## Límites y riesgos

- El MVP será personal y local; no tendrá cuentas, nube ni colaboración.
- No incluirá nutrición, lista de compras, planificación semanal, imágenes ni generación con IA.
- La persistencia local necesita exportación e importación para que la persona pueda respaldar sus datos.
- La utilidad, el modelo de datos y la experiencia se refinarán con uso real, no mediante funciones añadidas por anticipado.
