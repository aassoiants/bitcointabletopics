let questions = []; // This will store our questions from GitHub

// Fetch questions from GitHub when the page loads
fetch('https://api.github.com/repos/aassoiants/bitcointabletopics/contents/data/questions.json')
    .then(response => response.json())
    .then(data => {
        // Decode the content from base64
        const content = atob(data.content);
        questions = JSON.parse(content);
        populateDropdown();
    });

function populateDropdown() {
    const dropdown = document.getElementById('questionType');
    const types = [...new Set(questions.map(q => q.type))];
    
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        dropdown.appendChild(option);
    });
}

function generateQuestion() {
    const selectedType = document.getElementById('questionType').value;
    let question;

    if (selectedType === 'random') {
        question = questions[Math.floor(Math.random() * questions.length)];
    } else {
        const filteredQuestions = questions.filter(q => q.type === selectedType);
        question = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    }

    document.getElementById('questionDisplay').textContent = question.text;
}
