import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyChRepM2klxmD4yP01rlXPQF2_37OmMoVE",
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
