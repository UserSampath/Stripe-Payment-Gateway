import * as dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export default firebaseApp;
export { storage };