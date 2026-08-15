import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
