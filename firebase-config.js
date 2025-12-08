// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf2R7Cu0v6HUGcq2qqKzSGljnzpJYFEaU",
  projectId: "personal-quiz-f6614"
};

// Simple REST API calls for Firestore (no SDK needed)
window.saveToFirebase = async function(responseDoc) {
    try {
        // Create a simple JSON document
        const docData = {
            fields: {
                timestamp: { stringValue: responseDoc.timestamp || new Date().toLocaleString() },
                submittedAt: { stringValue: responseDoc.submittedAt || new Date().toISOString() }
            }
        };
        
        // Add question responses
        for (let i = 1; i <= 6; i++) {
            const key = `question_${i}`;
            if (responseDoc[key]) {
                docData.fields[key] = { stringValue: responseDoc[key] };
            }
        }
        
        const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/quiz_responses?key=${firebaseConfig.apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(docData)
        });
        
        if (response.ok) {
            console.log("✅ Response saved to Firebase!");
            return true;
        } else {
            console.log("Response saved locally (Firebase API error)");
            return false;
        }
    } catch (error) {
        console.log("Response saved locally (no Firebase connection)");
        return false;
    }
};

// Load responses from Firebase
window.loadFromFirebase = async function() {
    try {
        const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/quiz_responses?key=${firebaseConfig.apiKey}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        const responses = [];
        
        if (data.documents) {
            data.documents.forEach(doc => {
                const fields = doc.fields || {};
                const resp = {};
                
                Object.keys(fields).forEach(key => {
                    resp[key] = fields[key].stringValue || '';
                });
                
                responses.push(resp);
            });
        }
        
        console.log("✅ Loaded responses from Firebase");
        return responses;
    } catch (error) {
        console.log("Could not load from Firebase");
        return [];
    }
};
