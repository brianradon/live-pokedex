import React, { useState, useEffect } from "react";
import { socket } from "./Socket";
import MoveInfo from "./MoveInfo";
import Loading from "./Loading";

function MoveSet() {

    const [moves, setMoves] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        socket.on("detailedMoves", function (data) {
            console.log(data);
            setMoves(data);
            setLoading(false);
        }, []);
        return () => {
            socket.off("detailedMoves");
        }
    })

    return (
        <div className="movePageContainer">
            {
                (isLoading) ? <Loading /> : <div className="notLoadingContainer">
                    <div className="moveListTitle">MOVE LIST</div>
                    <div className="moveSetHeader">
                        <div className="movesetName">NAME</div>
                        <div className="movesetLearned">LEVEL LEARNED</div>
                        <div className="movesetPP">POWER POINTS</div>
                        <div className="movesetPower">POWER</div>
                        <div className="movesetAccuracy">ACCURACY</div>
                        <div className="movesetDamageClass">DAMAGE CLASS</div>
                        <div className="movesetDamageType">DAMAGE TYPE</div>
                        <div className="movesetEffect">EFFECT</div>
                    </div>
                    <div className="overflowContainer">
                        <div className="movesetContainer">
                            <div className="moveset">
                                {
                                    moves.map((move, index) => (
                                        <MoveInfo
                                            key={index}
                                            name={move[1].name.toUpperCase()}
                                            learned={move[0]}
                                            pp={move[1].pp}
                                            power={
                                                move[1].power == null ? "N/A" : move[1].power
                                            }
                                            accuracy={
                                                move[1].accuracy == null ? "N/A" : move[1].accuracy
                                            }
                                            damageClass={move[1].damage_class.name.toUpperCase()}
                                            damageType={move[1].type.name.toUpperCase()}
                                            effect={move[1].effect_entries[0].short_effect.toUpperCase()}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MoveSet;