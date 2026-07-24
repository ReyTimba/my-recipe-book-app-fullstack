import { useState } from "react";

interface SettingsPanelProps {
  anchorDelay: number;
  unanchorDelay: number;
  onSave: (anchorDelay: number, unanchorDelay: number) => void;
  onClose: () => void;
}

export function SettingsPanel({ anchorDelay, unanchorDelay, onSave, onClose }: SettingsPanelProps) {
  const [anchor, setAnchor] = useState(String(anchorDelay));
  const [unanchor, setUnanchor] = useState(String(unanchorDelay));

  function handleSave() {
    const a = Number(anchor);
    const u = Number(unanchor);
    if (Number.isFinite(a) && a >= 200 && a <= 10000 &&
        Number.isFinite(u) && u >= 200 && u <= 10000) {
      onSave(a, u);
    }
  }

  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section
        className="settings-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="settings-title">Ajustes</h2>

        <label className="settings-field">
          <span>Tiempo de anclaje (ms)</span>
          <span className="settings-hint">
            Tiempo que debes mantener el dedo quieto sobre una letra para anclarla.
          </span>
          <input
            type="number"
            value={anchor}
            onChange={(e) => setAnchor(e.target.value)}
            min={200}
            max={10000}
            step={100}
          />
        </label>

        <label className="settings-field">
          <span>Tiempo de desanclaje (ms)</span>
          <span className="settings-hint">
            Tiempo que debes mantener el dedo sobre otra letra para cambiar el ancla.
          </span>
          <input
            type="number"
            value={unanchor}
            onChange={(e) => setUnanchor(e.target.value)}
            min={200}
            max={10000}
            step={100}
          />
        </label>

        <div className="dialog-actions">
          <button className="secondary-button" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </section>
    </div>
  );
}
