import videoRepo from "../repositories/video.repo.js";
import * as fireBaseService from "../services/firebase.service.js";

const videoService ={

    addVideo: async (title, description, status, video) => {
        try {
            let video_url = null;
            let dataToCreate = { title, description, status };
            if (video) {
                video_url = await fireBaseService.uploadFileToStorage(video, "videos");
                if (!video_url.status) return { status: video_url.status, message: video_url.message, data: video_url.data };
                dataToCreate.video_url = video_url.data;
              }
              const result = await videoRepo.addVideo(dataToCreate);
              return {
                data: result,
                status: true,
                message: "Video added successfully",
          
              };
        } catch (error) {
            return { status: false, message: error };
        }
    },
     getAllVideos : async () => {
        try {
          const result = await videoRepo.getAllVideos();
          if (result.length > 0) {
            return {
              status: true,
              message: "get all videos successfully",
              data: result
            };
          } else {
            return {
              status: true,
              message: "No videos in database",
              data: result
            }
          }
        } catch (error) {
          console.error(error)
          return { status: false, message: error.message };
        }
      },
      deleteVideoById : async (id) => {
        try {
          const exVideo = await videoRepo.getExVideoById(id);
          if (!exVideo) {
            return {
              message: "Video doesn't exist",
              status: false,
            };
          }
      
          const exVideoLength = Object.keys(exVideo.dataValues).length;
          if (exVideoLength > 0) {
            // const exVideoUrl = exVideo.dataValues.video_url;
            // // Check if exVideoUrl is not null before attempting to delete
            // if (exVideoUrl) {
            //   const deleteExVideoUrl = await fireBaseService.deleteFileInStorage(exVideoUrl);
            //   if (!deleteExVideoUrl.status) {
            //     return { status: deleteExVideoUrl.status, message: deleteExVideoUrl.message };
            //   }
            // }
            const result = await videoRepo.deleteVideoById(id);
            if (result) {
              return { status: true, message: "video deleted Successfully", data: result };
            } else {
              return { status: false, message: "Error when deleting video" };
            }
          } else {
            return { status: false, message: "No video found with that id" };
          }
        } catch (error) {
          return { status: false, message: error.message };
        }
      },
       getVideoById : async (id) => {
        try {
          const result = await videoRepo.getVideoById(id);
          if (!result) {
            return {
              message: "Video doesn't exist",
              status: false,
            };
          }
      
          if (result.length == 0) {
            return { status: false, message: "No video in database!" };
          } else {
            return {
              status: true,
              message: "video gets successfully!",
              data: result,
            };
          }
        } catch (error) {
          console.error(error)
          return { status: false, message: error.message };
        }
      },

      updateVideoById : async (title, description, status, video, id) => {
        try {
          const exVideo = await videoRepo.getExVideoById(id);
          if (!exVideo) {
            return {
              message: "Video doesn't exist",
              status: false,
            };
          }
      
          const exVideoLength = Object.keys(exVideo.dataValues).length;
          if (!exVideoLength > 0) {
            return {
              results: exUser,
              message: "Video isn't exists",
              status: false,
            };
          }
      
          let video_url = null;
          
          let dataToUpdate = { id, title, description, status };
      
          const exVideoUrl = exVideo.dataValues.video_url;
          if (video) {
            // Delete existing video only if a new video is provided
      
            // if (exVideoUrl) {
            //   const deleteExVideoUrl = await fireBaseService.deleteFileInStorage(exVideoUrl);
            //   if (!deleteExVideoUrl.status) {
            //     return { status: deleteExVideoUrl.status, message: deleteExVideoUrl.message }
            //   }
            // }
      
            dataToUpdate.video_url = null;
      
            video_url = await fireBaseService.uploadFileToStorage(video, "artist_videos");
            if (!video_url.status) return { status: video_url.status, message: video_url.message, data: video_url.data };
            dataToUpdate.video_url = video_url.data;
          }
          else {
            dataToUpdate.video_url = exVideoUrl;
          }
      
      
      
          const result = await videoRepo.updateVideoById(dataToUpdate);
      
          // Fetch updated data after update
          const updatedData = await videoRepo.getExVideoById(id);
      
          return {
            status: true,
            message: "video updated successfully",
            data: updatedData,
          };
        } catch (error) {
          return { status: false, message: error.message };
        }
      },
}

export default videoService;