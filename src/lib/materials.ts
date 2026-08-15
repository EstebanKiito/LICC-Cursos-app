import { Material, User } from "@/models";
import {
  isMaterialType,
  type MaterialDTO,
  type MaterialType,
} from "@/types/material";

/**
 * Acceso a datos de materiales. Mismo criterio que `src/lib/courses.ts`: todo
 * el contacto con Sequelize vive aca para que el modelo no se filtre al bundle
 * de cliente, y la pagina solo consume DTOs planos.
 *
 * No se envuelve en `cache()`: el listado se re-lee despues de cada subida via
 * `revalidatePath`, y memoizarlo por request no aporta (hay una sola llamada).
 */

/** Fila cruda del JOIN con `users`, tal como la entrega `raw: true`. */
type MaterialRow = {
  id: number;
  title: string;
  fileUrl: string;
  fileType: string | null;
  type: string;
  createdAt: Date | string;
  userId: string;
  "author.name": string | null;
};

function toMaterialDTO(row: MaterialRow): MaterialDTO {
  // La columna es un ENUM de Postgres, pero Sequelize la tipa como string.
  // Si apareciera un valor nuevo en la BD se degrada a 'apunte' antes de
  // romper el `Record` de etiquetas.
  const type: MaterialType = isMaterialType(row.type) ? row.type : "apunte";

  return {
    id: Number(row.id),
    title: row.title,
    fileUrl: row.fileUrl,
    fileType: row.fileType ?? null,
    type,
    createdAt: new Date(row.createdAt).toISOString(),
    authorName: row["author.name"] ?? null,
    userId: row.userId,
  };
}

/** Materiales de un curso, del mas reciente al mas antiguo. */
export async function getMaterialsByCourse(
  courseId: number,
): Promise<MaterialDTO[]> {
  // `raw: true` con `include` aplana el JOIN a claves con punto
  // ("author.name"), por eso `MaterialRow` las declara asi.
  const rows = (await Material.findAll({
    attributes: [
      "id",
      "title",
      "fileUrl",
      "fileType",
      "type",
      "createdAt",
      "userId",
    ],
    where: { courseId },
    include: [{ model: User, as: "author", attributes: ["name"] }],
    order: [["createdAt", "DESC"]],
    raw: true,
  })) as unknown as MaterialRow[];

  return rows.map(toMaterialDTO);
}
