import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

class Account extends Model {}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Cambiamos el modelo importado por el nombre exacto de la tabla en string
      key: 'id',
    }
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false, // Ej: 'google', 'github'
  },
  providerAccountId: {
    type: DataTypes.STRING,
    allowNull: false, // El ID numérico o alfanumérico que entrega el proveedor
  }
}, {
  sequelize,
  modelName: 'Account',
  tableName: 'accounts',
  timestamps: true,
});

export default Account;