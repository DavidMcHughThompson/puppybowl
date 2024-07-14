// What this needs.  Query selectors for all the HTML once I get it in place
// Then it needs functions to get data from the API
//Then it needs functions to make new cards
// THen it needs functions to allow you to manipulate the data of those cards to move them into different places 



async function fetchAllPlayers() {
    try{
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-ET-WEB-AM/players');
    const data = await response.json();
    console.log(data);
    return data.data.players; // Adjusting to access the players array from the response
} catch (error) {
    console.log("error fetching players", error);

    }
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

    const status = document.createElement('p');
    status.textContent = `Status: ${player.status}`;
    card.appendChild(status);

    const team = document.createElement('p');
    if (player.teamId !== null && player.teamId !== undefined){
    team.textContent = `Team Number: ${player.teamId}`;
} else {
    team.textContent = `${player.name} is currently undrafted`
}
    card.appendChild(team);

    const changeTeamButton = document.createElement('button');
    changeTeamButton.textContent = 'Change Team';
    changeTeamButton.addEventListener('click', () => changePlayerTeam(player.id, card));
    card.appendChild(changeTeamButton);



    if (player.imageUrl) {
    const image = document.createElement('img');
    image.src = player.imageUrl;
    image.alt = `${player.name} image`;
    card.appendChild(image);
    }
    console.log('Created card:', card);
    return card;
}

async function renderPlayers() {
    const players = await fetchAllPlayers();
    console.log('players', players);
    const container = document.querySelector('.cards');
    console.log('container', container);
    if (players) {
    players.forEach(player => {
        const playerCard = createPlayerCard(player);
        container.appendChild(playerCard);

    }); 
 } else {
    console.error('no player data available');
 }
}

document.addEventListener('DOMContentLoaded', renderPlayers);







// ------------

async function changePlayerTeam(playerId, card) {
    // Prompt the user for a new team ID
    const newTeamId = prompt("Enter new team ID:");

    if (newTeamId !== null && newTeamId.trim() !== "") {
        try {
            console.log(`Updating player ${playerId} to team ${newTeamId}`);
            const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-ET-WEB-AM/players/${playerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ teamId: newTeamId })
            });

            if (response.ok) {
                const updatedPlayer = await response.json();
                console.log('Updated player:', updatedPlayer);

                // Update the team display on the card
                const teamElement = card.querySelector('p');
                if (teamElement) {
                    teamElement.textContent = `Team Number: ${updatedPlayer.teamId}`;
                } else {
                    console.error('Team element not found in the card');
                }

                alert(`Player's team has been updated to Team Number: ${updatedPlayer.teamId}`);
            } else {
                const errorText = await response.text();
                console.error('Failed to update player:', response.status, errorText);
                alert(`Failed to update player's team. Status: ${response.status}, Message: ${errorText}`);
            }
        } catch (error) {
            console.error('Error updating player:', error);
            alert('Failed to update player\'s team. Please try again.');
        }
    } else {
        console.log('Invalid team ID entered');
    }
}

// Example invocation of the function
const cardElement = document.querySelector('.player-card'); // Ensure this selector matches your HTML structure
const playerId = 1; // Replace with actual player ID
changePlayerTeam(playerId, cardElement);


