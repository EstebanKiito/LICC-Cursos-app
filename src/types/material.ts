/**
 * Valores del ENUM `materials.type` en la base de datos. El orden es el que se
 * muestra en el selector del formulario.
 */
export const MATERIAL_TYPES = [
  "apunte",
  "clase",
  "ayudantia",
  "tarea",
  "proyecto",
  "lab",
  "libro",
  "resumen",
  "taller",
  "extra",
] as const;

export type MaterialType = (typeof MATERIAL_TYPES)[number];

/** Etiquetas legibles del ENUM. Se usan en el formulario y en el listado. */
export const MATERIAL_TYPE_LABELS: Record<MaterialType, string> = {
  apunte: "Apunte",
  clase: "Clase",
  ayudantia: "Ayudantía",
  tarea: "Tarea",
  proyecto: "Proyecto",
  lab: "Laboratorio",
  libro: "Libro",
  resumen: "Resumen",
  taller: "Taller",
  extra: "Extra",
};

/**
 * Estado que la Server Action `uploadMaterial` devuelve a `useActionState`.
 *
 * Vive aca y no junto a la accion a proposito: un modulo `"use server"` solo
 * puede exportar funciones async. Si se exporta una constante, Turbopack no
 * falla el build — la envuelve como server reference, y en el cliente llega
 * una funcion en vez del objeto, rompiendo la hidratacion.
 */
export type UploadMaterialState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const INITIAL_UPLOAD_STATE: UploadMaterialState = {
  status: "idle",
  message: "",
};

/**
 * Tope de tamano por archivo para usuarios sin rol admin. Lo comparten el
 * navegador (rechaza antes de subir nada) y la Server Action (valida de
 * nuevo, porque el cliente no es confiable). Pensado para quedar por debajo
 * del limite real de body que impone Vercel en produccion (~4.5MB), aparte
 * del limite propio de Next.js (`serverActions.bodySizeLimit` /
 * `proxyClientMaxBodySize` en `next.config.ts`).
 */
export const MAX_FILE_BYTES = 5 * 1024 * 1024;

/**
 * Tope de tamano para usuarios con `role: "admin"`. Solo es alcanzable
 * corriendo la app fuera de Vercel (local o self-hosted): el cap de body de
 * Vercel se aplica antes de llegar a Next.js y ninguna config lo supera.
 */
export const ADMIN_MAX_FILE_BYTES = 100 * 1024 * 1024;

export function formatMegabytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
}

/** Mensaje unico para el rechazo por tamano, igual en cliente y servidor. */
export function oversizeMessage(
  bytes: number,
  maxBytes: number = MAX_FILE_BYTES,
): string {
  return `El archivo pesa ${formatMegabytes(bytes)}. El máximo es ${formatMegabytes(maxBytes)}.`;
}

export function isMaterialType(value: unknown): value is MaterialType {
  return (
    typeof value === "string" &&
    (MATERIAL_TYPES as readonly string[]).includes(value)
  );
}

/**
 * Forma plana y serializable de un material, analoga a `CourseDTO`: es lo unico
 * que cruza hacia los Client Components. `createdAt` viaja como ISO string
 * porque un `Date` de Sequelize no sobrevive intacto la serializacion.
 */
export type MaterialDTO = {
  id: number;
  title: string;
  fileUrl: string;
  fileType: string | null;
  type: MaterialType;
  createdAt: string;
  authorName: string | null;
  userId: string;
};

/**
 * Estado que la Server Action `deleteMaterial` devuelve a `useTransition`.
 * Mismo motivo que `UploadMaterialState` para vivir aca y no en la accion.
 */
export type DeleteMaterialState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const INITIAL_DELETE_STATE: DeleteMaterialState = {
  status: "idle",
  message: "",
};
