import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    emailVerified: {
      type: DataTypes.DATE, // Requerido por NextAuth
      allowNull: true,
      field: "email_verified",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Permite nulos para usuarios default o que no tengan imagen de perfil
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Permite nulos para los usuarios que entren con OAuth
    },
    role: {
      type: DataTypes.ENUM("admin", "moderator", "student"),
      defaultValue: "student", // Rol por defecto en inglés
    },
    isProfilePublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Por defecto es público, como en la mayoría de redes
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  },
);

export default User;
