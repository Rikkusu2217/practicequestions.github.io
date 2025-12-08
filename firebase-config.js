// Firebase Configuration
// Get your Firebase config from: https://console.firebase.google.com/

// ============================================
// SETUP INSTRUCTIONS:
// ============================================
// 1. Go to https://firebase.google.com
// 2. Click "Get Started" and create a new project
// 3. Enable Firestore Database (Start in test mode)
// 4. Copy your config below
// 5. Replace the placeholder values

const firebaseConfig = {
  apiKey: "AIzaSyCf2R7Cu0v6HUGcq2qqKzSGljnzpJYFEaU",
  authDomain: "personal-quiz-f6614.firebaseapp.com",
  projectId: "personal-quiz-f6614",
  storageBucket: "personal-quiz-f6614.firebasestorage.app",
  messagingSenderId: "837086937066",
  appId: "1:837086937066:web:c740304d57e7c2c6f3fc93",
  measurementId: "G-CXS3Q69PK2"
};

// Initialize Firebase
async function initializeFirebase() {
    try {
        const firebaseApp = await import("https://www.gstatic.com/firebaselibs/10.7.0/firebase-app.js");
        const firebaseFirestore = await import("https://www.gstatic.com/firebaselibs/10.7.0/firebase-firestore.js");
        
        const app = firebaseApp.initializeApp(firebaseConfig);
        window.db = firebaseFirestore.getFirestore(app);
        window.addDoc = firebaseFirestore.addDoc;
        window.collection = firebaseFirestore.collection;
        
        console.log("✅ Firebase initialized successfully!");
    } catch (error) {
        console.error("⚠️ Firebase initialization error:", error);
        console.log("Continuing without Firebase - responses will be saved locally only");
    }
}

// Initialize Firebase on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFirebase);
} else {
    initializeFirebase();
}
