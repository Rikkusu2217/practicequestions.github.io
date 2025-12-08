# 💕 How Well Do You Know Me? Quiz

An interactive quiz website to share with your crush and collect her responses online!

## 🎯 Features

✨ **Interactive Quiz** - 6 questions about favorites, hobbies, and fun facts
📊 **Real-time Dashboard** - View all responses as they come in
💾 **Cloud Storage** - Responses saved to Firebase (free tier)
📥 **CSV Export** - Download all responses as a CSV file
🎨 **Beautiful UI** - Modern gradient design with smooth animations

---

## 🚀 Quick Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Enter a project name (e.g., "crush-quiz")
4. Click **"Create project"** (accept default settings)

### Step 2: Get Your Firebase Config

1. In Firebase Console, click the **gear icon** → **Project Settings**
2. Scroll down to "Your apps" and click the `</>` icon (if it doesn't exist, click "Add app")
3. Copy the config object (it looks like this):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};
```

### Step 3: Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create Database"**
3. Choose **"Start in test mode"** (for simplicity)
4. Click **"Create"**

### Step 4: Update Your Project

Replace the placeholder values in both files:

**`firebase-config.js`:**
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

**`dashboard.html`:**
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

---

## 📦 File Structure

```
.
├── index.html           # Main quiz page
├── dashboard.html       # Your private dashboard to view responses
├── style.css            # Styling
├── script.js            # Quiz logic & Firebase integration
├── firebase-config.js   # Firebase configuration
└── README.md            # This file
```

---

## 🌐 Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `your-username.github.io` OR any name you like
3. Make it **public**

### Step 2: Upload Your Files

1. Clone the repository locally
2. Copy these files into it:
   - `index.html`
   - `style.css`
   - `script.js`
   - `firebase-config.js`
   - `dashboard.html`

3. Push to GitHub:
```bash
git add .
git commit -m "Add crush quiz website"
git push
```

### Step 3: Share the Quiz Link

Your quiz will be available at:
- **Quiz:** `https://yourusername.github.io/quiz` or `https://yourusername.github.io`
- **Dashboard:** `https://yourusername.github.io/dashboard.html`

---

## 💬 How It Works

1. **She takes the quiz** - She accesses the quiz link and answers 6 questions
2. **Responses saved** - Her answers are saved to Firebase (cloud database)
3. **You see responses** - Open the dashboard link to view all responses in real-time
4. **Export data** - Click "Export as CSV" to download all responses

---

## 🔐 Firebase Security Note

In production, you should use **Firestore Security Rules** instead of "test mode":

1. Go to **Build** → **Firestore Database** → **Rules**
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quiz_responses/{document=**} {
      allow create: if true;
      allow read: if request.ip == 'YOUR_IP_ADDRESS';
    }
  }
}
```

Or keep test mode (expires in 30 days).

---

## ❓ Customizing Questions

Edit the `quizData` array in `script.js`:

```javascript
const quizData = [
    { question: "Your custom question here?" },
    // Add more questions...
];
```

---

## 🎨 Customizing Design

Edit `style.css` to change colors, fonts, etc.

The main gradient is in the `body` selector:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

---

## 📊 Viewing Responses

### On the Dashboard:
- See total number of responses
- View all answers with timestamps
- Export to CSV for analysis

### In Firebase Console:
1. Go to **Build** → **Firestore Database**
2. Navigate to **quiz_responses** collection
3. View all documents

---

## 🐛 Troubleshooting

**Q: I see "Firebase not configured" error**
- A: Update `firebase-config.js` with your actual Firebase credentials

**Q: Responses aren't showing up**
- A: Make sure Firestore Database is enabled and in test mode
- Check browser console (F12) for errors

**Q: Dashboard is blank**
- A: Make sure you're using the same Firebase config in both `firebase-config.js` and `dashboard.html`

---

## 💡 Tips

✅ Customize the 6 questions before sharing the link  
✅ Keep the Firebase config secret (but GitHub public repos can see it - use environment variables in production)  
✅ Share the quiz link, not the dashboard link  
✅ Check the dashboard daily for new responses!  

---

## 📝 License

Feel free to use and modify this for your own purposes!

Good luck! 💕

---

**Need help?** Check the Firebase Console or browser console (F12) for error messages.
