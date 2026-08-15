import { cache } from "react";
import { Course } from "@/models";
import type { CourseDTO } from "@/types/course";

/**
 * Acceso a datos de cursos. Unico archivo de la Fase 2 que toca Sequelize:
 * mantenerlo aislado evita que el modelo se filtre al bundle de cliente.
 *
 * Se usan funciones async normales y no Server Actions: una Server Action
 * (`"use server"`) publica un endpoint POST pensado para mutaciones, mientras
 * que para leer desde un Server Component la llamada directa es lo correcto.
 */

/** Fila cruda tal como la entrega `raw: true`, sin instancia de Sequelize. */
type CourseRow = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  prerequisites: string | null;
  credits: number | null;
  parity: string | null;
  type: string | null;
};

const ATTRIBUTES = [
  "id",
  "code",
  "name",
  "description",
  "prerequisites",
  "credits",
  "parity",
  "type",
] as const;

/**
 * Normaliza la fila al DTO: fuerza los numericos (segun el parser, pg puede
 * devolver strings) y colapsa `undefined` a `null` para que el objeto sea
 * serializable hacia el cliente.
 */
function toCourseDTO(row: CourseRow): CourseDTO {
  return {
    id: Number(row.id),
    code: row.code.toUpperCase(),
    name: row.name,
    description: row.description ?? null,
    prerequisites: row.prerequisites ?? null,
    credits: row.credits == null ? null : Number(row.credits),
    parity: row.parity ?? null,
    type: row.type ?? null,
  };
}

/** Catalogo completo, ordenado alfabeticamente por sigla. */
export const getCourses = cache(async (): Promise<CourseDTO[]> => {
  // `Course extends Model` no lleva genericos, asi que `findAll` siempre se
  // tipa como `Promise<Course[]>` aunque `raw: true` devuelva objetos planos.
  // Este cast es la unica costura insegura, y `toCourseDTO` retipa la salida.
  const rows = (await Course.findAll({
    attributes: [...ATTRIBUTES],
    order: [["code", "ASC"]],
    raw: true,
  })) as unknown as CourseRow[];

  return rows.map(toCourseDTO);
});

/** Un curso por sigla. Normaliza a mayusculas: Postgres compara exacto. */
export const getCourseByCode = cache(
  async (code: string): Promise<CourseDTO | null> => {
    const row = (await Course.findOne({
      attributes: [...ATTRIBUTES],
      where: { code: code.toUpperCase() },
      raw: true,
    })) as unknown as CourseRow | null;

    return row ? toCourseDTO(row) : null;
  },
);
