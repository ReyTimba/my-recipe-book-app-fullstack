---
id: "INT-20260723-002"
tipo: intento
estado: comprobado
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-23"
actualizado: "2026-07-23"
aliases: []
tags: []
ciclo: "[[CIC-20260721-001-construir-mvp-del-recetario]]"
numero_intento: 2
intento_anterior: "[[INT-20260721-001-implementar-mvp-del-recetario]]"
resultado_tecnico: satisfactorio
archivos_afectados:
  - recetas_extraidas.md
  - memoria/temporal/transportes/MSG-20260723-001-paquete-extraccion-recetas.yaml
  - memoria/temporal/INT-20260723-002-extraer-recetas-de-imagenes.md
  - memoria/temporal/CIC-20260721-001-construir-mvp-del-recetario.md
---

# Extraer recetas de imágenes

## Paquete recibido

Sobre literal: `MSG-20260723-001-paquete-extraccion-recetas`, en `memoria/temporal/transportes/MSG-20260723-001-paquete-extraccion-recetas.yaml`.

Huella SHA-256 del sobre conservado: `EE06483E91D1D3F0C3CD6054FED7011FFEBE7A44F41A253FD8FA1DABB09BA693`; identificador y contenido verificados.

Raíz resuelta: `C:/Users/Reynel/Desktop/sor-proyectos/recetario`. Bóveda resuelta: `C:/Users/Reynel/Desktop/sor-proyectos/recetario/memoria`.

## Acciones realizadas

- Huella del ZIP verificada y ausencia inicial del Markdown confirmada.
- 48 JPEG extraídos solo a un directorio temporal efímero y revisados a resolución original.
- 55 recetas o preparaciones transcritas con fuente y cobertura individual.
- Una recuperación de vivacidad autorizada; estado reconstruido desde la bóveda antes de continuar.

## Cambios y ubicación

- `recetas_extraidas.md` y los tres registros temporales enumerados en Properties.

## Comprobaciones y evidencias

- ZIP antes y después: `0CCF01DCB5B75AB8CDC6973D4C4171429E557A56717234B7B366BDA35FD7573A`.
- Cobertura visual: 48/48; recetas/preparaciones: 55.
- Markdown con título, secciones, fuentes y tabla de cobertura; dudas marcadas sin inferencias.
- SHA-256 de `recetas_extraidas.md`: `F25FF7F44FDD5786138864C9B473FDD19E3C35A99AC2D2E79D8F899D4A2F80CA`.
- Tamaño observado: 21023 bytes y 458 líneas.
- Aceptación pendiente; ciclo no cerrado ni consolidado.

## Errores, bloqueos y pendientes

- Dudas: roux de Goulash (`1777285782731.jpg`), agua de Scrippelle (`1777285782835.jpg`) y cebolla de Sarde in saor (`1777285782996.jpg`).
- Continuaciones ausentes: final de albóndigas cacio e ove y gravlax de bonito.
- Inicio, fin, duración, tokens/contexto y número de intervenciones: `null` (no aportados por el anfitrión; no estimados). Recuperaciones observadas: 1.

## Rectificaciones

- No se normalizaron ni completaron cantidades ambiguas.
