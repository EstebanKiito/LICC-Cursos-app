import sequelize from './db';
import '../models'; // Importa todas las asociaciones y modelos

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a Supabase establecida correctamente.');

    // alter: true actualiza las tablas si cambiaste algo, force: true borra y crea desde cero
    await sequelize.sync({ alter: true }); 
    console.log('¡Todas las tablas han sido sincronizadas exitosamente en Supabase!');

    process.exit(0);
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
    process.exit(1);
  }
};

syncDatabase();