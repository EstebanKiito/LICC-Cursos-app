import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db";

class Account extends Model {}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false, // Ej: 'oauth'
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false, // Ej: 'google'
    },
    providerAccountId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: { type: DataTypes.TEXT, allowNull: true },
    access_token: { type: DataTypes.TEXT, allowNull: true },
    expires_at: { type: DataTypes.INTEGER, allowNull: true },
    token_type: { type: DataTypes.STRING, allowNull: true },
    scope: { type: DataTypes.STRING, allowNull: true },
    id_token: { type: DataTypes.TEXT, allowNull: true },
    session_state: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "Account",
    tableName: "accounts",
    timestamps: true,
  },
);

export default Account;
