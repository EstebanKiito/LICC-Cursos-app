import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class StudyTask extends Model {}

StudyTask.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Nulo si es una tarea personal
  },
  customName: {
    type: DataTypes.STRING,
    allowNull: true, // Nulo si está vinculada a un ramo de la plataforma
  },
  plannedMinutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // El tiempo que te propones darle
  },
  actualMinutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // El tiempo que realmente midió el reloj
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // El botón de check
  },
  date: {
    type: DataTypes.DATEONLY, // Guarda solo YYYY-MM-DD, ideal para filtrar la rutina del día
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'StudyTask',
  tableName: 'study_tasks',
  timestamps: true, 
});

export default StudyTask;