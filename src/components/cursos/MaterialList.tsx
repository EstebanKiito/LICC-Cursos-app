import { DownloadSimpleIcon, FileDashedIcon } from "@phosphor-icons/react/ssr";
import { DeleteMaterialButton } from "@/components/DeleteMaterialButton";
import { MATERIAL_TYPE_LABELS, type MaterialDTO } from "@/types/material";

type Props = {
  materials: MaterialDTO[];
  courseCode: string;
  currentUserId: string;
  isAdmin: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function MaterialRow({
  material,
  courseCode,
  currentUserId,
  isAdmin,
}: {
  material: MaterialDTO;
  courseCode: string;
  currentUserId: string;
  isAdmin: boolean;
}) {
  const canDelete = isAdmin || material.userId === currentUserId;

  // Metadatos secundarios en una sola linea: tipo, autor y fecha. Se filtran
  // los ausentes para no dejar separadores colgando.
  const meta = [
    MATERIAL_TYPE_LABELS[material.type],
    material.authorName,
    dateFormatter.format(new Date(material.createdAt)),
  ].filter(Boolean);

  return (
    <li className="flex items-center gap-4 px-4 py-3.5 transition-colors duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {material.title}
        </p>
        <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
          {meta.join(" · ")}
        </p>
      </div>

      {material.fileType && (
        <span className="hidden shrink-0 rounded-lg border border-zinc-200 px-2 py-0.5 font-mono text-xs uppercase text-zinc-600 sm:inline dark:border-zinc-800 dark:text-zinc-400">
          {material.fileType}
        </span>
      )}

      {/* `rel="noopener noreferrer"` es obligatorio junto a `target="_blank"`:
          el bucket es un origen distinto al de la app. */}
      <a
        href={material.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Descargar ${material.title}`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 transition-colors duration-150 hover:border-zinc-300 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
      >
        <DownloadSimpleIcon weight="bold" aria-hidden className="h-4 w-4" />
        <span className="hidden sm:inline">Descargar</span>
      </a>

      {canDelete && (
        <DeleteMaterialButton
          materialId={material.id}
          title={material.title}
          fileUrl={material.fileUrl}
          courseCode={courseCode}
        />
      )}
    </li>
  );
}

export function MaterialList({
  materials,
  courseCode,
  currentUserId,
  isAdmin,
}: Props) {
  if (materials.length === 0) {
    return (
      <div className="mt-6 flex flex-col items-center rounded-xl border-2 border-dashed border-zinc-200 px-6 py-16 text-center dark:border-zinc-800">
        <FileDashedIcon
          weight="bold"
          aria-hidden
          className="h-6 w-6 text-zinc-400 dark:text-zinc-500"
        />
        <p className="mt-4 text-base font-medium text-zinc-900 dark:text-zinc-50">
          Todavía no hay materiales
        </p>
        <p className="mt-2 max-w-[45ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Sé la primera persona en subir guías, pruebas o apuntes de{" "}
          {courseCode}.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Materiales
        </h2>
        <span className="font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
          {materials.length}
        </span>
      </div>

      <ul className="mt-3 divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
        {materials.map((material) => (
          <MaterialRow
            key={material.id}
            material={material}
            courseCode={courseCode}
            currentUserId={currentUserId}
            isAdmin={isAdmin}
          />
        ))}
      </ul>
    </div>
  );
}
