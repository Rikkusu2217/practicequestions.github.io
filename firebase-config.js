// Firebase REST API Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf2R7Cu0v6HUGcq2qqKzSGljnzpJYFEaU",
  projectId: "personal-quiz-f6614",
  databaseURL: "https://personal-quiz-f6614-default-rtdb.firebaseio.com"
};

// Save to Firebase Realtime Database (simpler than Firestore)
window.saveToFirebase = async function(answers) {
    try {
        const timestamp = new Date().toLocaleString();
        const data = {
            timestamp: timestamp,
            submittedAt: new Date().toISOString(),
            answers: answers
        };
        
        // Add to Firebase Realtime Database
        const url = `${firebaseConfig.databaseURL}/quiz_responses.json?auth=${firebaseConfig.apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            console.log("✅ Response saved to Firebase!");
            return true;
        } else {
            console.log("⚠️ Firebase save error - saving locally");
            return false;
        }
    } catch (error) {
        console.log("⚠️ Firebase connection error - saving locally");
        return false;
    }
};

// Load responses from Firebase
window.loadFromFirebase = async function() {
    try {
        const url = `${firebaseConfig.databaseURL}/quiz_responses.json?auth=${firebaseConfig.apiKey}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        const responses = [];
        
        if (data && typeof data === 'object') {
            Object.values(data).forEach(item => {
                if (item && item.timestamp) {
                    responses.push(item);
                }
            });
        }
        
        console.log("✅ Loaded " + responses.length + " responses from Firebase");
        return responses.reverse(); // Show newest first
    } catch (error) {
        console.log("⚠️ Could not load from Firebase:", error.message);
        return [];
    }
};
