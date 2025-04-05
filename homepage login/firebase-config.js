// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV6soNboQLX37Bw1bBUuEykRcjSVfx8f0",
  authDomain: "finmate-331bd.firebaseapp.com",
  projectId: "finmate-331bd",
  storageBucket: "finmate-331bd.firebasestorage.app",
  messagingSenderId: "778475988314",
  appId: "1:778475988314:web:784b58228abded5a493f63",
  measurementId: "G-L5N1TKPVTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth to use in other files
export { auth };
