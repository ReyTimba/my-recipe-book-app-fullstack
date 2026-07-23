interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  tone?: "normal" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  tone = "normal",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="dialog-backdrop" role="presentation">
      <section
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-description"
      >
        <p className="eyebrow">Confirma antes de continuar</p>
        <h2 id="confirm-title">{title}</h2>
        <p id="confirm-description">{description}</p>
        <div className="dialog-actions">
          <button className="secondary-button" type="button" onClick={onCancel} autoFocus>
            Cancelar
          </button>
          <button
            className={tone === "danger" ? "danger-button" : undefined}
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
