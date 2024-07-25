import { Product } from "../models/product.model.js";
import { User } from "../models/usermodel.js";
import userRepo from "./user.repo.js";
export const addProduct = async (
  Name,
  Brand,
  ModelNumber,
  EnergyConsumption,
  UserID
) => {
  try {
    const result = await Product.create({
      Name,
      Brand,
      ModelNumber,
      EnergyConsumption,
      UserID,
    });

    await userRepo.updateUserCreditsByOne(UserID);

    return result;
  } catch (error) {
    throw new Error(`Error creating Product: ${error.message}`);
  }
};

export const getAllProducts = async () => {
  try {
    const result = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getProductById = async (id) => {
  try {
    const result = await Product.findOne({
      where: {
        ProductID: id,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getRateByUserID = async (userId) => {
  try {
    const result = await User.findOne({
      where: {
        UserID: userId,
      },
      attributes: ["Rate"], // Specify that you only want to retrieve the 'Rate' field
    });
    return result ? result.Rate : null; // Return only the Rate value
  } catch (err) {
    throw err;
  }
};

export const getProductByName = async (productName) => {
  try {
    const result = await Product.findOne({
      where: {
        Name: productName,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getProductByUserId = async (userId) => {
  try {
    const result = await Product.findAll({
      where: {
        UserID: userId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getProductByModelNumber = async (modelNumber) => {
  try {
    const result = await Product.findOne({
      where: {
        ModelNumber: modelNumber,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
