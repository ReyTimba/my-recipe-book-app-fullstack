export type RecipeType = {
  id: string
  title: string
  category: string
  description: string
  ingredients: {
    id: string
    name: string
    qty: number
    unit: string
  }[]
  steps: string[]
};

export type formMode = "create" | "edit" | null;


export type RecipeFormType = {
    id: string
    title: string,
    category: string,
    description: string,
    ingredients: {
        id: string
        name: string,
        qty: number,
        unit: string,
    }[]
    steps: string[]
} 