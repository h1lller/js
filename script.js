import 'regenerator-runtime/runtime'
// dom elements
const domQuote = document.querySelector('.js-q');
const domAuthor = document.querySelector('.js-au');
const domNew = document.querySelector('.js-new');
const domTw = document.querySelector('.js-tw');
const domCo = document.querySelector('#js-co');

let apiQueries = []
let Url = ''
let loading = true

function fillQuoteText({text, author}) {
    domQuote.textContent = text
    domAuthor.textContent = author ? author : `Invisible rabbit`;
    loading = false;
    setTimeout(toggleLoader, Math.random() * Math.floor(apiQueries.length));
}

function getRandomQuoteFromQueries() {
    const quote = apiQueries[Math.floor(Math.random() * Math.floor(apiQueries.length))];
    Url = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
    loading = true;
    toggleLoader();
    fillQuoteText(quote);
}

function sendToTwitter() {
    window.open(Url, '_blank');
}

async function getQueries() {
    const url = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(url);
        apiQueries = await response.json();
        getRandomQuoteFromQueries(apiQueries);
    } catch (e) {
        console.log(e)
    }
}

function toggleLoader() {
    loading ? domCo.classList.add('is-loading') : domCo.classList.remove('is-loading');
}

getQueries();
domNew.addEventListener('click', getRandomQuoteFromQueries)
domTw.addEventListener('click', sendToTwitter)