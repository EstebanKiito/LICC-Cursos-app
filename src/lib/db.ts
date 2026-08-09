import { Sequelize } from "sequelize";
import pg from "pg";

// Verificamos que la variable de entorno exista para evitar errores silenciosos
if (!process.env.DATABASE_URL) {
  throw new Error("Falta la variable de entorno DATABASE_URL");
}

// Instanciamos Sequelize usando la cadena de conexión de tu .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Supabase exige conexiones seguras por SSL
    },
  },
  logging: console.log, // Cambia a 'console.log' si deseas ver las consultas SQL nativas en tu terminal
});

export default sequelize;
