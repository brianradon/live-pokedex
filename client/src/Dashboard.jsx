import React, {useState, useEffect} from "react";
import PokemonList from "./PokemonList";
import {Route} from "react-router-dom";
import DetailedPokemon from "./DetailedPokemon";
import {socket} from "./Socket";

function Dashboard() {

    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        socket.on("detailedPokemon", function(data) {
            console.log(data);
            setPokemon(data);
        }, []);
        return () => {
            socket.off("detailedPokemon");
        }
    })

    return (
        <div className="dashboard">
            <Route path="/" component={PokemonList} />
            <Route path={`/${pokemon.name}`}>
                <DetailedPokemon 
                    id={pokemon.id} 
                    name={pokemon.name} 
                    image={pokemon.image} 
                    types={pokemon.types}
                    height={pokemon.height}
                    weight={pokemon.weight}
                    abilities={pokemon.abilities}
                    stats={JSON.stringify(pokemon.stats)}
                />
            </Route>
        </div>
    )
}

export default Dashboard;