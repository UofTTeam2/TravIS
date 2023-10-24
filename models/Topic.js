const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Topic extends Model {}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    iconalt: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'topic',
  }
);

module.exports = Topic;
