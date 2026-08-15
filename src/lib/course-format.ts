/**
 * Helpers puros de presentacion de cursos.
 *
 * Este archivo NO importa Sequelize ni React a proposito: lo consumen tanto los
 * Server Components como el Client Component de filtros. Si estos helpers
 * vivieran junto a las queries (`lib/courses.ts`), el bundle de cliente
 * arrastraria `@/models` -> `lib/db.ts` -> Sequelize y el build fallaria.
 */

/**
 * Las siglas UC son letras + 3 o 4 digitos: IIC1103, MAT1610, pero tambien
 * AST101, que trae un digito menos. Por eso se captura el primer digito que
 * sigue a las letras en vez de leer una posicion fija del string.
 */
const LEVEL_PATTERN = /^[A-Za-z]+(\d)/;

/** "IIC2233" -> 2000, "AST101" -> 1000, sigla sin digitos -> null. */
export function getCourseLevel(code: string): number | null {
  const digit = LEVEL_PATTERN.exec(code)?.[1];
  return digit ? Number(digit) * 1000 : null;
}

export function formatLevel(level: number): string {
  return `Nivel ${level}`;
}

const TYPE_LABELS: Record<string, string> = {
  dcc: "DCC",
  major: "Major",
  fmat: "Formación matemática",
  opt: "Optativo",
  ofg: "OFG",
  eti: "Ética",
};

/** Etiqueta legible del tipo. Cae al valor crudo si aparece uno no mapeado. */
export function formatType(value: string | null): string {
  if (!value) return "Sin categoría";
  return TYPE_LABELS[value] ?? value.toUpperCase();
}

const PARITY_LABELS: Record<string, string> = {
  both: "Ambos semestres",
  odd: "Semestre impar",
  even: "Semestre par",
};

export function formatParity(value: string | null): string {
  if (!value) return "Sin información";
  return PARITY_LABELS[value] ?? value;
}

export function formatCredits(credits: number | null): string {
  if (credits === null) return "Sin créditos";
  return `${credits} ${credits === 1 ? "crédito" : "créditos"}`;
}

/**
 * Normaliza texto para el buscador: descompone los acentos y los descarta, de
 * modo que "calculo" encuentre "Cálculo".
 */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}
