import * as productRepo from "../repositories/product.repository.js";

export const addProduct = async (
  Name,
  Brand,
  ModelNumber,
  EnergyConsumption,
  UserID
) => {
  try {
    const result = await productRepo.addProduct(
      Name,
      Brand,
      ModelNumber,
      EnergyConsumption,
      UserID
    );
    return {
      data: result,
      message: "Data added successfully",
      status: true,
    };
  } catch (error) {
    return { status: false, message: error };
  }
};

export const getAllProducts = async () => {
  try {
    const result = await productRepo.getAllProducts();
    if (result.length > 0) {
      return {
        status: true,
        message: "get all Products successfully",
        data: result,
      };
    } else {
      return {
        status: false,
        message: "No Products in database",
      };
    }
  } catch (error) {
    console.error(error);
    return { status: false, message: error.message };
  }
};

export const getProductById = async (id) => {
  try {
    const product = await productRepo.getProductById(id);
    if (!product) {
      return { status: false, message: "No Product in database!" };
    }

    const userId = product.UserID;
    const userRate = await productRepo.getRateByUserID(userId);
    if (!userRate) {
      return { status: false, message: "User rate not found!" };
    }

    const wattage = product.EnergyConsumption; // Assuming EnergyUsage is in watts
    const hoursUsedPerDay = 24; 
    const daysUsed = 365; 
    const costPerKWh = userRate;

    
    const kilowatts = wattage / 1000;

    
    const energyConsumption = kilowatts * hoursUsedPerDay * daysUsed;

   
    const energyCost = energyConsumption * costPerKWh;

    return {
      status: true,
      message: "Product retrieved successfully!",
      data: {
        product: product,
        energyConsumption: `${energyConsumption}kWh/year`,
        estimatedCost: `USD. ${energyCost}`,
      },
    };
  } catch (error) {
    console.error(error);
    return { status: false, message: error.message };
  }
};

export const getProductByName = async (productName) => {
  try {
    const product = await productRepo.getProductByName(productName);
    if (!product) {
      return { status: false, message: "No Product in database!" };
    }

    const userId = product.UserID;
    const userRate = await productRepo.getRateByUserID(userId);
    if (!userRate) {
      return { status: false, message: "User rate not found!" };
    }

    const wattage = product.EnergyConsumption; // Assuming EnergyUsage is in watts
    const hoursUsedPerDay = 24; 
    const daysUsed = 365; 
    const costPerKWh = userRate;

    
    const kilowatts = wattage / 1000;

   
    const energyConsumption = kilowatts * hoursUsedPerDay * daysUsed;

    
    const energyCost = energyConsumption * costPerKWh;

    return {
      status: true,
      message: "Product retrieved successfully!",
      data: {
        product: product,
        energyConsumption: `${energyConsumption}kWh/year`,
        estimatedCost: `USD. ${energyCost}`,
      },
    };
  } catch (error) {
    console.error(error);
    return { status: false, message: error.message };
  }
};

export const getProductByUserId = async (userId) => {
  try {
    const products = await productRepo.getProductByUserId(userId);
    if (!products || products.length === 0) {
      return { status: false, message: "No Product in database!" };
    }

    const userRate = await productRepo.getRateByUserID(userId);
    if (!userRate) {
      return { status: false, message: "User rate not found!" };
    }

    const costPerKWh = userRate;
    const hoursUsedPerDay = 24; 
    const daysUsed = 365; 

    
    const productData = products.map((product) => {
      const wattage = product.EnergyConsumption; // Assuming EnergyConsumption is in watts
      const kilowatts = wattage / 1000; 
      const energyConsumption = kilowatts * hoursUsedPerDay * daysUsed; 
      const energyCost = energyConsumption * costPerKWh;

      return {
        ...product.toJSON(), 
        energyConsumption: `${energyConsumption} kWh/year`,
        estimatedCost: `USD ${energyCost.toFixed(2)}`, 
      };
    });

    return {
      status: true,
      message: "Products retrieved successfully!",
      data: productData,
    };
  } catch (error) {
    console.error(error);
    return { status: false, message: error.message };
  }
};

export const getProductByModelNumber = async (modelNumber) => {
  try {
    const product = await productRepo.getProductByModelNumber(modelNumber);
    if (!product) {
      return { status: false, message: "No Product in database!" };
    }

    const userId = product.UserID;
    const userRate = await productRepo.getRateByUserID(userId);
    if (!userRate) {
      return { status: false, message: "User rate not found!" };
    }

    const wattage = product.EnergyConsumption; // Assuming EnergyUsage is in watts
    const hoursUsedPerDay = 24; 
    const daysUsed = 365; 
    const costPerKWh = userRate;

    
    const kilowatts = wattage / 1000;

    
    const energyConsumption = kilowatts * hoursUsedPerDay * daysUsed;

    
    const energyCost = energyConsumption * costPerKWh;

    return {
      status: true,
      message: "Product retrieved successfully!",
      data: {
        product: product,
        energyConsumption: `${energyConsumption}kWh/year`,
        estimatedCost: `USD. ${energyCost}`,
      },
    };
  } catch (error) {
    console.error(error);
    return { status: false, message: error.message };
  }
};
