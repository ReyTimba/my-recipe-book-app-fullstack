import { useEffect, useMemo, useRef, useState } from "react";
import { AlphabetStrip } from "./components/AlphabetStrip";
import { CategoryTabs } from "./components/CategoryTabs";
import { ConfirmDialog } from "./components/confirm-dialog";
import { RecipeCard } from "./components/recipe-card";
import { RecipeDetail } from "./components/recipe-detail";
import { RecipeForm } from "./components/recipe-form";
import { TopBar } from "./components/TopBar";
import {
  saveRecipeDraft,
  type Recipe,
  type RecipeDraft,
} from "./domain/recipe";
import { obtenerRecetasCargadas } from "./domain/recetas-cargadas";
import { filterRecipes } from "./domain/search";
import { type CategoriaId } from "./domain/categorias";
import { loadSettings, saveSettings, type AppSettings } from "./domain/settings";
import { SettingsPanel } from "./components/SettingsPanel";
import {
  exportRecipeBackup,
  importRecipeBackup,
  loadRecipes as loadFromStorage,
  saveRecipes as saveToStorage,
} from "./storage/recipe-storage";
import { fetchRecipes, createRecipe, updateRecipe, deleteRecipe as deleteRecipeApi } from "./storage/api-client";

type View =
  | { kind: "list" }
  | { kind: "detail"; recipeId: string }
  | { kind: "form"; recipeId: string | null };

function createId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `receta-${Date.now()}-${Math.random()}`;
}

export default function App() {
  const [view, setView] = useState<View>({ kind: "list" });
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");
  const [notice, setNotice] = useState("");
  const [deleteCandidate, setDeleteCandidate] = useState<Recipe | null>(null);
  const [importCandidate, setImportCandidate] = useState<Recipe[] | null>(null);
  const [categoria, setCategoria] = useState<CategoriaId | null>(null);
  const [letterFilter, setLetterFilter] = useState("");
  const [popupActivo, setPopupActivo] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [apiOk, setApiOk] = useState<boolean | null>(null);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;
    const local = loadFromStorage(window.localStorage);
    if (local) {
      setRecipes(local);
      setLoading(false);
    }
    (async () => {
      try {
        const apiRecipes = await fetchRecipes();
        setApiOk(true);
        if (apiRecipes.length > 0) {
          setRecipes(apiRecipes);
        } else if (local && local.length > 0) {
          for (const r of local) {
            const { schemaVersion: _, id: _id, createdAt: _ca, updatedAt: _ua, ...payload } = r;
            try { await createRecipe(payload as Recipe); } catch {}
          }
          setRecipes(await fetchRecipes());
          setNotice("Recetas locales subidas al servidor.");
        }
      } catch {
        setApiOk(false);
        if (!local) {
          setRecipes(obtenerRecetasCargadas());
          setWarning("Servidor no disponible. Mostrando recetas de ejemplo.");
        }
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveToStorage(window.localStorage, recipes);
    }
  }, [recipes, loading]);

  const filteredByCategory = useMemo(() => {
    if (!categoria) return recipes;
    const catTag = CATEGORIA_TAG[categoria];
    return recipes.filter((r) => r.tags.includes(catTag));
  }, [recipes, categoria]);

  const visibleRecipes = useMemo(
    () => filterRecipes(filteredByCategory, { query, favoritesOnly, tag: "" }),
    [filteredByCategory, query, favoritesOnly],
  );

  const alphabetFiltered = useMemo(() => {
    if (!letterFilter) return visibleRecipes;
    return visibleRecipes.filter((r) =>
      r.name.toUpperCase().startsWith(letterFilter.toUpperCase()),
    );
  }, [visibleRecipes, letterFilter]);

  const selectedRecipe =
    view.kind === "detail" || (view.kind === "form" && view.recipeId)
      ? recipes.find((recipe) => recipe.id === view.recipeId) ?? null
      : null;

  function updateLocal(updated: Recipe[], message: string) {
    setRecipes(updated);
    setNotice(message);
  }

  async function saveDraft(draft: RecipeDraft) {
    const previous = view.kind === "form" && view.recipeId ? selectedRecipe ?? undefined : undefined;
    const id = previous?.id ?? createId();
    const recipe = saveRecipeDraft(draft, {
      id,
      now: new Date().toISOString(),
      previous,
    });
    try {
      if (previous) {
        await updateRecipe(id, recipe);
      } else {
        await createRecipe(recipe);
      }
      setApiOk(true);
    } catch {
      setApiOk(false);
      setNotice("No se pudo guardar en el servidor. Datos guardados localmente.");
    }
    const updated = previous
      ? recipes.map((item) => item.id === recipe.id ? recipe : item)
      : [recipe, ...recipes];
    updateLocal(updated, previous ? "Receta actualizada." : "Receta creada.");
    setView({ kind: "detail", recipeId: recipe.id });
  }

  async function toggleFavorite(recipeId: string) {
    const now = new Date().toISOString();
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) return;
    const updated = { ...recipe, favorite: !recipe.favorite, updatedAt: now };
    try {
      await updateRecipe(recipeId, updated);
      setApiOk(true);
    } catch {
      setApiOk(false);
      setNotice("No se pudo actualizar en el servidor.");
    }
    updateLocal(
      recipes.map((r) => r.id === recipeId ? updated : r),
      "Favoritos actualizados.",
    );
  }

  async function deleteRecipe(recipe: Recipe) {
    if (recipes.some((item) => item.id !== recipe.id && item.references.some((ref) => ref.targetRecipeId === recipe.id))) {
      setDeleteCandidate(null);
      setNotice("No se puede eliminar: otra receta la usa como preparación relacionada.");
      return;
    }
    try {
      await deleteRecipeApi(recipe.id);
      setApiOk(true);
    } catch {
      setApiOk(false);
      setNotice("No se pudo eliminar en el servidor. Datos actualizados localmente.");
    }
    updateLocal(recipes.filter((item) => item.id !== recipe.id), "Receta eliminada.");
    setDeleteCandidate(null);
    setView({ kind: "list" });
  }

  function exportBackup() {
    const content = exportRecipeBackup(recipes, new Date().toISOString());
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
      const imported = importRecipeBackup(await file.text());
      setImportCandidate(imported);
      setNotice("Copia validada. Confirma si quieres restaurarla.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "No se pudo importar la copia.");
    }
  }

  async function confirmImport() {
    if (!importCandidate) return;
    let anyOk = false;
    for (const recipe of importCandidate) {
      try {
        await createRecipe(recipe);
        anyOk = true;
      } catch {
        setNotice("Error al restaurar algunas recetas en el servidor.");
      }
    }
    setApiOk(anyOk);
    updateLocal(importCandidate, `Copia restaurada: ${importCandidate.length} recetas.`);
    setImportCandidate(null);
    setView({ kind: "list" });
    setQuery("");
    setFavoritesOnly(false);
  }

  if (loading) {
    return (
      <main className="app-shell">
        <div className="empty-state">
          <h3>Cargando recetario...</h3>
        </div>
      </main>
    );
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
    <main className="app-shell app-shell--list">
      <TopBar query={query} onQueryChange={setQuery} searchActive={searchActive} onSearchClose={() => setSearchActive(false)} onSettings={() => setSettingsOpen(true)} onAddRecipe={() => setView({ kind: "form", recipeId: null })} onExport={exportBackup} onImport={importBackup} apiOk={apiOk} />
      <div className="app-content">
      <CategoryTabs activa={categoria} onSelect={(id) => { setCategoria(id); setLetterFilter(""); }} />
      <div className={`recipe-area${popupActivo ? " recipe-area--blur" : ""}`}>


      {alphabetFiltered.length > 0 ? (
        <div className="boceto-grid">
          {alphabetFiltered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onOpen={() => { setSearchActive(false); setQuery(""); setView({ kind: "detail", recipeId: recipe.id }); }}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>{query || categoria || letterFilter ? "Sin resultados" : "Tu recetario está vacío"}</h3>
          <p>{query || categoria || letterFilter ? "Prueba con otros filtros." : "Crea la primera receta o importa una copia de seguridad."}</p>
        </div>
      )}

      {warning && <div className="warning-banner" role="alert">{warning}</div>}
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
      {settingsOpen && (
        <SettingsPanel
          anchorDelay={settings.anchorDelay}
          unanchorDelay={settings.unanchorDelay}
          onSave={(a, u) => {
            const next = { ...settings, anchorDelay: a, unanchorDelay: u };
            setSettings(next);
            saveSettings(next);
            setSettingsOpen(false);
          }}
          onClose={() => setSettingsOpen(false)}
        />
      )}
      </div>
      <AlphabetStrip recipes={recipes} activeLetter={letterFilter} onLetterSelect={(letter) => { setLetterFilter(letter); setCategoria(null); }} onPopupChange={setPopupActivo} onRecipeSelect={(id) => { setSearchActive(false); setQuery(""); setView({ kind: "detail", recipeId: id }); }} onSearchClick={() => { setSearchActive((a) => !a); setLetterFilter(""); }} anchorDelay={settings.anchorDelay} unanchorDelay={settings.unanchorDelay} />
      </div>
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
