import React from "react";
import MoveSet from "./MoveSet";

function DetailedPokemon({ id, name, image, types, height, weight, abilities, stats }) {

    const pokeStats = JSON.parse(stats);
    const hp = pokeStats.hp;
    const attack = pokeStats.attack;
    const defense = pokeStats.defense;
    const specialAttack = pokeStats.specialAttack;
    const specialDefense = pokeStats.specialDefense;
    const speed = pokeStats.speed;

    const splitTypes = types.split(" ");
    const splitAbilities = abilities.split(" ");

    function convertToMeter(height) {
        return height / 10;
    }

    return (
        <div className="detailedContainer">
            <div className="detailedPokemon">
                <div className="generalInfoContainer">
                    <div className="infoTagContainer">
                        <div className="infoTagdiv">ID: </div>
                        {id}
                    </div>
                    <div className="infoTagContainer">
                        <div className="infoTagdiv">NAME: </div>
                        <div className="infodiv">{name.toUpperCase()}</div>
                    </div>
                    <div className="infoTagContainer">
                        <div className="infoTagdiv">TYPES: </div>
                        <div className="splitTypesContainer">
                            {
                                splitTypes.map((type, index) => (
                                    <div className="typediv" key={index}>{type.toUpperCase()}</div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="infoTagContainer">
                        <div className="infoTagdiv">HEIGHT: </div>
                        <div className="infodiv">{convertToMeter(height)} m</div>
                    </div>
                    <div className="infoTagContainer">
                        <div className="infoTagdiv">WEIGHT: </div>
                        <div className="infodiv">{weight} kg</div>
                    </div>
                    <div className="infoTagContainer">
                        <div className="infoTagdiv">ABILITIES: </div>
                        <div className="splitAbilityContainer">
                            {
                                splitAbilities.map((ability, index) => (
                                    <div className="abilitydiv" key={index}>{ability.toUpperCase()}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="detailedImageContainer">
                    <span className="circle"></span>
                    <img className="detailedImage" src={image} alt="" />
                </div>
                <div className="statsContainer">
                    <div className="statContainer">
                        <div className="statTagdiv">{hp.name.toUpperCase()}:</div><div className="statdiv">{hp.stat}</div>
                        <div className="progressBarContainer">
                            <div className="progressBar"><div className="hpBar" style={{ width: `${hp.stat / 255 * 100}%` }}></div></div>
                        </div>
                    </div>
                    <div className="statContainer">
                        <div className="statTagdiv">{attack.name.toUpperCase()}:</div><div className="statdiv">{attack.stat}</div>
                        <div className="progressBarContainer">
                            <div className="progressBar"><div className="attackBar" style={{ width: `${attack.stat / 255 * 100}%` }}></div></div>
                        </div>
                    </div>
                    <div className="statContainer">
                        <div className="statTagdiv">{defense.name.toUpperCase()}:</div><div className="statdiv">{defense.stat}</div>
                        <div className="progressBarContainer">
                            <div className="progressBar"><div className="defenseBar" style={{ width: `${defense.stat / 255 * 100}%` }}></div></div>
                        </div>
                    </div>
                    <div className="statContainer">
                        <div className="statTagdiv">{specialAttack.name.toUpperCase()}:</div><div className="statdiv">{specialAttack.stat}</div>
                        <div className="progressBarContainer">
                            <div className="progressBar"><div className="specialAttackBar" style={{ width: `${specialAttack.stat / 255 * 100}%` }}></div></div>
                        </div>
                    </div>
                    <div className="statContainer">
                        <div className="statTagdiv">{specialDefense.name.toUpperCase()}:</div> <div className="statdiv">{specialDefense.stat}</div>
                        <div className="progressBarContainer">
                            <div className="progressBar"><div className="specialDefenseBar" style={{ width: `${specialDefense.stat / 255 * 100}%` }}></div></div>
                        </div>
                    </div>
                    <div className="statContainer">
                        <div className="statTagdiv">{speed.name.toUpperCase()}:</div><div className="statdiv">{speed.stat}</div>
                        <div className="progressBarContainer">
                            <div className="progressBar"><div className="speedBar" style={{ width: `${speed.stat / 255 * 100}%` }}></div></div>
                        </div>
                    </div>
                </div>
            </div>
            <MoveSet />
        </div>

    )
}

export default DetailedPokemon;