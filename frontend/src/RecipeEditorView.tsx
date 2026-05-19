import { useEffect, useState } from "react";
import type { RecipeFormType } from "./types/recipes";
import type { formMode, RecipeType } from "./types/recipes";

type RecipeEditorViewProps = {
    openListView: () => void
    addRecipe: (recipe: RecipeFormType) => void
    selRecipe: RecipeType | null
    formMode: formMode
}



function RecipeEditorView(props: RecipeEditorViewProps) {

    const [formData, setFormData] = useState<RecipeFormType>({
        id: "",
        title: "",
        category: "",
        description: "",
        ingredients: [],
        steps: []
    })

    const [ingredient, setIngredient] = useState({
        id: "",
        name: "",
        qty: 0,
        unit: ""
    })

    useEffect(() => {
        function setRecipeInForm() {
            if (!props.selRecipe) return;
            setFormData({
                id: props.selRecipe.id,
                title: props.selRecipe.title,
                category: props.selRecipe.category,
                description: props.selRecipe.description,
                ingredients: [],
                steps: []
            })
        }
        if (props.formMode === "edit") {
            setRecipeInForm();
        }
    }, [props.selRecipe, props.formMode])


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
                    <input type="text" placeholder="Ingrediente" className="input-ingredient"
                        value={ingredient.name}
                        onChange={(e) => {
                            setIngredient({
                                ...ingredient,
                                name: e.target.value
                            })
                        }} />
                    <input type="number" placeholder="Cantidad" className="input-qty"
                        value={ingredient.qty}
                        onChange={(e) => {
                            setIngredient({
                                ...ingredient,
                                qty: Number(e.target.value)
                            })
                        }} />
                    <select name="" id="" className="input-unit"
                        value={ingredient.unit}
                        onChange={(e) => {
                            setIngredient({
                                ...ingredient,
                                unit: e.target.value
                            })
                        }}>
                        <option value="" hidden>unidades</option>
                        <option value="ud">unidad</option>
                        <option value="g">gramo</option>
                        <option value="ml">mililitro</option>
                        <option value="cda">cucharada</option>
                        <option value="cdta">cucharadita</option>
                        <option value="kg">kilogramo</option>
                        <option value="l">litro</option>
                        <option value="oz">onza</option>
                        <option value="paq">paquete</option>
                    </select>
                    <button type="button"
                        onClick={() => {
                            const ingrediientToAdd = {
                                ...ingredient,
                                id: crypto.randomUUID()
                            }
                            setFormData({
                                ...formData,
                                ingredients: [
                                    ...formData.ingredients,
                                    ingrediientToAdd
                                ]
                            })
                            setIngredient({
                                id: "",
                                name: "",
                                qty: 0,
                                unit: "ud"
                            })
                        }}>Agregar</button>
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
