import express from "express";
const router = express.Router();

import adminController from "../controllers/admin.controller.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import userController from "../controllers/user.controller.js";
import adminAuthentication from "../middleware/adminAuthentication.js";


router.post("/login", adminController.adminLogin);
router.post("/register", adminController.registerAdmin);
router.post("/ChangePassword/:id", adminController.changeAdminPassword);
router.get("/verifyAdmin", verifyAdmin)
router.get('/getAdmin', adminController.getAdmin);
//router.get("/getAllusersForAdmin",adminAuthentication,userController.getAllUsersForAdmin);
router.put("/ChangeUserPasswordAdmin",adminAuthentication, adminController.ChangePasswordWithEmail);
router.patch("/updateUserPasswordAdmin/:id",adminAuthentication, adminController.updateUser);

export default router;
