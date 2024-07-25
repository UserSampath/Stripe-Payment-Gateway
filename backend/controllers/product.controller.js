import * as productService from "../services/product.service.js";

export const addProduct = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        error: "Required fields are missing in the request body",
        status: false,
      });
    }
    const UserID = req.userId.id;
    const { Name, Brand, ModelNumber, EnergyConsumption } = req.body;

    const result = await productService.addProduct(
      Name,
      Brand,
      ModelNumber,
      EnergyConsumption,
      UserID
    );

    if (result.status) {
      res.status(201).json({
        response_code: 201,
        status: true,
        message: result.message,
        result: result.data,
      });
    } else {
      res
        .status(400)
        .json({ response_code: 400, status: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({
      response_code: 500,
      status: false,
      error: "Internal Server Error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts();
    if (result.status) {
      res.status(200).json({
        response_code: 200,
        status: result.status,
        message: result.message,
        result: result.data,
      });
    } else {
      res.status(404).json({
        response_code: 404,
        status: result.status,
        message: result.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      response_code: 500,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productService.getProductById(id);
    if (result.status) {
      res.status(200).json({
        response_code: 200,
        status: result.status,
        message: result.message,
        result: result.data,
      });
    } else {
      res.status(404).json({
        response_code: 404,
        status: result.status,
        message: result.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      response_code: 500,
      message: error.message,
    });
  }
};

export const getProductByName = async (req, res) => {
  try {
    const productName = req.params.name;
    const result = await productService.getProductByName(productName);
    if (result.status) {
      res.status(200).json({
        response_code: 200,
        status: result.status,
        message: result.message,
        result: result.data,
      });
    } else {
      res.status(404).json({
        response_code: 404,
        status: result.status,
        message: result.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      response_code: 500,
      message: error.message,
    });
  }
};

export const getProductByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await productService.getProductByUserId(userId);
    if (result.status) {
      res.status(200).json({
        response_code: 200,
        status: result.status,
        message: result.message,
        result: result.data,
      });
    } else {
      res.status(404).json({
        response_code: 404,
        status: result.status,
        message: result.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      response_code: 500,
      message: error.message,
    });
  }
};

export const getProductByModelNumber = async (req, res) => {
  try {
    const modelNumber = req.params.modelNumber;
    const result = await productService.getProductByModelNumber(modelNumber);
    if (result.status) {
      res.status(200).json({
        response_code: 200,
        status: result.status,
        message: result.message,
        result: result.data,
      });
    } else {
      res.status(404).json({
        response_code: 404,
        status: result.status,
        message: result.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      response_code: 500,
      message: error.message,
    });
  }
};
