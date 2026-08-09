import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db";

class Mention extends Model {}

Mention.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false, // El ID del usuario que fue etiquetado (quien recibe la notificación)
    },
    mentionedById: {
      type: DataTypes.INTEGER,
      allowNull: false, // El ID del usuario que escribió el @ (quien hace la mención)
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Se llena si la mención ocurrió dentro de un comentario
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Se llena si la mención ocurrió en la descripción de un material
    },
  },
  {
    sequelize,
    modelName: "Mention",
    tableName: "mentions",
    timestamps: true, // Guarda automáticamente la fecha para ordenar las notificaciones de la más nueva a la más antigua
  },
);

export default Mention;
