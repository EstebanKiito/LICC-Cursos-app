import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';
import User from './User';

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
      model: User,
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

// Definición de las Relaciones (Asociaciones)
User.hasMany(Account, { foreignKey: 'userId', as: 'accounts' });
Account.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Account;