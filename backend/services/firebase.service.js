import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import firebaseApp from '../config/firebase.config.js';
const storage = getStorage(firebaseApp);

export const uploadFileToStorage = async (file, folder) => {
  try {
    const dateTime = new Date();
    const storageRef = ref(storage,`${folder}/${dateTime + " "+file.originalname }`);
    await uploadBytes(storageRef, file.buffer);
    const downloadUrl = await getDownloadURL(storageRef);
    console.log(downloadUrl);
    return {
      status: true,
      message: `${folder.slice(0, -1)} uploaded successfully`,
      data: downloadUrl,
    };
  } catch (error) {
    return {
      status: false,
      message: error,
      data: "error regarding downloadUrl",
    };
  }
};

export const deleteFileInStorage = async (existingFileUrl) => {
  try {
    const existingFileRef = ref(storage, existingFileUrl);
    await deleteObject(existingFileRef);
    return { status: true, message: "file deleted successfully" };
  } catch (error) {
    return { status: false, message: error };
  }
};
