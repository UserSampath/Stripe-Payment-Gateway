import express from "express";
const router = express.Router();
import * as productController from "../controllers/product.controller.js";
import userAuthentication from "../middleware/userAuthentication.js";

router.post("/addProduct",userAuthentication, productController.addProduct);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProductById/:id", productController.getProductById);
router.get("/getProductByName/:name", productController.getProductByName);
router.get("/getProductsByUserId/:id", productController.getProductByUserId);
router.get("/getProductByModelNumber/:modelNumber", productController.getProductByModelNumber);



export default router;