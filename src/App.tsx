import { useEffect, useMemo, useState } from "react";
import { AlphabetStrip } from "./components/AlphabetStrip";
import { CategoryTabs } from "./components/CategoryTabs";
import { ConfirmDialog } from "./components/confirm-dialog";
import { RecipeCard } from "./components/recipe-card";
import { RecipeDetail } from "./components/recipe-detail";
import { RecipeForm } from "./components/recipe-form";
import { TopBar } from "./components/TopBar";
import {
  exampleRecipes,
  parseRecipeCollection,
  saveRecipeDraft,
  type Recipe,
  type RecipeDraft,
} from "./domain/recipe";
import { obtenerRecetasCargadas } from "./domain/recetas-cargadas";
import { availableTags, filterRecipes } from "./domain/search";
import { type CategoriaId } from "./domain/categorias";
import {
  exportRecipeBackup,
  importRecipeBackup,
  loadRecipes,
  saveRecipes,
} from "./storage/recipe-storage";

type View =
  | { kind: "list" }
  | { kind: "detail"; recipeId: string }
  | { kind: "form"; recipeId: string | null };

interface InitialState {
  recipes: Recipe[];
  persistenceBlocked: boolean;
  warning: string;
}

function createId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `receta-${Date.now()}-${Math.random()}`;
}

function initialState(): InitialState {
  try {
    const stored = loadRecipes(window.localStorage);
    return {
      recipes: stored ?? obtenerRecetasCargadas(),
      persistenceBlocked: false,
      warning: "",
    };
  } catch {
    return {
      recipes: [],
      persistenceBlocked: true,
      warning: "Los datos guardados no se pudieron leer. No se han reemplazado: importa una copia válida para recuperar el recetario.",
    };
  }
}

export default function App() {
  const [data, setData] = useState<InitialState>(initialState);
  const [view, setView] = useState<View>({ kind: "list" });
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [tag, setTag] = useState("");
  const [notice, setNotice] = useState("");
  const [deleteCandidate, setDeleteCandidate] = useState<Recipe | null>(null);
  const [importCandidate, setImportCandidate] = useState<Recipe[] | null>(null);
  const [categoria, setCategoria] = useState<CategoriaId | null>(null);
  const [letterFilter, setLetterFilter] = useState("");

  useEffect(() => {
    if (!data.persistenceBlocked) {
      saveRecipes(window.localStorage, data.recipes);
    }
  }, [data]);

  const tags = useMemo(() => availableTags(data.recipes), [data.recipes]);

  const filteredByCategory = useMemo(() => {
    if (!categoria) return data.recipes;
    const catTag = CATEGORIA_TAG[categoria];
    return data.recipes.filter((r) => r.tags.includes(catTag));
  }, [data.recipes, categoria]);

  const visibleRecipes = useMemo(
    () => filterRecipes(filteredByCategory, { query, favoritesOnly, tag }),
    [filteredByCategory, query, favoritesOnly, tag],
  );

  const alphabetFiltered = useMemo(() => {
    if (!letterFilter) return visibleRecipes;
    return visibleRecipes.filter((r) =>
      r.name.toUpperCase().startsWith(letterFilter.toUpperCase()),
    );
  }, [visibleRecipes, letterFilter]);

  const selectedRecipe =
    view.kind === "detail" || (view.kind === "form" && view.recipeId)
      ? data.recipes.find((recipe) => recipe.id === view.recipeId) ?? null
      : null;

  function updateRecipes(recipes: Recipe[], message: string) {
    setData({ recipes: parseRecipeCollection(recipes), persistenceBlocked: false, warning: "" });
    setNotice(message);
  }

  function saveDraft(draft: RecipeDraft) {
    const previous = view.kind === "form" && view.recipeId ? selectedRecipe ?? undefined : undefined;
    const id = previous?.id ?? createId();
    const recipe = saveRecipeDraft(draft, {
      id,
      now: new Date().toISOString(),
      previous,
    });
    const recipes = previous
      ? data.recipes.map((item) => item.id === recipe.id ? recipe : item)
      : [recipe, ...data.recipes];
    updateRecipes(recipes, previous ? "Receta actualizada." : "Receta creada.");
    setView({ kind: "detail", recipeId: recipe.id });
  }

  function toggleFavorite(recipeId: string) {
    const now = new Date().toISOString();
    const recipes = data.recipes.map((recipe) =>
      recipe.id === recipeId
        ? { ...recipe, favorite: !recipe.favorite, updatedAt: now }
        : recipe,
    );
    updateRecipes(recipes, "Favoritos actualizados.");
  }

  function deleteRecipe(recipe: Recipe) {
    if (data.recipes.some((item) => item.id !== recipe.id && item.references.some((ref) => ref.targetRecipeId === recipe.id))) {
      setDeleteCandidate(null);
      setNotice("No se puede eliminar: otra receta la usa como preparación relacionada.");
      return;
    }
    updateRecipes(data.recipes.filter((item) => item.id !== recipe.id), "Receta eliminada.");
    setDeleteCandidate(null);
    setView({ kind: "list" });
  }

  function exportBackup() {
    const content = exportRecipeBackup(data.recipes, new Date().toISOString());
    const url = URL.createObjectURL(new Blob([content], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `recetario-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    setNotice("Copia de seguridad descargada.");
  }

  async function importBackup(file: File) {
    try {
      const recipes = importRecipeBackup(await file.text());
      setImportCandidate(recipes);
      setNotice("Copia validada. Confirma si quieres restaurarla.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "No se pudo importar la copia.");
    }
  }

  function confirmImport() {
    if (!importCandidate) return;
    updateRecipes(importCandidate, `Copia restaurada: ${importCandidate.length} recetas.`);
    setImportCandidate(null);
    setView({ kind: "list" });
    setQuery("");
    setFavoritesOnly(false);
    setTag("");
  }

  if (view.kind === "form") {
    return (
      <main className="app-shell">
        <RecipeForm
          key={view.recipeId ?? "new"}
          recipe={selectedRecipe}
          onSave={saveDraft}
          onCancel={() => setView(selectedRecipe ? { kind: "detail", recipeId: selectedRecipe.id } : { kind: "list" })}
        />
      </main>
    );
  }

  if (view.kind === "detail" && selectedRecipe) {
    return (
      <main className="app-shell">
        <RecipeDetail
          recipe={selectedRecipe}
          onBack={() => setView({ kind: "list" })}
          onEdit={() => setView({ kind: "form", recipeId: selectedRecipe.id })}
          onDelete={() => setDeleteCandidate(selectedRecipe)}
          onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
        />
        <p className="sr-only" aria-live="polite">{notice}</p>
        {deleteCandidate && (
          <ConfirmDialog
            title={`Eliminar «${deleteCandidate.name}»`}
            description="La receta desaparecerá de este dispositivo. Si necesitas conservarla, exporta antes una copia de seguridad."
            confirmLabel="Sí, eliminar receta"
            tone="danger"
            onConfirm={() => deleteRecipe(deleteCandidate)}
            onCancel={() => setDeleteCandidate(null)}
          />
        )}
      </main>
    );
  }

  return (
    <main className="app-shell">
      <TopBar query={query} onQueryChange={setQuery} />
      <CategoryTabs activa={categoria} onSelect={(id) => { setCategoria(id); setLetterFilter(""); }} />
      <AlphabetStrip recipes={data.recipes} activeLetter={letterFilter} onLetterSelect={setLetterFilter} />

      <div className="filters">
        <label className="favorite-check">
          <input type="checkbox" checked={favoritesOnly} onChange={(e) => setFavoritesOnly(e.target.checked)} />
          <span>Solo favoritas</span>
        </label>
        {tags.length > 0 && (
          <select value={tag} onChange={(e) => setTag(e.target.value)} aria-label="Filtrar por etiqueta">
            <option value="">Todas las etiquetas</option>
            {tags.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        )}
      </div>

      {alphabetFiltered.length > 0 ? (
        <div className="boceto-grid">
          {alphabetFiltered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onOpen={() => setView({ kind: "detail", recipeId: recipe.id })}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>{query || categoria || letterFilter ? "Sin resultados" : "Tu recetario está vacío"}</h3>
          <p>{query || categoria || letterFilter ? "Prueba con otros filtros." : "Crea la primera receta o importa una copia de seguridad."}</p>
        </div>
      )}

      {data.warning && <div className="warning-banner" role="alert">{data.warning}</div>}
      <p className="sr-only" aria-live="polite">{notice}</p>

      {importCandidate && (
        <ConfirmDialog
          title={`Restaurar ${importCandidate.length} recetas`}
          description="La copia es válida. Si continúas, reemplazará por completo las recetas guardadas actualmente en este dispositivo."
          confirmLabel="Restaurar copia"
          onConfirm={confirmImport}
          onCancel={() => setImportCandidate(null)}
        />
      )}
    </main>
  );
}

const CATEGORIA_TAG: Record<CategoriaId, string> = {
  "carne": "Carne",
  "pescado": "Pescado",
  "arroz-pasta": "Arroz-Pasta",
  "salsa": "Salsa",
  "guarnicion": "Guarnición",
  "masa-postre": "Masa",
};
