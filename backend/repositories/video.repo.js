import { Video } from "../models/videomodel.js";

const videoRepo ={

    addVideo: async (values) => {
       
        try {
            const result = await Video.create({
                title: values.title,
                description: values.description,
                video_url: values.video_url,
                status: values.status
            });
            return result;
        } catch (error) {
            throw error;
        }
    },
    getAllVideos : async () => {
        try {
            const result = await Video.findAll({
              attributes: ['id', 'title', 'description', 'status', 'video_url'],
           
            order: [["createdAt", "DESC"]],
            });
            return result;
        } catch (err) {
            throw err;
        }
      },

      getVideoById : async (id) => {
        try {
          const result = await Video.findOne({
            where: {
              id: id,
            },
            attributes: ['id', 'title', 'description','status', 'video_url'],
          
          });
          return result;
        } catch (err) {
          throw err;
        }
      },
     getExVideoById : async (id) => {
        try {
          const result = await Video.findOne({
            where: {
              id: id,
            },
          });
          return result;
        } catch (err) {
          throw err;
        }
      },

      deleteVideoById : async (id) => {
        try {
          const result = await Video.destroy({
            where: {
              id: id,
            },
          });
          return result;
        } catch (err) {
          throw err;
        }
      },

      updateVideoStatusByID : async (status, id) => {
        try {
          const result = await Video.update(
            {
              status: status,
            },
            {
              where: {
                id: id,
              },
            }
          );
          return result;
        } catch (err) {
          throw err;
        }
      },

      updateVideoById : async (values) => {
        try {
          const result = await Video.update(
            {
              title: values.title,
              description: values.description,
              status: values.status,
              video_url: values.video_url,
             
            },
            {
              where: {
                id: values.id,
              },
            }
          );
          return result;
        } catch (err) {
          throw err;
        }
      },
}

export default videoRepo;
