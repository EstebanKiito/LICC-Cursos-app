import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db";

class Notebook extends Model {}

Notebook.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Mi Cuaderno", // Por si un estudiante quiere tener más de un cuaderno por ramo
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "", // Empieza vacío para que el usuario escriba su Markdown/LaTeX
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false, // Cada cuaderno pertenece a un usuario
    },
  },
  {
    sequelize,
    modelName: "Notebook",
    tableName: "notebooks",
    timestamps: true, // Esto es vital para mostrar "Última edición hace 2 horas"
  },
);

export default Notebook;
