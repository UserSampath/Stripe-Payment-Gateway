import userService from "../services/user.services.js";
import axios from 'axios';

const userController = {

  
  
   registerUser : async (req, res) => {
    try {
      const ZIP_CODE_API_URL = 'https://api.zip-codes.com/ZipCodesAPI.svc/1.0/GetAllZipCodes?state=FL&country=US&key=DEMOAPIKEY';
      const UTILITY_API_URL = 'https://api.openei.org/utility_rates?version=latest&format=json&api_key=BjWtcYAkhbHKp2b8ZBHxZyh8thLbd4Ztc70PQeVL&address=';
      const { email, password, firstName, lastName, zipCode } = req.body;

      let zipResponse;
      try {
        zipResponse = await axios.get(ZIP_CODE_API_URL);
        const zipCodes = zipResponse.data;
    
        const isValidZipCode = zipCodes.includes(zipCode);
        console.log(isValidZipCode,'ZIP code is valid.');

      } catch (error) {
          return res.status(400).json({
              response_code: 400,
              success: false,
              message: 'Invalid ZIP code.'
          });
      }


    

      const utility = 1;

      // Call userService to handle the user registration logic
      const result = await userService.registerUser(email, password, firstName, lastName);

      if (result.status) {
          // Registration is successful
          res.status(200).json({
              response_code: 200,
              success: true,
              message: result.message,
              user: { userId: result.userId, firstName, lastName, email },
              token: result.token
          });
      } else {
          // There was an error during registration
          res.status(400).json({
              response_code: 400,
              success: false,
              message: result.message
          });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({
          response_code: 500,
          error: error.message,
          success: false,
          message: 'Error occurred while registering user'
      });
  }
},

  userLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await userService.userLogin(email, password);
      console.log(result);
      if (result.status) {
        // Status is true, so registration is successful
        res.status(200).json({
            response_code: 200,
            success: true,
            message: result.message,
            token: result.token,
            userId : result.user.id, 
            firstName:result.user.firstName,
            lastName:result.user.lastName
        });
    } else {
        // Status is false, there is an error
        res.status(400).json({
            response_code: 400,
            success: false,
            message: result.message
        });
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        error: 'Error occurred'
      });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const isUserDelete = await userService.deleteUserById(userId);

      if (isUserDelete) {
        res.status(200).json({
          response_code: 200,
          success: true, message: 'User deleted successfully'
        });
      } else {
        res.status(404).json({
          response_code: 404,
          success: false, message: 'User not found'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        success: false, message: 'Error occurred while deleting user'
      });

    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ response_code: 404, success: false, message: 'User not found' });
        return;
      }
      res.status(200).json({
        response_code: 200,
        success: true, user
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        success: false, message: 'Error occurred while fetching user'
      });
    }
  },

  sendInviteEmail: async (req, res) => {
    const { email } = req.body;
    const message = "Download our app from the Play Store: [Play Store link]";
    try {
      await userService.sendInviteEmail(email, message);
  
        res.status(200).json({
          response_code: 200,
          success: true,
          message: 'Email sent successfully.',
        });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        error: 'Internal Server Error',
      });
    }
  },

  changeUserPassword: async (req, res) => {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;
    try {
      const result = await userService.changeUserPassword(
        userId,
        oldPassword,
        newPassword
      );
      res.status(200).json({
        response_code: 200,
        result
      });
    } catch (error) {
      res.status(500).json({
        response_code: 500,
        error: "Error occurred!"
      });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { email, firstName, lastName } = req.body;

    try {
      const result = await userService.updateUser(userId, email, firstName, lastName);
      if (result) {
        res.status(200).json({
          response_code: 200,
          result
        })
      } else {
        res.status(400).json({
          response_code: 400,
          result
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message
      })
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
  sendOTP: async (req, res) => {
    const { email } = req.body;
    try {
      await userService.generateAndSendOTP(email);
      res.status(200).json({
        response_code: 200,
        success: true, message: 'OTP sent successfully.'
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        error: 'Internal Server Error'
      });
    }
  },
  checkOTPValidity: async (req, res) => {
    const { enteredOTP ,email} = req.body;
    try {
      // Call userService to validate the entered OTP
      const isOTPValid = await userService.validateOTP(email, enteredOTP);

      if (isOTPValid.status) {
        // OTP is valid
        res.status(200).json({
          response_code: 200,
          success: true,
          message: isOTPValid.message
        });
      } else {
        // OTP is invalid
        res.status(400).json({
          response_code: 400,
          success: false,
          message: isOTPValid.message
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        success: false,
        message: 'Internal Server Error'
      });
    }
  },


}

export default userController;