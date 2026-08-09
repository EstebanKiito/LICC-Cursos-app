import sequelize from "./db";
import "../models/index"; // Importamos el index para que Sequelize conozca todas las tablas

async function resetDatabase() {
  try {
    console.log("⚠️ Iniciando reseteo total de la base de datos...");

    // force: true destruye las tablas existentes y las vuelve a crear limpias
    await sequelize.sync({ force: true });

    console.log("✅ Base de datos reseteada y recreada con éxito.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al resetear la base de datos:", error);
    process.exit(1);
  }
}

resetDatabase();
