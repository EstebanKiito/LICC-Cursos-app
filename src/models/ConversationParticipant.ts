import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db";

class ConversationParticipant extends Model {}

ConversationParticipant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ConversationParticipant",
    tableName: "conversation_participants",
    timestamps: true,
  },
);

export default ConversationParticipant;
