"use client";

import { useState, useTransition } from "react";
import { SpinnerGapIcon, TrashIcon } from "@phosphor-icons/react";
import { deleteMaterial } from "@/app/actions/materials";

type Props = {
  materialId: number;
  title: string;
  fileUrl: string;
  courseCode: string;
};

/**
 * Boton de icono, no de formulario: no hay `FormData` que enviar, asi que
 * `useTransition` alcanza sin necesitar `useActionState`.
 */
export function DeleteMaterialButton({
  materialId,
  title,
  fileUrl,
  courseCode,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este material? Esta acción no se puede deshacer.",
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await deleteMaterial(materialId, fileUrl, courseCode);

      // El caso de exito no toca estado local: `revalidatePath` refresca el
      // listado del servidor y la fila desaparece sola.
      if (result.status === "error") {
        setError(result.message);
      }
    });
  }

  return (
    <div className="flex shrink-0 flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-label={`Eliminar ${title}`}
        className="rounded-md p-1.5 text-zinc-500 transition-colors duration-150 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-400 dark:hover:text-red-400 dark:focus-visible:ring-zinc-500"
      >
        {isPending ? (
          <SpinnerGapIcon
            weight="bold"
            aria-hidden
            className="h-4 w-4 animate-spin"
          />
        ) : (
          <TrashIcon weight="bold" aria-hidden className="h-4 w-4" />
        )}
      </button>

      {error && (
        <span className="text-xs text-red-700 dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}
