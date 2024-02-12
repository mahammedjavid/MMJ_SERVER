import { DataTypes, Sequelize } from "sequelize";

const BulkUploadTable = (sequelize: Sequelize) => {
  return sequelize.define("BulkUpload", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
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
