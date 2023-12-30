import { DataTypes, Sequelize } from "sequelize";

const BulkUploadTable = (sequelize: Sequelize) => {
  return sequelize.define("BulkUpload", {
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
  });
};

export default BulkUploadTable;
