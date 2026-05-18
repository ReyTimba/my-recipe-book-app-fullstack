import { useState } from "react";
import type { RecipeFormType } from "./types/recipes";
 

type RecipeEditorViewProps = {
    openListView: () => void
    addRecipe: (recipe: RecipeFormType) => void
}

function RecipeEditorView(props: RecipeEditorViewProps) {

    const [formData, setFormData] = useState<RecipeFormType>({
        title: "",
        category: "",
        description: "",
        ingredients: [],
        step: []
    })

    return (
        <article className="recipe-details recipe-form-view">
            <header className="recipe-details-header form-view-header">
                <div>
                    <p className="form-view-kicker">Formulario</p>
                    <h1>Nueva receta</h1>
                </div>
                <div className="view-actions">
                    <button type="button" onClick={props.openListView}>Cancelar</button>
                    <button type="button"
                    onClick={() => {
                        props.addRecipe(formData)
                    }}>Guardar</button>
                </div>
            </header>

            <section className="form-card">
                <h2>Datos principales</h2>
                <div className="form-grid">
                    <label>
                        Titulo
                        <input type="text" placeholder="Nombre de la receta"
                            value={formData.title}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    title: e.target.value
                                })
                            }}
                        />
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
