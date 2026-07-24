---
id: "CIC-20260724-004"
tipo: ciclo
estado: consolidado_cerrado
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-24"
actualizado: "2026-07-24"
aliases: []
tags: []
intentos:
  - "[[INT-20260724-001]]"
ciclo_anterior: "[[CIC-20260723-003-boceto-ui-recetario]]"
aceptacion_humana: aceptada
fecha_aceptacion: "2026-07-24"
consolidado_en:
  - "[[CON-20260724-001-consolidacion-filtros]]"
---

# Filtros exclusivos — categoría y abecedario como modos mutuamente excluyentes

## Petición original

Los filtros de categoría y abecedario deben comportarse como modos exclusivos: al seleccionar uno, se resetea el otro. El abecedario siempre muestra todas las letras de todas las recetas.

## Objetivo y alcance acordados

Hacer que categoría y abecedario actúen como navegación mutuamente excluyente:
- Seleccionar categoría resetea la letra activa
- Seleccionar letra resetea la categoría activa
- El abecedario siempre muestra letras de todas las recetas

## Seguimiento

- 2026-07-24 — Ciclo creado, intento ejecutado con un primer enfoque incorrecto (combinatorio) que fue revertido y corregido al comportamiento exclusivo solicitado.
- 2026-07-24 — Humano aceptó el resultado y solicitó consolidar y cerrar.

## Relaciones y trazabilidad

- Proyecto: [[PRO-20260721-001-recetario]]
- Intento: [[INT-20260724-001]]
- Consolidación: [[CON-20260724-001-consolidacion-filtros]]
