/* const quotes = [
    { 
        author: "Epictetus",
        image: "https://philosophy.redzambala.com/sites/default/files/field/image/epictetus-2.jpg",
        history: [
            `<a href="https://en.wikipedia.org/wiki/Epictetus" target="blank">Epictetus</a> was a Greek Stoic philosopher who lived from 55 to 135 AD. He was born a slave in Phrygia, but later gained his freedom and became a prominent teacher of Stoicism. His teachings emphasized the importance of personal responsibility, self-discipline, and the power of the mind to shape one's experience of life. Epictetus believed that true happiness comes from within and that we should focus on what we can control rather than external circumstances.`
            
        ],
        quotes: {
            quote: ["It's not what happens to you, but how you react to it that matters.", 
                "You have power over your mind - not outside events. Realize this, and you will find strength.",
                "Wealth consists not in having great possessions, but in having few wants.",
                "No man is free, who is not master of himself.",
                "Don't explain your philosophy. Embody it.",
                "He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has."
            ]
        }
    },
    {
        author: "Marcus Aurelius",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/MSR-ra-61-b-1-DM.jpg/1200px-MSR-ra-61-b-1-DM.jpg",
        history: [
            `<a href="https://en.wikipedia.org/wiki/Marcus_Aurelius" target="blank">Marcus Aurelius</a> was a Roman Emperor from 161 to 180 AD and is best known for his philosophical work 'Meditations'. He was a Stoic philosopher who believed in the importance of rationality, self-discipline, and virtue. His writings reflect his thoughts on how to live a good life, the nature of the universe, and the importance of accepting what we cannot control. Marcus Aurelius is often regarded as one of the greatest Stoic philosophers and his teachings continue to inspire people today.`
        ],
        quotes: {
            quote: ["Waste no more time arguing about what a good man should be. Be one.",
                "The best revenge is to be unlike him who performed the injury.",
                "The obstacle is the way.",
                "You have power over your mind - not outside events. Realize this, and you will find strength.",
                "The happiness of your life depends upon the quality of your thoughts.",
                "The universe is change; our life is what our thoughts make it.",
                "It is not death that a man should fear, but he should fear never beginning to live.",
                "Very little is needed for a happy life; it is all within yourself, in your way of thinking.",
                "If it is not right, do not do it; if it is not true, do not say it.",
                "He who lives in harmony with himself lives in harmony with the universe.",
                "Death smiles at us all, but all a man can do is smile back.",
            ],
        }
    },
    {
        author: "Seneca",
        image: "https://www.thoughtco.com/thmb/3VcfBtb4lW69HIjEpaEhDLg23Xo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1048461504-4e7e718691924af9a07bbf4b2b81d72f.jpg",
        history: [
            `<a href="https://en.wikipedia.org/wiki/Seneca_the_Younger" target="blank">Lucius Annaeus Seneca</a> (4 - 65 AD) known as Seneca the Younger, was a Roman Stoic philosopher, statesman, and playwright who served as advisor to Emperor Nero. Renowned for his writings on ethics, reason, and self-discipline, Seneca became a key figure in shaping Roman Stoicism through works like Letters to Lucilius and On the Shortness of Life. Though entangled in imperial politics and eventually forced to commit suicide, his legacy endures through his philosophical insights on resilience, virtue, and the pursuit of a meaningful life—principles that continue to influence thinkers, writers, and modern Stoic practice today.`
        ],
        quotes: {
            quote: [
                "Difficulties strengthen the mind, as labor does the body.",
                "We suffer more often in imagination than in reality.",
                "It is not the man who has too little, but the man who craves more, that is poor.",
                "A gem cannot be polished without friction, nor a man perfected without trials.",
                "Luck is what happens when preparation meets opportunity",
                "True happiness is... to enjoy the present, without anxious dependence upon the future",
                "If one does not know to which port one is sailing, no wind is favorable",
                "It is a rough road that leads to the heights of greatness.",
                "The bravest sight in the world is to see a great man struggling against adversity.",
                "Anger, if not restrained, is frequently more hurtful to us than the injury that provokes it.",
                "No man was ever wise by chance.",
            ]
        }
    }
];
*/

// Quotes array is now fetched from a JSON file
let quotes = [];

// This function selects a random author and then a random quote from that author's quotes array
// An object is returned containing the author, quote, image, and history
// The history is an array, so we take the first element of the array to display instead
const getRandomQuote = () => {
    const randomIndex = quotes[Math.floor(Math.random() * quotes.length)]; //
    const quoteList = randomIndex.quotes.quote;
    const quote = quoteList[Math.floor(Math.random() * quoteList.length)];

    return {
        author: randomIndex.author,
        quote: quote,
        image: randomIndex.image,
        history: randomIndex.history[0], // Display the first history item in the array
    };
};

// displayQuote() selects a random quote calling getRandomQuote and updates the HTML elements with the quote, author, image, and history
// This also handles the image loading and animation
const displayQuote = () => {
    const random = getRandomQuote();
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    const imageElement = document.getElementById("image");
    const historyElement = document.getElementById("history");

    quoteElement.textContent = `"${random.quote}"`; // Displays the quote
    authorElement.textContent = `- ${random.author}`; // Displays the author
    historyElement.innerHTML = random.history; // InnerHTML is used to display the history with links instead of using textContent

    imageElement.classList.remove("animated"); // Remove the animated class to reset the animation
    imageElement.style.opacity = 0; 
    imageElement.src = random.image; // Set the image source to the random author's image
    imageElement.alt = `${random.author}'s portrait`;
    
    // Trigger reflow to restart the CSS animation
    imageElement.onload = () => {
        void imageElement.offsetWidth; // void is used to force a layout reflow
        imageElement.classList.add("animated"); // Adds the animated class back to start the animation
        imageElement.style.opacity = 1; 
    };
};

// Fetches the quotes data from the JSON file and handles any errors
const fetchQuotes = async () => {
    try {
        const response = await fetch("quotes.json"); // Fetches quote data from the JSON file
        quotes = await response.json(); // Parses the JSON data
        displayQuote();
    } catch(error) {
        console.error("Failed to fetch quotes:", error); // Logs any errors that occur during the fetch
    }
};


// This function hides the intro section and displays the quote container when the button is clicked
// It also calls the displayQuote function to show a random quote when the intro is hidden
document.getElementById("generate-quote").addEventListener("click", () => { 
    if (quotes.length === 0) return; 
        displayQuote(); 

        const introSection = document.querySelector(".intro"); 
        if (introSection) {
            introSection.classList.add("fade-out"); // Adds a fade-out class to the intro section
            setTimeout(() => {
                introSection.style.display = "none"; // Hides the intro section after 500ms
            }, 500);
        }
        document.getElementById("quote-container").style.display = "block"; 
        // Displays the quote container as soon as the button is clicked and the intro section is hidden
});

// This function is called when someone likes a quote and wants to save it
const saveQuote = () => {
    const quote = document.getElementById("quote").textContent;
    const author = document.getElementById("author").textContent;
    const savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || []; 
    // Retrieves saved quotes from local storage or initializes an empty array

    // Checks if the quote is already saved to prevent duplicates
    const exists = savedQuotes.some(item => item.quote === quote && item.author === author);
    if (exists) {
        alert("Quote already saved!");
        return;
    }

    savedQuotes.push({ quote, author }); // Adds the current quote and author to the saved quotes array
    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes)); // Saves the updated array back to local storage
    alert("Quote saved!"); // Alerts the user that the quote has been saved
};

document.getElementById("like-button").addEventListener("click", saveQuote); // Adds an event listener to the like button
document.getElementById("like-button").textContent = "🖤";
document.getElementById("like-button").classList.add("like-button");

fetchQuotes();