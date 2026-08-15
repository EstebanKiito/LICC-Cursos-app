import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Cookie de sesion de Auth.js v5. Cubre las cuatro formas reales:
 * con y sin prefijo `__Secure-` (http local vs https) y los sufijos
 * `.0` / `.1` de las cookies fragmentadas cuando el JWT supera los 4 KB.
 */
const SESSION_COOKIE = /^(__Secure-)?authjs\.session-token(\.\d+)?$/;

/**
 * Check optimista: solo mira la presencia de la cookie, sin tocar la base de
 * datos ni importar `@/auth` (que arrastraria Sequelize y pg a cada request).
 * La verificacion real de la firma del JWT vive en cada pagina protegida via
 * `await auth()`, que actua como gate autoritativo.
 */
export function proxy(request: NextRequest) {
  const hasSession = request.cookies
    .getAll()
    .some((cookie) => SESSION_COOKIE.test(cookie.name));

  if (!hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cursos/:path*"],
};
