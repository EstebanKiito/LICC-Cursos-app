"use client";

import { useActionState, useRef, useState } from "react";
import {
  CheckCircleIcon,
  SpinnerGapIcon,
  UploadSimpleIcon,
  WarningCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { uploadMaterial } from "@/app/actions/materials";
import {
  formatMegabytes,
  INITIAL_UPLOAD_STATE,
  MATERIAL_TYPES,
  MATERIAL_TYPE_LABELS,
  MAX_FILE_BYTES,
  oversizeMessage,
} from "@/types/material";

type Props = {
  courseId: number;
  /** Solo para revalidar la ruta literal del curso tras subir. */
  courseCode: string;
};

/** Formatea bytes para el resumen del archivo elegido. */
function formatSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadMaterialForm({ courseId, courseCode }: Props) {
  // `useActionState` da el pending sin `useTransition` manual y mantiene el
  // formulario funcional aunque el JS aun no haya hidratado.
  const [state, formAction, pending] = useActionState(
    uploadMaterial,
    INITIAL_UPLOAD_STATE,
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<File | null>(null);
  const [uploadingName, setUploadingName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  /**
   * Punto unico por el que entra un archivo, venga del selector o del drop.
   *
   * El rechazo por tamano ocurre aca para no gastar una subida de 10MB que el
   * servidor va a descartar igual. Es solo UX: `uploadMaterial` revalida.
   */
  function chooseFile(candidate: File | null) {
    if (candidate && candidate.size > MAX_FILE_BYTES) {
      setLocalError(oversizeMessage(candidate.size));
      clearFile();
      return;
    }

    setLocalError(null);
    setSelected(candidate);
  }

  /**
   * React limpia el `<input type="file">` en toda submission, con exito o con
   * error (`requestFormReset` corre al abrir la transicion de la accion). Por
   * eso el estado espejo se limpia aca, en el submit, donde el setState es
   * legal: queda sincronizado con el DOM en ambos casos, sin efectos ni
   * actualizaciones durante el render.
   *
   * Va en `onSubmit` y no envolviendo la accion a proposito. `action` recibe
   * `formAction` directo para no perder el submit sin JS: una funcion definida
   * en el cliente no es una server reference, y el `<form>` dejaria de tener
   * a donde postear. React corre este handler antes de armar el `FormData`
   * (solo lo omite si alguien llama `preventDefault`), y aca solo se toca
   * estado de React, nunca el input, asi que lo enviado no cambia.
   */
  function captureSubmission() {
    setUploadingName(selected?.name ?? null);
    setSelected(null);
    setLocalError(null);
  }

  /**
   * El `<input type="file">` no es asignable por valor, salvo con un
   * `DataTransfer`: es la unica forma de que el archivo soltado viaje en el
   * `FormData` del submit.
   */
  function adoptDroppedFile(dropped: File) {
    const transfer = new DataTransfer();
    transfer.items.add(dropped);

    if (inputRef.current) {
      inputRef.current.files = transfer.files;
    }

    chooseFile(dropped);
  }

  function clearFile() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSelected(null);
  }

  return (
    <form
      action={formAction}
      onSubmit={captureSubmission}
      className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Contexto que la accion necesita y el usuario no escribe. */}
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="courseCode" value={courseCode} />

      <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        Subir material
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Arrastra un archivo o selecciónalo. Máximo{" "}
        {formatMegabytes(MAX_FILE_BYTES)}.
      </p>

      {/* Zona de drop. El <label> hace que el click abra el selector nativo y
          que el teclado llegue al input sin ARIA extra. */}
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);

          const dropped = event.dataTransfer.files[0];
          if (dropped) {
            adoptDroppedFile(dropped);
          }
        }}
        className={`mt-5 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors duration-150 focus-within:ring-2 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-500 ${
          dragging
            ? "border-zinc-400 bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800/60"
            : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          name="file"
          required
          disabled={pending}
          onChange={(event) => chooseFile(event.target.files?.[0] ?? null)}
          className="sr-only"
        />

        <UploadSimpleIcon
          weight="bold"
          aria-hidden
          className="h-6 w-6 text-zinc-400 dark:text-zinc-500"
        />
        <span className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {dragging ? "Suelta el archivo aquí" : "Arrastra o haz clic para elegir"}
        </span>
        <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          PDF, imágenes, comprimidos y documentos
        </span>
      </label>

      {/* Resumen del archivo: sin esto el <input> oculto no da feedback. Durante
          la subida muestra el nombre en curso, ya sin el boton de quitar. */}
      {pending && uploadingName && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
          <SpinnerGapIcon
            weight="bold"
            aria-hidden
            className="h-4 w-4 shrink-0 animate-spin text-zinc-500 dark:text-zinc-400"
          />
          <span className="min-w-0 flex-1 truncate text-sm text-zinc-600 dark:text-zinc-400">
            {uploadingName}
          </span>
        </div>
      )}

      {!pending && selected && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
          <span className="min-w-0 flex-1 truncate text-sm text-zinc-900 dark:text-zinc-50">
            {selected.name}
          </span>
          <span className="font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
            {formatSize(selected.size)}
          </span>
          <button
            type="button"
            onClick={clearFile}
            aria-label={`Quitar ${selected.name}`}
            className="rounded-md p-1 text-zinc-500 transition-colors duration-150 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none dark:text-zinc-400 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
          >
            <XIcon weight="bold" aria-hidden className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <label
            htmlFor="material-type"
            className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400"
          >
            Tipo
          </label>
          <select
            id="material-type"
            name="type"
            defaultValue="apunte"
            disabled={pending}
            className="mt-1 block rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus-visible:ring-zinc-500"
          >
            {MATERIAL_TYPES.map((value) => (
              <option key={value} value={value}>
                {MATERIAL_TYPE_LABELS[value]}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={pending || !selected}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-500"
        >
          {pending && (
            <SpinnerGapIcon
              weight="bold"
              aria-hidden
              className="h-4 w-4 animate-spin"
            />
          )}
          {pending ? "Subiendo…" : "Subir material"}
        </button>
      </div>

      {/* `aria-live` para que el lector de pantalla anuncie el resultado sin
          que el foco tenga que moverse. El rechazo local del navegador tiene
          prioridad: es lo ultimo que hizo el usuario. */}
      <p aria-live="polite" className="empty:hidden">
        {(localError || state.status !== "idle") && (
          <span
            className={`mt-4 flex items-center gap-2 text-sm ${
              localError || state.status === "error"
                ? "text-red-700 dark:text-red-400"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {localError || state.status === "error" ? (
              <WarningCircleIcon
                weight="bold"
                aria-hidden
                className="h-4 w-4 shrink-0"
              />
            ) : (
              <CheckCircleIcon
                weight="bold"
                aria-hidden
                className="h-4 w-4 shrink-0"
              />
            )}
            {localError ?? state.message}
          </span>
        )}
      </p>
    </form>
  );
}
