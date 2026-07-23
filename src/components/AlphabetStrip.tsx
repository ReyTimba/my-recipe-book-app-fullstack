import { useCallback, useMemo, useRef, useState } from "react";
import type { Recipe } from "../domain/recipe";

interface PopupItem {
  letter: string;
  items: Array<{ id: string; name: string }>;
}

interface AlphabetStripProps {
  recipes: Recipe[];
  activeLetter: string;
  onLetterSelect: (letter: string) => void;
  onPopupChange?: (active: boolean) => void;
  onRecipeSelect?: (recipeId: string) => void;
}

const ALL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function AlphabetStrip({ recipes, activeLetter, onLetterSelect, onPopupChange, onRecipeSelect }: AlphabetStripProps) {
  const [popup, setPopup] = useState<PopupItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const movedRef = useRef(false);
  const activeOnDownRef = useRef("");

  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    let hasÑ = false;
    for (const r of recipes) {
      const first = r.name.charAt(0).toUpperCase();
      if (first === "Ñ") hasÑ = true;
      else if (ALL_LETTERS.includes(first)) set.add(first);
    }
    const letters = ALL_LETTERS.filter((l) => set.has(l));
    if (hasÑ) letters.push("Ñ");
    return letters;
  }, [recipes]);

  const letterAt = useCallback((clientX: number, clientY: number): string | null => {
    let el = document.elementFromPoint(clientX, clientY);
    while (el && el !== document.body) {
      if (el instanceof HTMLElement && el.classList.contains("alpha-btn")) return el.textContent;
      el = el.parentElement;
    }
    return null;
  }, []);

  function recipeIdAt(clientX: number, clientY: number): string | null {
    let el = document.elementFromPoint(clientX, clientY);
    while (el && el !== document.body) {
      if (el instanceof HTMLElement && el.dataset.recipeId) return el.dataset.recipeId;
      el = el.parentElement;
    }
    return null;
  }

  function select(letter: string | null) {
    onLetterSelect(letter ?? "");
    if (!letter) { setPopup(null); setHoveredId(null); onPopupChange?.(false); return; }
    const items = recipes
      .filter((r) => r.name.toUpperCase().startsWith(letter.toUpperCase()))
      .map((r) => ({ id: r.id, name: r.name }));
    setPopup({ letter, items });
    setHoveredId(null);
    onPopupChange?.(true);
  }

  function handlePointerDown(e: React.PointerEvent) {
    const strip = stripRef.current;
    if (strip) strip.setPointerCapture(e.pointerId);
    movedRef.current = false;
    activeOnDownRef.current = activeLetter;
    const letter = letterAt(e.clientX, e.clientY);
    if (letter) select(letter);
  }

  function handlePointerMove(e: React.PointerEvent) {
    const recipeId = recipeIdAt(e.clientX, e.clientY);
    if (recipeId) { setHoveredId(recipeId); movedRef.current = true; return; }
    setHoveredId(null);
    const letter = letterAt(e.clientX, e.clientY);
    if (!letter) return;
    movedRef.current = true;
    if (letter !== (popup?.letter ?? activeLetter)) select(letter);
  }

  function handlePointerUp(e: React.PointerEvent) {
    const recipeId = recipeIdAt(e.clientX, e.clientY);
    if (recipeId && onRecipeSelect) {
      onRecipeSelect(recipeId);
    }
    setPopup(null);
    setHoveredId(null);
    onPopupChange?.(false);
  }

  function handleClick(e: React.MouseEvent) {
    if (movedRef.current) { movedRef.current = false; return; }
    const letter = letterAt(e.clientX, e.clientY);
    if (!letter) return;
    if (letter === activeOnDownRef.current && activeLetter === letter) {
      select(null);
    }
  }

  return (
    <div
      className="alphabet-strip"
      ref={stripRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
    >
      <div className="alpha-btns">
        {availableLetters.map((letter) => (
          <span
            key={letter}
            className="alpha-btn"
            data-active={activeLetter === letter ? "true" : undefined}
          >
            {letter}
          </span>
        ))}
      </div>
      {popup && (
        <div className="alpha-popup">
          <span className="alpha-popup-letter">{popup.letter}</span>
          <ul className="alpha-popup-list">
            {popup.items.map((item) => (
              <li
                key={item.id}
                className={`alpha-popup-item${hoveredId === item.id ? " alpha-popup-item--hover" : ""}`}
                data-recipe-id={item.id}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
