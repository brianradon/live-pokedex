import React from "react";

function MoveInfo({name, learned, pp, power, accuracy, damageClass, damageType, effect}) {
    return (
        <div className="moveInfo">
            <div>{name}</div>
            <div>{learned}</div>
            <div>{pp}</div>
            <div>{power}</div>
            <div>{accuracy}</div>
            <div>{damageClass}</div>
            <div>{damageType}</div>
            <div>{effect}</div>
        </div>
    )
}

export default MoveInfo;