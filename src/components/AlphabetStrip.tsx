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
  onSearchClick?: () => void;
  anchorDelay?: number;
  unanchorDelay?: number;
}

const ALL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const SCROLL_EDGE = 50;
const SCROLL_SPEED = 10;

export function AlphabetStrip({ recipes, activeLetter, onLetterSelect, onPopupChange, onRecipeSelect, onSearchClick, anchorDelay = 2000, unanchorDelay }: AlphabetStripProps) {
  const [popup, setPopup] = useState<PopupItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [anchoredLetter, setAnchoredLetter] = useState<string | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const movedRef = useRef(false);
  const activeOnDownRef = useRef("");
  const scrollRaf = useRef(0);
  const lastY = useRef(0);
  const lastLetterRef = useRef<string | null>(null);
  const lastChangeRef = useRef(0);
  const anchorTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pendingAnchorRef = useRef<string | null>(null);
  const leavingRef = useRef(false);

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

  function scrollTick() {
    const list = listRef.current;
    if (!list) { scrollRaf.current = 0; return; }
    const rect = list.getBoundingClientRect();
    const y = lastY.current;
    let dy = 0;
    if (y < rect.top + SCROLL_EDGE) {
      dy = -SCROLL_SPEED * (1 - (y - rect.top) / SCROLL_EDGE);
    } else if (y > rect.bottom - SCROLL_EDGE) {
      dy = SCROLL_SPEED * (1 - (rect.bottom - y) / SCROLL_EDGE);
    }
    if (dy !== 0) {
      list.scrollTop = Math.max(0, Math.min(list.scrollTop + dy, list.scrollHeight - list.clientHeight));
      scrollRaf.current = requestAnimationFrame(scrollTick);
    } else {
      scrollRaf.current = 0;
    }
  }

  function startScroll() {
    if (!scrollRaf.current) scrollRaf.current = requestAnimationFrame(scrollTick);
  }

  function stopScroll() {
    if (scrollRaf.current) { cancelAnimationFrame(scrollRaf.current); scrollRaf.current = 0; }
  }

  function clearAnchorTimer() {
    if (anchorTimerRef.current) { clearTimeout(anchorTimerRef.current); anchorTimerRef.current = undefined; }
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
    lastLetterRef.current = letter;
    lastChangeRef.current = Date.now();
  }

  function handlePointerMove(e: React.PointerEvent) {
    lastY.current = e.clientY;
    const recipeId = recipeIdAt(e.clientX, e.clientY);
    if (recipeId) { setHoveredId(recipeId); movedRef.current = true; } else { setHoveredId(null); }
    const rect = listRef.current?.getBoundingClientRect();
    if (rect && (e.clientY < rect.top + SCROLL_EDGE || e.clientY > rect.bottom - SCROLL_EDGE)) {
      startScroll();
    } else {
      stopScroll();
    }
    const letter = letterAt(e.clientX, e.clientY);
    if (!letter) return;
    movedRef.current = true;

    if (anchoredLetter) {
      if (letter !== anchoredLetter) {
        if (!leavingRef.current) {
          leavingRef.current = true;
          clearAnchorTimer();
          const delay = unanchorDelay ?? anchorDelay;
          anchorTimerRef.current = setTimeout(() => {
            setAnchoredLetter(null);
            leavingRef.current = false;
            pendingAnchorRef.current = null;
          }, delay);
        }
      } else {
        leavingRef.current = false;
        clearAnchorTimer();
      }
    } else {
      if (letter !== lastLetterRef.current) {
        lastLetterRef.current = letter;
        lastChangeRef.current = Date.now();
        clearAnchorTimer();
        anchorTimerRef.current = setTimeout(() => {
          if (lastLetterRef.current === letter && Date.now() - lastChangeRef.current >= anchorDelay) {
            setAnchoredLetter(letter);
          }
        }, anchorDelay);
      }
      if (letter !== (popup?.letter ?? activeLetter)) select(letter);
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    stopScroll();
    clearAnchorTimer();
    const recipeId = recipeIdAt(e.clientX, e.clientY);
    if (recipeId && onRecipeSelect) {
      onRecipeSelect(recipeId);
    }
    setAnchoredLetter(null);
    leavingRef.current = false;
    pendingAnchorRef.current = null;
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
      setAnchoredLetter(null);
      leavingRef.current = false;
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
      <button
        className="alpha-btn alpha-btn-search"
        type="button"
        onClick={(e) => { e.stopPropagation(); onSearchClick?.(); }}
        title="Buscar"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" />
        </svg>
      </button>
      <div className="alpha-btns">
        {availableLetters.map((letter) => (
          <span
            key={letter}
            className="alpha-btn"
            data-active={activeLetter === letter ? "true" : undefined}
            data-anchored={anchoredLetter === letter ? "true" : undefined}
          >
            {letter}
          </span>
        ))}
      </div>
      {popup && (
        <div className="alpha-popup">
          <span className="alpha-popup-letter">{popup.letter}</span>
          <ul className="alpha-popup-list" ref={listRef}>
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
