const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide loading 
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    } 
}
// Get Quote From API 
async function getQuote() {
    loading();
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
        // Stop Loader, Show Quote
        complete();
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

getQuote();