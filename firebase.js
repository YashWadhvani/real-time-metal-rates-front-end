import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { GOOGLE_FIREBASE_API } from "@env";

const firebaseConfig = {
  apiKey: `${GOOGLE_FIREBASE_API}`,
  authDomain: "real-time-metal-price.firebaseapp.com",
  projectId: "real-time-metal-price",
  storageBucket: "real-time-metal-price.appspot.com",
  messagingSenderId: "51560970768",
  appId: "1:51560970768:web:e1c12f341d123470e52895",
  measurementId: "G-G7R04C3MW3",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
export default app;
