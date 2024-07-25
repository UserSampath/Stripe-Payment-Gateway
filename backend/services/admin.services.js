import adminRepo from "../repositories/admin.repo.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import userRepo from "../repositories/user.repo.js";

const adminService = {

  registerAdmin: async () => {

   
    try {
      const existingAdmin = await adminRepo.getAdminByEmail(process.env.ADMIN_EMAIL);
      if (existingAdmin[0]) {
        throw new Error("Admin already exists. Only one admin can be registered.");
      }
      const encrypted_pw = await bcrypt.hash(process.env.ADMIN_PW, 10);
      const result = await adminRepo.registerAdmin({
        email: process.env.ADMIN_EMAIL,
        password: encrypted_pw,
        
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

    adminLogin: async (email, password) => {
        try {
          const Admin = await adminRepo.getAdminByEmail(email);
          if (!Admin[0]) {
            return {
              status: false,
              message: " admin data not found!",
            };
          }
          // checking password
          const passwordMatch = await bcrypt.compare(
            password,
            Admin[0].password
          );

          if (!passwordMatch) {
            return {
              status: false,
              message: "Incorrect password!",
            };
          } else {
            if(Admin[0]) {
              const token = jwt.sign(
                { AdminId: Admin[0].id },
                process.env.SECRET,
                { expiresIn: 259200 }
              )
          
            return {
              status: true,
              message: "Login Successfully!",
              token: token
            };
          }else{
            return {
              status: false,
              message: 'Token generate error',
              }
          }
          }
        } catch (error) {
          throw error;
        }
      },

      changeAdminPassword: async (AdminId, oldPassword, newPassword) => {
        try {
          // get super admin
          const Admin = await adminRepo.getAdminById(AdminId);
          if (!Admin[0]) {
            return {
              status: false,
              message: " admin not found!",
            };
          }
          // checking current password
          const passwordMatch = await bcrypt.compare(
            oldPassword,
            Admin[0].password
          );
          if (!passwordMatch) {
            return {
              status: false,
              message: "Incorrect old password!",
            };
          }
          // hash new password using bcrypt algorithm
          const newPasswordHash = await bcrypt.hash(newPassword, 10);
          console.log(newPassword);
          const result = await adminRepo.changeAdminPassword(
            AdminId,
            newPasswordHash
          );
          if (!result) {
            return {
              status: false,
              message: "Password update failed!",
            };
          } else {
            return {
              status: true,
              message: "Password updated successfully!",
            };
          }
        } catch (error) {
          throw error;
        }
      },
      
     getAdmin :async()=> {
        try {
          const result = await adminRepo.getAdmin();
          return result;
        } catch (error) {
          throw error;
        }
      }
,
updateUser: async (userId, email, firstName, lastName) => {

  console.log(userId, email, firstName, lastName);
  try {
    const exUser = await userRepo.getUserById(userId);
    if (!exUser) {
      return {
        status: false,
        message: "User not found",
      };
    }
      
    const result = await adminRepo.updateUser(userId, email, firstName, lastName);
      const updatedUser = await userRepo.getUserById(userId);
      return {
        status: true,
        message: "User updated successfully",
        updatedUser,
      };
   
    
  } catch (error) {
    throw error;
  }
},
}

export default adminService;
