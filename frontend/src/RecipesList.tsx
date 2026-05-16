import type {RecipeType} from "./App";

type RecipesListProps = {
    recipes: RecipeType[]
    selectRecipe: (recipeId: string) => void;
    deleteRecipe: (id: string) => void;
}

function RecipesList(props: RecipesListProps) {


    return(
        <div className="recipes-list">
            <header><h2>Lista de recetas</h2></header>
            <ul className="recipes-list-items">
                {props.recipes.map(({id, title}) => {
                    return <li key={id} className="recipe-list-item"
                    onClick={() => {
                        props.selectRecipe(id);
                        console.log(title);
                    }}>
                        <span className="recipe-list-title">{title}</span>
                        <span className="recipe-list-actions" aria-hidden="true">
                            <span>Fav</span>
                            <span>Edit</span>
                            <span
                            onClick={(e) => {
                                e.stopPropagation()
                                props.deleteRecipe(id)
                            }}>Del</span>
                        </span>
                    </li>
                })}
            </ul>
        </div>
    )
    
}
export default RecipesList;
