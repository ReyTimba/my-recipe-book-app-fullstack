import { useCallback, useMemo, useRef, useState } from "react";
import type { Recipe } from "../domain/recipe";

interface AlphabetStripProps {
  recipes: Recipe[];
  activeLetter: string;
  onLetterSelect: (letter: string) => void;
}

const ALL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function AlphabetStrip({ recipes, activeLetter, onLetterSelect }: AlphabetStripProps) {
  const [popup, setPopup] = useState<{ letter: string; items: string[] } | null>(null);
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

  function select(letter: string | null) {
    onLetterSelect(letter ?? "");
    if (!letter) { setPopup(null); return; }
    const items = recipes
      .filter((r) => r.name.toUpperCase().startsWith(letter.toUpperCase()))
      .map((r) => r.name);
    setPopup({ letter, items });
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
    const letter = letterAt(e.clientX, e.clientY);
    if (!letter) return;
    movedRef.current = true;
    if (letter !== (popup?.letter ?? activeLetter)) select(letter);
  }

  function handlePointerUp() {
    setPopup(null);
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
      {popup && (
        <div className="alpha-popup">
          <span className="alpha-popup-letter">{popup.letter}</span>
          <ul className="alpha-popup-list">
            {popup.items.slice(0, 5).map((name) => (
              <li key={name}>{name}</li>
            ))}
            {popup.items.length > 5 && (
              <li className="alpha-popup-more">+{popup.items.length - 5}</li>
            )}
          </ul>
        </div>
      )}
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
    </div>
  );
}
