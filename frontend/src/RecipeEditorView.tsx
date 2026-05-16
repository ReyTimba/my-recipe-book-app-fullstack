type RecipeEditorViewProps = {
    openListView: () => void
}

function RecipeEditorView(props: RecipeEditorViewProps) {
    
    return (
        <article className="recipe-details recipe-form-view">
            <header className="recipe-details-header form-view-header">
                <div>
                    <p className="form-view-kicker">Formulario</p>
                    <h1>Nueva receta</h1>
                </div>
                <div className="view-actions">
                    <button type="button" onClick={props.openListView}>Cancelar</button>
                    <button type="button">Guardar</button>
                </div>
            </header>

            <section className="form-card">
                <h2>Datos principales</h2>
                <div className="form-grid">
                    <label>
                        Titulo
                        <input type="text" placeholder="Nombre de la receta" />
                    </label>

                    <label>
                        Categoria
                        <select defaultValue="">
                            <option value="" disabled>Selecciona una categoria</option>
                            <option>Desayuno</option>
                            <option>Comida</option>
                            <option>Cena</option>
                        </select>
                    </label>

                    <label className="form-field-wide">
                        Descripcion
                        <textarea placeholder="Resumen breve de la receta" rows={4}></textarea>
                    </label>
                </div>
            </section>

            <section className="form-card">
                <h2>Ingredientes</h2>
                <div className="ingredient-row">
                    <input type="text" placeholder="Ingrediente" />
                    <input type="text" placeholder="Cantidad" />
                    <button type="button">Agregar</button>
                </div>
            </section>

            <section className="form-card">
                <h2>Preparacion</h2>
                <textarea placeholder="Escribe los pasos de preparacion" rows={6}></textarea>
            </section>
        </article>
    )
}
export default RecipeEditorView;
