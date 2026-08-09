import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db";

class Account extends Model {}

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id", // Postgres usa snake_case por convención, así que mapeamos a user_id
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
      field: "provider_account_id",
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
