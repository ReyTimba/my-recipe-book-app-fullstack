import { useState, useEffect } from "react";
import RecipesListView from "./RecipesListView";
import RecipeDetails from "./RecipeDetails";
import RecipeEditorView from "./RecipeEditorView";
import type { RecipeFormType } from "./types/recipes";

export type RecipeType = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
};

type ViewType = "list" | "details" | "form";

function App() {

  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [selRecipe, setSelRecipe] = useState<RecipeType | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>("list");

  useEffect(() => {
    async function getRecipes() {
      const resRecipes = await fetch("http://localhost:3000/api/recipes");
      if (!resRecipes) return;
      const dataRecipes = await resRecipes.json();
      setRecipes(dataRecipes)
    };
    getRecipes();
  }, [])

  async function addRecipe(recipe: RecipeFormType ) {
    if (!recipe.title) return;
    const resRecipe = await fetch("http://localhost:3000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        title: recipe.title,
        igredients: [],
        steps: []
        
       })
    });

    const dataRecipe = await resRecipe.json();

    if (!dataRecipe) return;

    setRecipes([
      ...recipes, dataRecipe 
    ])
  };
  void addRecipe;





  async function deleteRecipe(id: string) {
    const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) return;

      const updateRecipes = recipes.filter(recipe => recipe.id !== id);

    setRecipes(updateRecipes);    
  }
 







  //set_views
  function selectRecipe(recipeId: string) {
    const selectedRecipe = recipes.find(({id}) => id === recipeId)
    if (!selectedRecipe) return;
    setSelRecipe(selectedRecipe)
    setCurrentView("details")
  }

  function openFormView() {
    setCurrentView("form")
  }

  function openListView() {
    setCurrentView("list")
  }


//render
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="app-kicker">My Recipe Book</p>
        <h1>Recetario personal</h1>
      </header>

      <section className="app-view-frame">
        {currentView === "list" && (
          <RecipesListView
            recipes={recipes}
            selectRecipe={selectRecipe}
            openFormView={openFormView}
            deleteRecipe={deleteRecipe}
          />
        )}

        {currentView === "details" && (
          <RecipeDetails
            selRecipe={selRecipe}
            openListView={openListView}
            openFormView={openFormView}
          />
        )}

        {currentView === "form" && (
          <RecipeEditorView 
          openListView={openListView}
          addRecipe={addRecipe}/>
        )}
      </section>
    </main>
  );
}

export default App;
