import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class Message extends Model {}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Quién mandó el mensaje
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false, // El texto del chat
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Para saber si el amigo ya leyó el mensaje
  }
}, {
  sequelize,
  modelName: 'Message',
  tableName: 'messages',
  timestamps: true,
});

export default Message;