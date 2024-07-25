import bcrypt from "bcrypt";
import { Admin } from "../models/adminmodel.js";
import sequelize from "../config/db.connection.js";

import { User } from "../models/usermodel.js";

const adminRepo = {


  registerAdmin: async () => {
    try {
      const encrypted_pw = await bcrypt.hash(process.env.ADMIN_PW, 10);
      await sequelize.sync();
      const result = await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: encrypted_pw,
      });
      return !!result;
    } catch (error) {
      throw error;
    }
  },

  getAdmin: async () => {
    try {
      const result = await Admin.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAdminById: async (AdminId) => {
    try {
      const result = await Admin.findAll({
        where: {
          id: AdminId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getAdminByEmail: async (email) => {
    try {
      const result = await Admin.findAll({
        where: {
          email: email,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  changeAdminPassword: async (AdminId, newPasswordHash) => {
    try {
      await sequelize.sync();
      const result = await Admin.update(
        {
          password: newPasswordHash,
        },
        {
          where: {
            id: AdminId,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userId, email, firstName, lastName) => {
    try {
      const result = await User.update({
        email: email,
        firstName: firstName,
        lastName: lastName,
      },{
        where: {
          id: userId,
        },
      });
      return {
        status: true,
        message: "User updated successfully",
      };
    } catch (error) {
      throw error;
    }
  },

}

export default adminRepo;
