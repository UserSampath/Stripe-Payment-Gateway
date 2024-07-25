import videoService from "../services/video.service.js";

const videoController = {
     addVideo : async (req, res) => {
        try {
          if ( !req.body.title || !req.body.description || !req.body.status) {
            return res
              .status(400)
              .json({response_code: 400, status: false, error: "Required fields are missing in the request body",  });
          }
      
          const { title, description, status } = req.body;
          const video = req.files["video"] ? req.files["video"][0] : undefined;
          const result = await videoService.addVideo(title, description, status, video);
      
          if (result.status) {
            res.status(200).json({response_code: 200,status: true, message: result.message, result:result.data });
          } else {
            res.status(400).json({response_code: 400,status: false, message: result.message,  });
          }
        } catch (error) {
          res.status(500).json({response_code: 500, status: false, error: "Internal Server Error",  });
        }
      },
      getAllVideos : async (req, res) => {
        try {
          const result = await videoService.getAllVideos();
          if (result.status) {
            res.status(200).json({
              response_code: 200,
              status: result.status,
              message: result.message,
              result: result.data
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
      },

     getVideoById : async (req, res) => {
        try {
          const id = req.params.id;
          const result = await videoService.getVideoById(id);
          if (result.status) {
            res.status(200).json({
              response_code: 200,
              status: result.status,
              message: result.message,
              result: result.data
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
      },

     deleteVideoById : async (req, res) => {
        if (!req.params.id) {
          return res
            .status(400)
            .json({response_code: 400, error: "video id is missing in the request parameter", status: false });
        }
        const id = req.params.id;
        try {
          const result = await videoService.deleteVideoById(id);
          if (result.status) {
            res.status(200).json({response_code: 200, status: true, message: result.message,  });
          } else {
            res.status(400).json({ response_code: 400, status: false, message: result.message });
          }
        } catch (error) {
          return res.status(400).json({response_code: 400, status: false, message: error.message });
        }
      },


      updateVideoById : async (req, res) => {
        try {
          if (!req.params.id) {
            return res
            .status(400)
            .json({response_code: 400,status: false , error: "video id is missing in the request parameter", });
          }
          const id = req.params.id;    
          if (!req.body.title || !req.body.description ) {
            return res
              .status(400)
              .json({response_code: 400, status: false, error: "Required fields are missing in the request body",});
          }
      
          const { title, description, status } = req.body;
          const video = req.files["video"] ? req.files["video"][0] : undefined;
          const result = await videoService.updateVideoById(title, description, status, video, id);
      
          if (result.status) {
            res.status(200).json({response_code: 200, status: true, message: result.message, result:result.data });
          } else {
            res.status(400).json({response_code: 400, status: false ,  message: result.message,});
          }
        } catch (error) {
          res.status(500).json({ response_code: 500,status: false , error: "Internal Server Error", });
        }
      },
}

export default videoController;