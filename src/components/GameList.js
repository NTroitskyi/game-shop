import React from 'react';
import GameItem from './GameItem';

const GameList = ({ games }) => {
    return (
        <div className="game-list">
            {games.map((game, index) => (
                <GameItem key={index} game={game} />
            ))}
        </div>
    );
};

export default GameList;
