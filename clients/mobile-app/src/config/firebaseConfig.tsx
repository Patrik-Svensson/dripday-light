// Import necessary Firebase modules and AsyncStorage
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBRH5hLd3qxvbCeOFuG1sp1V3hhe0CwzUs",
  authDomain: "fashion-inspiration-app.firebaseapp.com",
  projectId: "fashion-inspiration-app",
  storageBucket: "fashion-inspiration-app.appspot.com",
  messagingSenderId: "1084936199516",
  appId: "1:1084936199516:web:b2da00887745e10dbef599",
  measurementId: "G-9DEH4J9ERP",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export Firebase app and auth instances
export { app, auth };
