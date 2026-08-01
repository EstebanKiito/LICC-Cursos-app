import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class Like extends Model {}

Like.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  materialId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Like',
  tableName: 'likes',
  timestamps: true,
});

export default Like;