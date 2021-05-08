import React from "react";
import {socket} from "./Socket";

function PokemonCard({id, name, image, types}) {

    const splitTypes = types.split(" ");

    function selectPokemon(e) {
        socket.emit("getCurrentPokemon", {id: e.currentTarget.firstChild.innerHTML});
    }

    
    return (
        <div className="pokemonCard" onClick={selectPokemon}>
                <div className="cardID">{id}</div>
                <div className="cardName">{name.toUpperCase()}</div>
                <img className="cardImg" src={image} alt=""/>
                <div className="cardSplitTypes">
                    {
                        splitTypes.map((type, index) => (
                                <div className="cardTypeDiv" key={index}>{type.toUpperCase()}</div>
                            ))
                    }
                </div>
        </div>
    )
}

export default PokemonCard;