import { useState } from "react";


type RecipeFormProps = {
    addRecipe: (title: string) => void
}

function RecipeForm(props: RecipeFormProps) {
    
    const [input, setInput] = useState<string>("");

    return (
        <form className="recipe-form">
            <input className="recipe-input" type="text" placeholder="titulo de receta" 
            value={input}
            onChange={(e) => {
                setInput(e.target.value)
            }}/>
            <button className="recipe-button"
            onClick={(e) => {
                e.preventDefault();
                props.addRecipe(input)
            }}>agregar_receta</button>
        </form>
    )
}
export default RecipeForm;
