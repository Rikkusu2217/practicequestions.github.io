// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf2R7Cu0v6HUGcq2qqKzSGljnzpJYFEaU",
  projectId: "personal-quiz-f6614"
};

// Firebase REST API for Firestore
window.saveToFirebase = async function(responseDoc) {
    try {
        const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/quiz_responses`;
        
        const payload = {
            fields: {}
        };
        
        // Convert answers to Firestore format
        for (const [key, value] of Object.entries(responseDoc)) {
            if (key === 'submittedAt') {
                payload.fields[key] = { timestampValue: value };
            } else {
                payload.fields[key] = { stringValue: value };
            }
        }
        
        const response = await fetch(url + `?key=${firebaseConfig.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            console.log("✅ Response saved to Firebase successfully!");
            return true;
        } else {
            console.error("Firebase save error:", response.status);
            return false;
        }
    } catch (error) {
        console.error("Error saving to Firebase:", error);
        return false;
    }
}

// Load responses from Firebase
window.loadFromFirebase = async function() {
    try {
        const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/quiz_responses?key=${firebaseConfig.apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        const responses = [];
        if (data.documents) {
            data.documents.forEach(doc => {
                const response = {};
                const fields = doc.fields || {};
                
                for (const [key, value] of Object.entries(fields)) {
                    if (value.stringValue) {
                        response[key] = value.stringValue;
                    } else if (value.timestampValue) {
                        response[key] = value.timestampValue;
                    }
                }
                
                responses.push(response);
            });
        }
        
        console.log("✅ Loaded responses from Firebase");
        return responses;
    } catch (error) {
        console.error("Error loading from Firebase:", error);
        return [];
    }
}
