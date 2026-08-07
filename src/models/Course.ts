import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class Course extends Model {}

Course.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING, // Ejemplo: IIC1103
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  prerequisites: {
    type: DataTypes.STRING, 
    allowNull: true, // Lo dejamos nulo si no tiene prerrequisitos
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: true, // Usamos INTEGER ya que todos son números (10, 5)
  },
  parity: {
    type: DataTypes.STRING, // 'both', 'odd', 'even', o null
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING, // 'dcc', 'fmat', 'major', 'eti', etc.
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Course',
  tableName: 'courses',
  timestamps: false,
});

export default Course;