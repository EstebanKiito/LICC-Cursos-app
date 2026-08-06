import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class Material extends Model {}

Material.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // El estudiante puede subir el archivo sin texto extra
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false, // El link del S3/Supabase es obligatorio
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: true, // Ej: 'pdf', 'zip', 'docx'
  },
  type: {
    type: DataTypes.ENUM(
      'clase',
      'ayudantia',
      'tarea',
      'proyecto',
      'lab',
      'libro',
      'apunte',
      'resumen',
      'taller',
      'extra'
    ),
    allowNull: false,
    defaultValue: 'apunte', // Por si acaso no se especifica
  },
  // Las llaves foráneas (userId y courseId) se inyectarán al definir las relaciones
}, {
  sequelize,
  modelName: 'Material',
  tableName: 'materials',
  timestamps: true, // Útil para ordenar el "feed" por fecha de publicación
});

export default Material;