# Recetario

Un recetario personal, local y adaptable a móvil, construido como el primer producto real gestionado con SOR.

## Qué permite hacer

- Consultar recetas con ingredientes, pasos, porciones y tiempos.
- Crear, editar, marcar como favorita y eliminar con confirmación.
- Buscar por nombre, descripción, ingrediente o etiqueta, sin depender de mayúsculas o acentos.
- Filtrar por favoritas y etiquetas.
- Conservar las recetas en el navegador mediante almacenamiento local versionado.
- Exportar todo el recetario a JSON e importar únicamente copias completas y válidas.
- Empezar con dos recetas de ejemplo que pueden editarse o eliminarse.

## Límites del MVP

No incluye cuentas, nube, sincronización, colaboración, imágenes, nutrición, lista de compras, planificación semanal ni generación con IA. Los datos pertenecen al navegador y al dispositivo actuales; usa `Respaldo → Exportar JSON` para conservar una copia.

## Tecnología

- React 19 y TypeScript 7.
- Vite 8 para desarrollo y compilación.
- Vitest para dominio, búsqueda, almacenamiento y componentes críticos.
- Sin backend ni llamadas de red durante el uso.

Las versiones directas están fijadas exactamente en `package.json` y el árbol resuelto queda registrado en `package-lock.json`.

## Ejecutar

```powershell
npm.cmd install
npm.cmd run dev
```

Vite mostrará la dirección local, normalmente `http://localhost:4173`.

## Comprobar

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
```

## Datos y copias de seguridad

El almacenamiento actual usa la clave versionada `recetario:datos:v2`. Si solo existe `recetario:datos:v1`, la aplicación migra sus recetas en memoria, conserva intacta la clave anterior y escribe v2 únicamente al guardar.

Una copia JSON contiene su aplicación, versión, fecha y todas las recetas. Las copias v1 siguen siendo importables; las nuevas exportaciones usan v2. El contrato, sus invariantes y los casos representados están descritos en [`docs/modelo-recetas-v2.md`](docs/modelo-recetas-v2.md).

La importación valida el archivo completo —incluidos identificadores, fechas, ingredientes y pasos— antes de ofrecer reemplazar el contenido actual. Un archivo inválido no modifica nada.

## Memoria SOR

La bóveda del proyecto está en `memoria/`. Para verla en Obsidian, abre exactamente esa carpeta. El ciclo funcional actual permanece pendiente de aceptación humana y no debe consolidarse hasta revisar el MVP.
