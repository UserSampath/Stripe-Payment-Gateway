import adminService from "../services/admin.services.js";
import userService from "../services/user.services.js";

const adminController = {

  adminLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await adminService.adminLogin(email, password);
      if (!result.status) {
        // If status is false, return status 400 with the error message
        res.status(400).json({ response_code: 400, error: result.message, });
      } else {
        // If status is true, return status 200 with the success message and token
        res.status(200).json({ response_code: 200, result });
      }
    } catch (error) {
      res.status(500).json({ response_code: 500,
        error: "Error occurred!",error });
    }
  },


  registerAdmin: async (req, res) => {
    try {
      const result = await adminService.registerAdmin();
      if (!result) {
        res.status(400).json({ response_code: 400, error: result.message });
      } else {
        // If status is true, return status 200 with the success message and token
        res.status(200).json({ response_code: 200,success: true, message: "Admin registered successfully"  });
      }
    } catch (error) {
      res.status(500).json({  
        response_code: 500,
        success: false, message: error.message });
    }
  },

  changeAdminPassword: async (req, res) => {
    const AdminId = req.params.id;
    const { oldPassword, newPassword } = req.body;
    try {
      const result = await adminService.changeAdminPassword(
        AdminId,
        oldPassword,
        newPassword
      );

      if (result.status=== false) {
        // If status is false, return status 400 with the error message
        res.status(400).json({ response_code: 400, error: result.message });
      } else {
        res.status(200).json({ response_code: 200, result,success: true, message: "Admin password updated"  });
      }    } catch (error) {
      res.status(500).json({ response_code: 500 ,error: "Error occurred!" });
    }
  },

getAdmin : async(req, res, next) =>{
    try {
      const adminData = await adminService.getAdmin();
      const simplifiedAdminData = adminData.map(admin => ({
        id: admin.id,
        email: admin.email,
      }));
      res.json(simplifiedAdminData);
    } catch (error) {
      next(error);
    }
  },


  ChangePasswordWithEmail: async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        // Check if userId or email is missing
        if ( !email) {
            return res.status(400).json({
                response_code: 400,
                success: false,
                error: 'Bad Request',
                message: ' email is missing.'
            });
        }

    

        // Check if the user exists by email
        const userByEmail = await userService.getUserByEmail(email);
        if (!userByEmail) {
            return res.status(404).json({
                response_code: 404,
                success: false,
                error: 'Not Found',
                message: 'User not found with the provided email.'
            });
        }

        const userId=userByEmail.id
        // Update the user's password
        const result = await userService.ForgetPassword(userId, newPassword);

        if (result.status) {
            // Password changed successfully
            return res.status(200).json({
                response_code: 200,
                success: true,
                message: 'Password changed successfully.'
            });
        } else {
            // Failed to update password
            return res.status(400).json({
                response_code: 400,
                success: false,
                message: 'Failed to update password.'
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            response_code: 500,
            error: 'Internal Server Error'
        });
    }
},

updateUser: async (req, res) => {
  const userId = req.params.id
  const {  email, firstName, lastName  } = req.body;

  try {
    const updatedUser = await adminService.updateUser( userId,email, firstName, lastName);
    if (updatedUser.status) {
      return res.status(200).json({
        response_code: 200,
        success: true,
        message: 'User updated successfully',
        updatedUser: updatedUser.updatedUser
      });
    } else {
      return res.status(400).json({
        response_code: 400,
        status: false,
        message: updatedUser.message || "User not found or not updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      response_code: 500,
      status: false,
      message: "Internal Server Error",
      error: error.message 
    });
  }
},

};

export default adminController;
