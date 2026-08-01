import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class Conversation extends Model {}

Conversation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true, // Si es null, es un chat privado de 1 a 1. Si tiene texto, es un grupo.
  },
  isGroup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: 'Conversation',
  tableName: 'conversations',
  timestamps: true,
});

export default Conversation;