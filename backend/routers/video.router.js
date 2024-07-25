import express from "express";
const router = express.Router();

import upload from "../config/configMulter.js";
import videoController from "../controllers/video.controller.js";

router.post('/addVideo',upload.fields([{ name: 'video', maxCount: 1 }]),  videoController.addVideo);
router.get('/getvideos', videoController.getAllVideos);
router.get('/getvideo/:id', videoController.getVideoById);
router.put('/updateVideo/:id', upload.fields([{ name: 'video', maxCount: 1 }]), videoController.updateVideoById);
router.delete('/deletevideo/:id', videoController.deleteVideoById);

export default router;