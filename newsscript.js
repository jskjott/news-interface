function addNewsCard(title, link, topic, urlLink) {
    let cardElement = document.createElement("article");
    cardElement.className = "card";
    let mainElement = document.createElement("main");
    mainElement.className = "main";
    //title
    let h = document.createElement("H3") // Create a <h1> element
    let t = document.createTextNode(title); // Create a text node
    h.appendChild(t);
    //link
    var createA = document.createElement('a');
    //var createAText = document.createTextNode("link");
    createA.setAttribute('href', link);
    //createA.setAttribute('target', "_blank");
    //createA.appendChild(createAText);
    //topic tag
    let pElem = document.createElement('p');
    let topicTag = document.createTextNode(topic);
    // add the text node to the newly created div
    pElem.appendChild(topicTag)
    mainElement.appendChild(h)
    //mainElement.appendChild(createA)
    mainElement.appendChild(pElem)
    cardElement.appendChild(mainElement);
    //cardElement.appendChild(createAText)
    createA.appendChild(cardElement)
    cardElement.style.backgroundImage = "url("+urlLink+")"; 
    // add the newly created element and its content into the DOM 
    var cardContainer = document.getElementById("card-container");
    cardContainer.appendChild(createA);
}

function findArticles(topic, amount){
let url = 'https://newsapi.org/v2/everything?' +
          'q='+topic+'&' +
          'from=2018-12-11&' +
          'sortBy=popularity&' +
          'apiKey=077e9f3553b84ff091dec62e89606857';

let req = new Request(url);

fetch(req)
    .then(function(response) {
        response.json().then(function(value) {
        	cardsAdded = 0
        	value.articles.forEach(function(data)  {
        		if (cardsAdded < amount){
        			addNewsCard(data.title,data.url, topic, data.urlToImage);
        			cardsAdded++
        		}
        	})
        });
    })
}