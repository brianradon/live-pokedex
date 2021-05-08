const app = require("express");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const fetch = require("node-fetch");

let MAXIMUM_POKEMON = 10;
let all = fetchAllPokemon();

io.on("connect", async function(socket) {
    socket.emit("allPokemon", await all);

    socket.on("getCurrentPokemon", async function(data) {
        await getSinglePokemon(data.id, socket);
    })
})

async function fetchAllPokemon() {
    let allPokemon = [];
    for (let i = 1; i <= MAXIMUM_POKEMON; i++) {
        // temporary fix.  pokeapi doesn't have resources for id 3 but does for Venusaur

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);

        const data = await response.json();

        let newPokemon = {
            id: data.id,
            name: data.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
            types: concatenateTypes(data.types)
        }
        allPokemon.push(newPokemon);
    }
    return allPokemon;
}

async function getSinglePokemon(id, socket) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    let newPokemon = {
        //physical information
        id: data.id,
        name: data.name,
        image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        types: concatenateTypes(data.types),
        height: data.height,
        weight: data.weight,
        abilities: concatenateAbilities(data.abilities),
        
        //stat information
        stats: {
            hp: {   
                name: data.stats[0].stat.name,
                stat: data.stats[0].base_stat
            },
            attack: {   
                name: data.stats[1].stat.name,
                stat: data.stats[1].base_stat
            },
            defense: {   
                name: data.stats[2].stat.name,
                stat: data.stats[2].base_stat
            },
            specialAttack: {   
                name: data.stats[3].stat.name,
                stat: data.stats[3].base_stat
            },
            specialDefense: {   
                name: data.stats[4].stat.name,
                stat: data.stats[4].base_stat
            },
            speed: {   
                name: data.stats[5].stat.name,
                stat: data.stats[5].base_stat
            }
        }
    }
    socket.emit("detailedPokemon", newPokemon);
    socket.emit("detailedMoves", await getMovesData(data));
}

async function fetchMoveData(move) {
    const moveDataResponse = await fetch(`https://pokeapi.co/api/v2/move/${move.move.name}/`);
    const moveData = await moveDataResponse.json();
    return moveData;
}

async function getMovesData(data) {
    let moveSet = [];
    for (let i = 0; i < data.moves.length; i++) {
        const learnedAt = data.moves[i].version_group_details[data.moves[i].version_group_details.length - 1].level_learned_at;
      
        const move = await fetchMoveData(data.moves[i]);

        const fullDetail = [learnedAt, move]
        moveSet.push(fullDetail);
    }
    return moveSet;
}

function concatenateTypes(types) {    
    if (types.length > 1) {
        return types[0].type.name + " " + types[1].type.name
    }
    return types[0].type.name;
}

function concatenateAbilities(abilities) {    
    if (abilities.length > 1) {
        return abilities[0].ability.name + " " + abilities[1].ability.name
    }
    return abilities[0].ability.name;
}

const PORT = process.env.PORT || 5000;

async function startListening() {
    http.listen(PORT, () => {
        console.log("Listening on port 8080.");
    });
}

startListening();