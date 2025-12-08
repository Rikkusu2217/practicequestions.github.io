// Firebase Configuration
// Get your Firebase config from: https://console.firebase.google.com/

const firebaseConfig = {
  apiKey: "AIzaSyCf2R7Cu0v6HUGcq2qqKzSGljnzpJYFEaU",
  authDomain: "personal-quiz-f6614.firebaseapp.com",
  projectId: "personal-quiz-f6614",
  storageBucket: "personal-quiz-f6614.firebasestorage.app",
  messagingSenderId: "837086937066",
  appId: "1:837086937066:web:c740304d57e7c2c6f3fc93",
  measurementId: "G-CXS3Q69PK2"
};

// Load Firebase SDK from CDN
function loadFirebaseSDK() {
    return new Promise((resolve) => {
        // Load Firebase App
        const scriptApp = document.createElement('script');
        scriptApp.src = 'https://www.gstatic.com/firebaselibs/9.22.0/firebase-app-compat.js';
        
        // Load Firebase Firestore
        const scriptFirestore = document.createElement('script');
        scriptFirestore.src = 'https://www.gstatic.com/firebaselibs/9.22.0/firebase-firestore-compat.js';
        
        scriptApp.onload = () => {
            scriptFirestore.onload = () => {
                // Initialize Firebase
                firebase.initializeApp(firebaseConfig);
                window.db = firebase.firestore();
                console.log("✅ Firebase initialized successfully!");
                resolve();
            };
            document.head.appendChild(scriptFirestore);
        };
        
        scriptApp.onerror = () => {
            console.error("Failed to load Firebase App SDK");
            resolve();
        };
        
        document.head.appendChild(scriptApp);
    });
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFirebaseSDK);
} else {
    loadFirebaseSDK();
}
