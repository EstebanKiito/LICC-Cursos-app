import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class Annotation extends Model {}

Annotation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // El texto exacto que el usuario seleccionó/subrayó en el PDF
  quote: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // El comentario o apunte que el usuario escribió al lado derecho
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // ¡CLAVE! Aquí guardamos el JSON con las coordenadas (página, rectángulos, etc.)
  // Postgres soporta JSONB, lo que lo hace súper rápido y flexible.
  position: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#ffeb3b', // Color del destacador (amarillo por defecto)
  }
}, {
  sequelize,
  modelName: 'Annotation',
  tableName: 'annotations',
  timestamps: true,
});

export default Annotation;