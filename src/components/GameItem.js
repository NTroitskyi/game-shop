import React from 'react';

const GameItem = ({ game }) => {
    return (
        <div className="game-item">
            <img src={game.image} alt={game.title} />
            <h2>{game.title}</h2>
            <p>{game.price}</p>
        </div>
    );
};

export default GameItem;
