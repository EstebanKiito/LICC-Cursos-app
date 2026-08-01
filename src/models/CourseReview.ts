import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class CourseReview extends Model {}

CourseReview.init({
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
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false, // El consejo, técnica de estudio o review
  },
  recommendedProfessors: {
    type: DataTypes.STRING,
    allowNull: true, // Ej: "Juan Pérez, María Gómez"
  },
  difficultyRating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5, // Escala del 1 al 5
    }
  }
}, {
  sequelize,
  modelName: 'CourseReview',
  tableName: 'course_reviews',
  timestamps: true,
});

export default CourseReview;