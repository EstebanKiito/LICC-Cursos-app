import sequelize from './db';
import User from '../models/User';
import Course from '../models/Course';

export async function sincronizarBaseDeDatos() {
  try {
    // force: false asegura que no borres datos si la tabla ya existe
    // alter: true modifica la tabla si agregas columnas nuevas luego
    await sequelize.sync({ force: false, alter: true });
    console.log('¡Tablas sincronizadas con éxito en PostgreSQL!');
  } catch (error) {
    console.error('Error sincronizando las tablas:', error);
  }
}