export type CategoriaId =
  | "carne"
  | "pescado"
  | "arroz-pasta"
  | "salsa"
  | "guarnicion"
  | "masa-postre";

export interface Categoria {
  id: CategoriaId;
  nombre: string;
  icono: string;
}

export const CATEGORIAS: Categoria[] = [
  { id: "carne", nombre: "Carnes y Aves", icono: "🥩" },
  { id: "pescado", nombre: "Pescados y Mariscos", icono: "🐟" },
  { id: "arroz-pasta", nombre: "Arroces, Pastas y Guisos", icono: "🍝" },
  { id: "salsa", nombre: "Salsas, Fondos y Aderezos", icono: "🥣" },
  { id: "guarnicion", nombre: "Guarniciones y Verduras", icono: "🥗" },
  { id: "masa-postre", nombre: "Masas, Entrantes y Postres", icono: "🍰" },
];

export const CATEGORIA_POR_ID = Object.fromEntries(
  CATEGORIAS.map((c) => [c.id, c])
) as Record<CategoriaId, Categoria>;
