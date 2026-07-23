import { type ChangeEvent, useRef } from "react";

interface BackupActionsProps {
  recipeCount: number;
  onExport: () => void;
  onImport: (file: File) => void;
}

export function BackupActions({ recipeCount, onExport, onImport }: BackupActionsProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function selectedFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onImport(file);
    event.target.value = "";
  }

  return (
    <details className="backup-menu">
      <summary>Respaldo</summary>
      <div className="backup-popover">
        <strong>Protege tus recetas</strong>
        <p>Descarga una copia o restaura un archivo anterior.</p>
        <button className="secondary-button" type="button" onClick={onExport} disabled={recipeCount === 0}>
          Exportar JSON
        </button>
        <button className="secondary-button" type="button" onClick={() => inputRef.current?.click()}>
          Importar JSON
        </button>
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept="application/json,.json"
          onChange={selectedFile}
          tabIndex={-1}
        />
      </div>
    </details>
  );
}
