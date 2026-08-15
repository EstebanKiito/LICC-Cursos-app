import { S3Client } from "@aws-sdk/client-s3";

/**
 * Cliente de Cloudflare R2 (API compatible con S3).
 *
 * R2 no tiene regiones: la firma SigV4 siempre se calcula con `region: "auto"`.
 * El endpoint es a nivel de cuenta (`https://<account>.r2.cloudflarestorage.com`),
 * asi que el bucket viaja en cada comando y no en la URL base.
 *
 * Este modulo solo debe importarse desde codigo de servidor (Server Actions,
 * Server Components, Route Handlers): las credenciales son secretas.
 */

/** Lee una variable obligatoria. Falla fuerte y con nombre, no con `undefined`. */
function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Falta la variable de entorno ${name}. Revisa tu archivo .env.`,
    );
  }

  return value;
}

// Se instancia perezosamente y se memoiza: construirlo en el top-level haria
// que un `.env` incompleto reventara el build, no la request que lo necesita.
let client: S3Client | null = null;

export function getR2Client(): S3Client {
  if (client) {
    return client;
  }

  client = new S3Client({
    region: "auto",
    endpoint: requireEnv("R2_ENDPOINT"),
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
  });

  return client;
}

/** Bucket destino de todos los materiales. */
export function getR2Bucket(): string {
  return requireEnv("R2_BUCKET_NAME");
}

/**
 * URL publica de un objeto. `NEXT_PUBLIC_R2_PUBLIC_URL` es el dominio publico
 * del bucket (r2.dev o un dominio propio); se limpia la barra final para no
 * generar URLs con `//`.
 */
export function buildPublicUrl(key: string): string {
  const base = requireEnv("NEXT_PUBLIC_R2_PUBLIC_URL").replace(/\/+$/, "");

  return `${base}/${key}`;
}
