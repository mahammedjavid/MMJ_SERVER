const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BulkUpload = sequelize.define(
    'BulkUpload',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
  );

  return BulkUpload;
};
