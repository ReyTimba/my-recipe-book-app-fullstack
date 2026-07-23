import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ConfirmDialog } from "../src/components/confirm-dialog";

describe("ConfirmDialog", () => {
  it("expone un diálogo modal accesible con dos decisiones explícitas", () => {
    const markup = renderToStaticMarkup(
      createElement(ConfirmDialog, {
        title: "Restaurar 3 recetas",
        description: "Reemplazará el contenido actual.",
        confirmLabel: "Restaurar copia",
        onConfirm: () => undefined,
        onCancel: () => undefined,
      }),
    );

    expect(markup).toContain('role="dialog"');
    expect(markup).toContain('aria-modal="true"');
    expect(markup).toContain("Restaurar 3 recetas");
    expect(markup).toContain("Cancelar");
    expect(markup).toContain("Restaurar copia");
  });

  it("permite señalar una acción destructiva", () => {
    const markup = renderToStaticMarkup(
      createElement(ConfirmDialog, {
        title: "Eliminar receta",
        description: "No se puede deshacer.",
        confirmLabel: "Sí, eliminar receta",
        tone: "danger",
        onConfirm: () => undefined,
        onCancel: () => undefined,
      }),
    );
    expect(markup).toContain('class="danger-button"');
  });
});
