import {CreationOptional, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import {DataTypes} from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/db';

export interface UserInterface {
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
  role: string;
  validPassword: (password: string) => {};
}

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>, UserInterface {}

const User = sequelize.define(
  'User',
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
  },
  {
    hooks: {
      beforeCreate: setPassword,
      beforeUpdate: setPassword,
    },
  },
);

function setPassword(user: UserModel) {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
}

User.prototype.validPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
