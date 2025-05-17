// Quotes array is fetched from a JSON file
let quotes = [];

// This function selects a random author and then a random quote from that author's quotes array
// An object is returned containing the author, quote, image, and history
const getRandomQuote = () => {
    const randomIndex = quotes[Math.floor(Math.random() * quotes.length)]; 
    const quoteList = randomIndex.quotes.quote;
    const quote = quoteList[Math.floor(Math.random() * quoteList.length)];

    return {
        author: randomIndex.author,
        quote: quote,
        image: randomIndex.image,
        history: randomIndex.history[0],
    };
};

// displayQuote() selects a random quote calling getRandomQuote and updates the HTML elements with the quote, author, image, and history
const displayQuote = () => {
    const random = getRandomQuote();
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    const imageElement = document.getElementById("image");
    const historyElement = document.getElementById("history");

    quoteElement.textContent = `"${random.quote}"`;
    authorElement.textContent = `- ${random.author}`;
    historyElement.innerHTML = random.history;

    imageElement.classList.remove("animated");
    imageElement.style.opacity = 0; 
    imageElement.src = random.image; 
    imageElement.alt = `${random.author}'s portrait`;
    
    // Trigger reflow to restart the CSS animation
    imageElement.onload = () => {
        void imageElement.offsetWidth;
        imageElement.classList.add("animated");
        imageElement.style.opacity = 1; 
    };
};

// Fetches the quotes data from the JSON file and handles any errors
const fetchQuotes = async () => {
    try {
        const response = await fetch("quotes.json"); 
        quotes = await response.json(); 
        displayQuote();
    } catch(error) {
        console.error("Failed to fetch quotes:", error); 
    }
};


// This function hides the intro section and displays the quote container when the button is clicked
// It also calls the displayQuote function to show a random quote when the intro is hidden
document.getElementById("generate-quote").addEventListener("click", () => { 
    if (quotes.length === 0) return; 
        displayQuote(); 

        const introSection = document.querySelector(".intro"); 
        if (introSection) {
            introSection.classList.add("fade-out"); 
            setTimeout(() => {
                introSection.style.display = "none"; 
            }, 500);
        }
        document.getElementById("quote-container").style.display = "block"; 
        
});

// This function is called when someone likes a quote and wants to save it
const saveQuote = () => {
    const quote = document.getElementById("quote").textContent;
    const author = document.getElementById("author").textContent;
    const savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || []; 
    
    const exists = savedQuotes.some(item => item.quote === quote && item.author === author);
    if (exists) {
        alert("Quote already saved!");
        return;
    }

    savedQuotes.push({ quote, author }); 
    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes)); 
    alert("Quote saved!"); 
};

document.getElementById("like-button").addEventListener("click", saveQuote); 
document.getElementById("like-button").textContent = "🖤";
document.getElementById("like-button").classList.add("like-button");

fetchQuotes();