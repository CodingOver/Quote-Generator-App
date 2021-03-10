const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
// Get Quote From API 
async function getQuote() {
    const apiUrl = 'https://api.quotable.io/random';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // If Author is not defined in the api, add 'Unknown'
        if (data.author === '') {
            authorText.textContent = 'Unknown';
        } else {
            authorText.textContent = `"${data.author}"`;
        }
        // Reduce font size for long quotes
        if (data.content.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.textContent = data.content;
    } catch (error) {
        console.log('Whoops, no quote', error);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');  
}

// Event Listners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


