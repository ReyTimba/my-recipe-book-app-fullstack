export type RecipeFormType = {
    title: string,
    category: string,
    description: string,
    ingredients: {
        name: string,
        qty: number,
        unit: string,
    }[]
    step: string[]
} 