/**
 * Forma plana y serializable de un curso. Es lo unico que cruza la frontera
 * entre Server Components y Client Components: las instancias de Sequelize no
 * son objetos planos y React las rechaza al pasarlas como props.
 */
export type CourseDTO = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  prerequisites: string | null;
  credits: number | null;
  /**
   * Hoy la data usa 'both' | 'odd' | 'even', pero la columna es STRING libre
   * (sin ENUM ni validacion). Se deja abierto a proposito: cerrar la union
   * obligaria a castear o a descartar valores nuevos en silencio.
   */
  parity: string | null;
  /** Mismo criterio: hoy 'dcc' | 'major' | 'fmat' | 'opt' | 'ofg' | 'eti'. */
  type: string | null;
};
