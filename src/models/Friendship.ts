import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db";

class Friendship extends Model {}

Friendship.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    requesterId: {
      type: DataTypes.UUID,
      allowNull: false, // Usuario que envía la solicitud
    },
    addresseeId: {
      type: DataTypes.UUID,
      allowNull: false, // Usuario que recibe la solicitud
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Friendship",
    tableName: "friendships",
    timestamps: true,
  },
);

export default Friendship;
