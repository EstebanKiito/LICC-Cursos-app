import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Sequelize v6 es CJS y carga los drivers de dialecto con `require(variable)`,
  // patron que Turbopack no puede resolver estaticamente. Dejarlo fuera del
  // bundle evita warnings de dependencia critica y arrastrar lodash/validator
  // al chunk del servidor. `pg` ya viene en la lista built-in de Next.
  serverExternalPackages: ["sequelize"],
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
