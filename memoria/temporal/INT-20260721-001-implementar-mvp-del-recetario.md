---
id: "INT-20260721-001"
tipo: intento
estado: instruido
proyecto: "[[PRO-20260721-001-recetario]]"
creado: "2026-07-21"
actualizado: "2026-07-21"
aliases: []
tags: []
ciclo: "[[CIC-20260721-001-construir-mvp-del-recetario]]"
numero_intento: 1
intento_anterior: ""
resultado_tecnico: pendiente
archivos_afectados: []
---

# Implementar el MVP del recetario

## Paquete recibido

### Petición original

> un recetario.

El humano quiere probar SOR creando aplicaciones reales y refinarlo únicamente cuando el trabajo revele fricciones concretas.

### Objetivo del intento

Entregar un MVP completo y agradable de usar que permita gestionar y consultar un recetario personal desde móvil o escritorio, sin cuentas ni servicios externos.

### Alcance y límites

Producto:

- una sola persona y un solo dispositivo por ahora;
- aplicación web responsive con React, TypeScript y Vite;
- funcionamiento local, sin backend, cuenta, telemetría ni llamadas externas en tiempo de ejecución;
- persistencia versionada en `localStorage`, separada de la lógica de dominio;
- copia de seguridad completa mediante exportación e importación JSON validada;
- interfaz en español, accesible y diseñada para cocinar y consultar con rapidez.

Cada receta tendrá:

- identificador estable;
- nombre obligatorio y descripción opcional;
- porciones, tiempo de preparación y tiempo de cocción;
- ingredientes ordenados con cantidad, unidad y nombre;
- pasos ordenados;
- etiquetas normalizadas;
- estado favorito;
- fechas de creación y actualización.

Funciones incluidas:

- listado y detalle de recetas;
- creación, edición y eliminación con confirmación;
- búsqueda por nombre, ingrediente o etiqueta;
- filtros por todas, favoritas y etiqueta;
- estados vacíos y mensajes de validación útiles;
- datos de ejemplo solo durante el primer uso;
- exportación e importación del recetario completo;
- diseño adaptable a móvil y escritorio.

Fuera de alcance:

- autenticación, nube, sincronización y colaboración;
- imágenes y archivos adjuntos;
- nutrición, lista de compras y planificación de comidas;
- generación o análisis mediante IA;
- publicación y despliegue público;
- cambios en `sor-nucleo` o `sor-interfaz`.

No ampliar el alcance para resolver posibilidades futuras. Detenerse ante una decisión que cambie el modelo de producto, requiera un servicio externo, implique pérdida de datos no recuperable o contradiga estos límites.

### Cambios solicitados

1. Inicializar React, TypeScript y Vite con versiones fijadas y scripts claros.
2. Definir el modelo de receta, normalización, validación y almacenamiento versionado.
3. Implementar CRUD completo sin mutaciones accidentales y con identificadores estables.
4. Añadir búsqueda, filtros y favoritos sin alterar las recetas almacenadas.
5. Implementar importación y exportación JSON con validación total antes de reemplazar datos.
6. Diseñar una experiencia cálida, legible y responsive, con navegación simple entre listado, detalle y formulario.
7. Incluir recetas de ejemplo en el primer uso y estados vacíos comprensibles.
8. Añadir pruebas del dominio, almacenamiento, búsqueda, filtros, importación y regresiones esenciales.
9. Documentar instalación, ejecución, pruebas, datos y límites.
10. Realizar un recorrido funcional real en navegador: crear, editar, buscar, filtrar, marcar favorita, recargar, exportar, importar y eliminar.
11. Registrar evidencia y dejar el ciclo pendiente de una sola aceptación humana del MVP completo.

### Comprobación técnica esperada

- instalación reproducible y lockfile presente;
- TypeScript sin errores, pruebas completas y build de producción satisfactorio;
- pruebas de creación, normalización, actualización, eliminación y persistencia tras una instancia nueva;
- búsquedas por nombre, ingrediente y etiqueta; filtros sin mutación;
- importación inválida rechazada sin cambiar datos e importación válida completa;
- flujo accesible mediante teclado, etiquetas y mensajes anunciables;
- recorrido funcional real sin errores de consola;
- presentación usable en anchura móvil y de escritorio;
- solo un ciclo abierto con un intento enlazado;
- ninguna escritura fuera de esta raíz ni cambios en otros proyectos;
- sin aceptación, consolidación, cierre o commit del resultado funcional hasta revisión humana.

## Acciones realizadas

Pendientes de ejecución.

## Cambios y ubicación

Pendientes de ejecución.

## Comprobaciones y evidencias

Pendientes de ejecución.

## Errores, bloqueos y pendientes

- Implementación pendiente.
- Aceptación humana pendiente.

## Rectificaciones

Ninguna.
