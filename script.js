// What this needs.  Query selectors for all the HTML once I get it in place
// Then it needs functions to get data from the API
//Then it needs functions to make new cards
// THen it needs functions to allow you to manipulate the data of those cards to move them into different places 


// async function fetchAllPlayers() {
//     const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-ET-WEB-AM/players')
//     const players = await response.json();
//     console.log(players);
//     return players;
// }

async function fetchAllPlayers() {
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-ET-WEB-AM/players');
    const data = await response.json();
    console.log(data);
    return data.data.players; // Adjusting to access the players array from the response
}

function createPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'playerCard'

    const name = document.createElement('h3');
    name.textContent = player.name;
    card.appendChild(name);

    const breed = document.createElement('p');
    breed.textContent = `Breed: ${player.breed}`;
    card.appendChild(breed);

    const age = document.createElement('p');
    age.textContent = `Age: ${player.age}`;
    card.appendChild(age);

    if (player.image) {
    const image = document.createElement('img');
    image.src = player.image;
    image.alt = `${player.name} image`;
    card.appendChild(image);
    }
    console.log('Created card:', card);
    return card;
}

async function renderPlayers() {
    const players = await fetchAllPlayers()
    const container = document.getElementById('cards')
    
    players.forEach(player => {
        const playerCard = createPlayerCard(player);
        container.appendChild(playerCard);

    });
}

document.addEventListener('DOMContentLoaded', renderPlayers);