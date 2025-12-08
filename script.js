// Firebase initialization (will be available from firebase-config.js)
let db = null;

// Quiz data - Users will provide their own answers
const quizData = [
    {
        question: "What's your favorite color?"
    },
    {
        question: "What's your favorite food or meal?"
    },
    {
        question: "What's your favorite drink?"
    },
    {
        question: "What kind of places do you like to hang out at (mall, park, café, etc.)?"
    },
    {
        question: "What's your favorite type of music?"
    },
    {
        question: "What's your favorite thing to do on weekends?"
    },
    {
        question: "Do you prefer staying in or going out?"
    },
    {
        question: "What's your ideal type of date — chill, fun, or adventurous?"
    },
    {
        question: "What activities do you enjoy (movies, bowling, walking, etc.)?"
    },
    {
        question: "What's something you've always wanted to try on a date?"
    }
];

// Quiz state
let currentQuestion = 0;
let userAnswers = [];
let quizStarted = false;
let allResponses = JSON.parse(localStorage.getItem('quizResponses')) || [];

// Start the quiz
function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    userAnswers = [];
    
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('quizScreen').classList.add('active');
    
    loadQuestion();
    focusInput();
}

// Load current question
function loadQuestion() {
    const question = quizData[currentQuestion];
    const totalQuestions = quizData.length;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Update question number
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    
    // Display question
    document.getElementById('questionText').textContent = question.question;
    
    // Clear and focus input
    const answerInput = document.getElementById('answerInput');
    answerInput.value = userAnswers[currentQuestion] || '';
    focusInput();
}

// Focus on the input field
function focusInput() {
    setTimeout(() => {
        document.getElementById('answerInput').focus();
    }, 100);
}

// Go to next question or finish quiz
function nextQuestion() {
    const answerInput = document.getElementById('answerInput');
    const answer = answerInput.value.trim();
    
    if (!answer) {
        alert('Please provide an answer before continuing!');
        return;
    }
    
    // Store answer
    userAnswers[currentQuestion] = answer;
    
    // Move to next question
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        // Quiz finished - save and show results
        saveResponse();
        showResults();
    }
}

// Allow Enter key to go to next question
document.addEventListener('DOMContentLoaded', function() {
    const answerInput = document.getElementById('answerInput');
    if (answerInput) {
        answerInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                nextQuestion();
            }
        });
    }
});

// Save response to localStorage only
async function saveResponse() {
    const response = {
        timestamp: new Date().toLocaleString(),
        answers: [...userAnswers]
    };
    
    // Save to localStorage
    allResponses.push(response);
    localStorage.setItem('quizResponses', JSON.stringify(allResponses));
    console.log("✅ Response saved locally!");
}

// Show results
function showResults() {
    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');
    
    // Display user's responses
    displayResults();
}

// Display detailed results
function displayResults() {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <strong>${index + 1}. ${question.question}</strong>
            <span>${userAnswer}</span>
        `;
        
        resultsList.appendChild(resultItem);
    });
}

// Download CSV file
function downloadCSV() {
    // Create CSV content
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    // Add header
    const headers = ['Timestamp', ...quizData.map((q, i) => `Question ${i + 1}: ${q.question}`)];
    csvContent += headers.map(h => `"${h}"`).join(',') + '\n';
    
    // Add all responses
    allResponses.forEach(response => {
        const row = [
            response.timestamp,
            ...response.answers.map(answer => `"${answer}"`)
        ];
        csvContent += row.join(',') + '\n';
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `quiz_responses_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    document.body.removeChild(link);
    
    alert('✅ CSV file downloaded! You can now share it or save it.');
}

// Restart quiz
function restartQuiz() {
    document.getElementById('resultsScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
    
    // Show total responses collected
    const totalResponses = allResponses.length;
    if (totalResponses > 0) {
        const messageDiv = document.querySelector('#startScreen p');
        messageDiv.textContent = `Total responses collected: ${totalResponses} 📊\n\nLet's see how much you know about me...`;
    }
}
