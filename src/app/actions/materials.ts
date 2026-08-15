"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@/auth";
import { buildPublicUrl, getR2Bucket, getR2Client } from "@/lib/r2";
import { Material } from "@/models";
import {
  isMaterialType,
  MAX_FILE_BYTES,
  oversizeMessage,
  type MaterialType,
  type UploadMaterialState,
} from "@/types/material";

// Este modulo lleva `"use server"`: su unico export puede ser una funcion
// async. El tipo, el estado inicial y el tope de tamano viven en
// `@/types/material`, que si es importable desde el cliente.

/** Prefijo de las llaves en R2. Agrupa por curso para poder inspeccionar el bucket. */
const KEY_PREFIX = "materials";

/**
 * Normaliza el nombre original a algo seguro como llave de objeto: sin tildes,
 * sin espacios, sin `../` y sin caracteres que obliguen a escapar la URL.
 */
function slugifyFileName(name: string): string {
  return (
    name
      .normalize("NFD")
      // Elimina los diacriticos que `NFD` acaba de separar de su letra base.
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/^-+|-+$/g, "")
      // Las llaves largas no aportan: el UUID ya garantiza unicidad.
      .slice(0, 80) || "archivo"
  );
}

/** Extension en minusculas, sin punto. `null` si el archivo no tiene. */
function extractExtension(name: string): string | null {
  const match = name.toLowerCase().match(/\.([a-z0-9]{1,10})$/);

  return match ? match[1] : null;
}

/**
 * Sube un material a R2 y lo registra en la base de datos.
 *
 * Firma de `useActionState`: React inyecta el estado previo como primer
 * argumento y el `FormData` del `<form>` como segundo.
 *
 * Campos esperados en el `FormData`:
 * - `file`       -> el archivo (instancia de `File`, la API web nativa)
 * - `courseId`   -> id numerico del curso (hidden)
 * - `courseCode` -> sigla, solo para revalidar la ruta exacta (hidden)
 * - `type`       -> categoria del material (select)
 */
export async function uploadMaterial(
  _prevState: UploadMaterialState,
  formData: FormData,
): Promise<UploadMaterialState> {
  // 1. Autorizacion. Se verifica dentro de la accion y no solo en la pagina:
  // una Server Action es un endpoint POST publico, alcanzable sin pasar por el
  // render del componente que la monta.
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { status: "error", message: "Inicia sesión para subir materiales." };
  }

  // 2. Lectura y validacion del FormData. `formData.get` devuelve
  // `FormDataEntryValue | null` (string | File), asi que cada campo se
  // estrecha antes de usarse.
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Selecciona un archivo para subir." };
  }

  // Revalidacion: el cliente ya filtra por tamano, pero la accion es un
  // endpoint publico y no puede confiar en eso.
  if (file.size > MAX_FILE_BYTES) {
    return { status: "error", message: oversizeMessage(file.size) };
  }

  const courseId = Number(formData.get("courseId"));

  if (!Number.isInteger(courseId) || courseId <= 0) {
    return { status: "error", message: "Curso inválido." };
  }

  const rawType = formData.get("type");
  const type: MaterialType = isMaterialType(rawType) ? rawType : "apunte";

  const courseCode = formData.get("courseCode");

  // 3. Llave unica. El UUID evita colisiones entre dos personas que suban
  // "control1.pdf" el mismo segundo; el nombre limpio mantiene la llave legible.
  const originalName = file.name;
  const key = `${KEY_PREFIX}/${courseId}/${randomUUID()}-${slugifyFileName(originalName)}`;

  try {
    // 4. Subida a R2. El SDK acepta un Uint8Array; se materializa el archivo en
    // memoria porque el stream de `File` no trae `ContentLength` y R2 lo exige.
    const body = new Uint8Array(await file.arrayBuffer());

    await getR2Client().send(
      new PutObjectCommand({
        Bucket: getR2Bucket(),
        Key: key,
        Body: body,
        ContentLength: body.byteLength,
        ContentType: file.type || "application/octet-stream",
      }),
    );

    // 5. Registro en la base de datos. La URL publica se construye a mano: el
    // bucket se sirve por su dominio publico, no por el endpoint firmado.
    await Material.create({
      userId,
      courseId,
      title: originalName,
      fileUrl: buildPublicUrl(key),
      fileType: extractExtension(originalName),
      type,
    });
  } catch (error) {
    // El detalle queda en el log del servidor; al cliente solo va un mensaje
    // generico, sin nombres de bucket ni trazas.
    console.error("[uploadMaterial] fallo la subida", error);

    return {
      status: "error",
      message: "No se pudo subir el archivo. Inténtalo de nuevo.",
    };
  }

  // 6. Refresco. Con la sigla se revalida la ruta literal; sin ella se cae al
  // patron dinamico, que exige el segundo argumento 'page'.
  if (typeof courseCode === "string" && courseCode) {
    revalidatePath(`/cursos/${courseCode}`);
  } else {
    revalidatePath("/cursos/[code]", "page");
  }

  return { status: "success", message: `"${originalName}" se subió correctamente.` };
}
