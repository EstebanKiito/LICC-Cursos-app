import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class Course extends Model {}

Course.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sigla: {
    type: DataTypes.STRING, // Ejemplo: IIC2173
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Course',
  tableName: 'courses',
  timestamps: false, // Los ramos no suelen necesitar fecha de creación
});

export default Course;