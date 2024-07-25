import sequelize from "../config/db.connection.js";
import { DataTypes } from "sequelize";
import { User } from "../models/usermodel.js";

export const Product = sequelize.define(
  "Product",
  {
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ModelNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EnergyConsumption: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // estimatedCost: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  },
  {
    tableName: "product",
    timestamps: true,
  }
);

User.hasMany(Product, {
  foreignKey: "UserID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.belongsTo(User, {
  foreignKey: "UserID",
});
