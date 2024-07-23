import analyzeText from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    let forbiddenWords = [];
    let warningWords = [];
    const inputText = document.getElementById('inputText');
    const hiddenText = document.getElementById('hiddenText');
    const analyzeButton = document.getElementById('analyzeButton');
    const resultDiv = document.getElementById('result');

    function updatePlaceholder() {
        if (inputText.innerText.trim() === '') {
            inputText.classList.remove('not-empty');
        } else {
            inputText.classList.add('not-empty');
        }
    }
    inputText.addEventListener('input', () => {
        let text = inputText.innerText;

        // Highlight forbidden words
        forbiddenWords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            text = text.replace(regex, '<span class="highlight">$1</span>');
        });

        // Highlight warning words
        warningWords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            text = text.replace(regex, '<span class="warning">$1</span>');
        });

        hiddenText.innerHTML = text;
        updatePlaceholder();
    });

    analyzeButton.addEventListener('click', async () => {
        const text = inputText.innerText;
        resultDiv.innerText = 'Analyzing...';

        const result = await analyzeText(text)
        .then(result => console.log(result))
        .catch(error => console.error(error));
        resultDiv.innerHTML = `
                <p>Forbidden Words: ${forbiddenWords.join(', ')}</p>
                <p>Warning Words: ${warningWords.join(', ')}</p>
            `;
        forbiddenWords = result.forbiddenWords || [];
        warningWords = result.warningWords || [];

        let highlightedText = text;

        // Highlight forbidden words
        forbiddenWords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
        });

        // Highlight warning words
        warningWords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<span class="warning">$1</span>');
        });

        hiddenText.innerHTML = highlightedText;
        updatePlaceholder();
    });

    inputText.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // Prevent newline on Enter
        }
    });

    // Initialize placeholder
    updatePlaceholder();
});
