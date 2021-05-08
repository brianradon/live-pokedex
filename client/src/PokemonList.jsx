import React, {useEffect, useState} from "react";
import {socket} from "./Socket";
import PokemonCard from "./PokemonCard";
import {Link} from "react-router-dom";

function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        socket.on("allPokemon", function(data) {
            setPokemonList(data);
        }, []);
    })

    return (
        <div className="pokemonList">
            {
                pokemonList.map((pokemon, index) => (
                    <Link to={`/${pokemon.name}`} key={index}>
                        <PokemonCard 
                            id={pokemon.id} 
                            name={pokemon.name} 
                            image={pokemon.image} 
                            types={pokemon.types}
                        />
                    </Link>
                ))
            }
        </div>
    )
}

export default PokemonList;