import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Sequelize v6 es CJS y carga los drivers de dialecto con `require(variable)`,
  // patron que Turbopack no puede resolver estaticamente. Dejarlo fuera del
  // bundle evita warnings de dependencia critica y arrastrar lodash/validator
  // al chunk del servidor. `pg` ya viene en la lista built-in de Next.
  serverExternalPackages: ["sequelize"],
  experimental: {
    serverActions: {
      // El body de una Server Action se corta en 1MB por defecto, y el archivo
      // viaja dentro de ese body. `uploadMaterial` valida un tope dinamico
      // segun rol (5MB usuarios, 100MB admin, ver `types/material.ts`); 105mb
      // da holgura sobre el mayor de los dos, asi el rechazo llega como
      // mensaje en la UI y no como un error opaco de Next. OJO: en Vercel el
      // limite real de body de las Serverless/Edge Functions (~4.5MB) se
      // aplica antes de llegar a Next.js y esta config no lo puede superar;
      // el tope de 100MB para admin solo es alcanzable corriendo la app
      // local o self-hosted.
      bodySizeLimit: "105mb",
    },
    // Segundo tope, independiente del anterior: al existir `src/proxy.ts`,
    // Next bufferea el body para poder leerlo dos veces y lo trunca en 10MB
    // por defecto. Truncado, el multipart queda corrupto y la request muere
    // con "Failed to parse body as FormData" (500) antes de llegar a la
    // accion. Debe acompañar a `bodySizeLimit` o el limite real es el de aca.
    // Mismo caveat de Vercel que arriba.
    proxyClientMaxBodySize: "105mb",
  },
  images: {
    remotePatterns: [
      // Avatares de Google que devuelve el proveedor OAuth.
      new URL("https://lh3.googleusercontent.com/**"),
      // TODO: placeholder del hero. Eliminar al subir fotografia propia.
      new URL("https://picsum.photos/**"),
    ],
  },
};

export default nextConfig;
