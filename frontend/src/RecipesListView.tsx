import type { formMode, RecipeType } from "./types/recipes";
import RecipesList from "./RecipesList";

type RecipesListViewProps = {
    recipes: RecipeType[]
    selectRecipe: (recipeId: string) => void
    openFormView: () => void
    deleteRecipe: (id: string) => void
    changeFormMode: (mode: formMode) => void
}

function RecipesListView(props: RecipesListViewProps) {

    return (
        <article className="view-card list-view">
            <header className="view-header">
                <div>
                    <p className="form-view-kicker">Recetas</p>
                    <h1>Biblioteca</h1>
                </div>
                <button type="button" className="primary-action" 
                onClick={() => {
                    props.openFormView();
                    props.changeFormMode("create");
                }
                    
                    }>
                    Nueva receta
                </button>
            </header>

            <section className="list-view-layout">
                <aside className="filters-panel">
                    <header>
                        <p>Filtros</p>
                        <h2>Explorar recetas</h2>
                    </header>

                    <div className="filter-field">
                        <label htmlFor="filter-search">Buscar</label>
                        <input id="filter-search" type="search" placeholder="Titulo o ingrediente" />
                    </div>

                    <div className="filter-grid">
                        <button type="button">Todas</button>
                        <button type="button">Favoritas</button>
                    </div>
                </aside>

                <RecipesList 
                recipes={props.recipes} 
                selectRecipe={props.selectRecipe} 
                deleteRecipe={props.deleteRecipe} 
                openFormView={props.openFormView}
                changeFormMode={props.changeFormMode}/>
            </section>
        </article>
    )
}
export default RecipesListView;
