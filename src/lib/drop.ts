import sequelize from "./db";

async function dropAllTables() {
  try {
    console.log("⚠️ Iniciando eliminación de todas las tablas en Supabase...");

    // Ejecutamos un bloque SQL nativo de Postgres que busca y borra cada tabla con CASCADE
    await sequelize.query(`
      DO $$ DECLARE
          r RECORD;
      BEGIN
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
              EXECUTE 'DROP TABLE IF EXISTS "public"."' || r.tablename || '" CASCADE';
          END LOOP;
      END $$;
    `);

    console.log(
      "✅ Todas las tablas fueron eliminadas con éxito. El esquema public está intacto.",
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al eliminar las tablas:", error);
    process.exit(1);
  }
}

dropAllTables();
