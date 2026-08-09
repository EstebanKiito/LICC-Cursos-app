import { auth, signIn, signOut } from "../auth"; // Ajusta esta ruta según dónde guardaste tu auth.ts

export default async function HomePage() {
  // Obtenemos la sesión del servidor
  const session = await auth();

  return (
    <main
      style={{
        padding: "4rem",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>🎓 Bienvenido a PrepárateUC</h1>

      <div
        style={{
          marginTop: "2rem",
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        {session ? (
          // Si el usuario está logueado, mostramos sus datos
          <>
            <h2>¡Hola, {session.user?.name}! 👋</h2>
            <p>
              <strong>Email:</strong> {session.user?.email}
            </p>
            {/* Si NextAuth trajo la foto de Google, la mostramos */}
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="Avatar"
                style={{
                  width: "80px",
                  borderRadius: "50%",
                  marginTop: "1rem",
                }}
              />
            )}

            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              style={{ marginTop: "2rem" }}
            >
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cerrar Sesión
              </button>
            </form>
          </>
        ) : (
          // Si no hay sesión, mostramos el botón de Login
          <>
            <p>
              No has iniciado sesión. Por favor, identifícate para acceder a tus
              cuadernos y materiales.
            </p>

            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
              style={{ marginTop: "1.5rem" }}
            >
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  background: "#4285F4",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Continuar con Google
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
