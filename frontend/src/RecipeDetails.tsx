import type { RecipeType } from "./App";


type RecipeDetails = {
    selRecipe: RecipeType | null
    openListView: () => void
    openFormView: () => void
}

function RecipeDetails(props: RecipeDetails) {
    
    return (
        <article className="recipe-details recipe-detail-view">
            <header className="recipe-details-header">
                <div>
                    <p className="form-view-kicker">Detalle</p>
                    <h1>{props.selRecipe?.title || "Selecciona una receta"}</h1>
                </div>
                <div className="view-actions">
                    <button type="button" onClick={props.openListView}>Volver</button>
                    <button type="button" onClick={props.openFormView}>Editar</button>
                </div>
            </header>

            <section className="recipe-section">
                <h2>Descripcion</h2>
                <p>Texto breve de la receta.</p>
            </section>

            <section className="recipe-section">
                <h2>Ingredientes</h2>
                <ul>
                    <li>Ingrediente 1</li>
                    <li>Ingrediente 2</li>
                    <li>Ingrediente 3</li>
                </ul>
            </section>

            <section className="recipe-section">
                <h2>Preparacion</h2>
                <ol>
                    <li>Paso 1 de preparacion.</li>
                    <li>Paso 2 de preparacion.</li>
                    <li>Paso 3 de preparacion.</li>
                </ol>
            </section>
        </article>
    )
}
export default RecipeDetails;
