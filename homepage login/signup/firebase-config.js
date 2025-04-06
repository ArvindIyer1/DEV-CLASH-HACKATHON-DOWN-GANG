// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAV6soNboQLX37Bw1bBUuEykRcjSVfx8f0",
  authDomain: "finmate-331bd.firebaseapp.com",
  projectId: "finmate-331bd",
  storageBucket: "finmate-331bd.appspot.com",
  messagingSenderId: "778475988314",
  appId: "1:778475988314:web:784b58228abded5a493f63",
  measurementId: "G-L5N1TKPVTF"
};

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export Firebase services
export { app, auth };