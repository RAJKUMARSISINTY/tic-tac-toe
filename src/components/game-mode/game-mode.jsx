import React from 'react'

const GameMode = ({ vsComputer, onSelectMode }) => {
    return (
        <div className="game-mode">
            <button
                className={`game-mode-button ${!vsComputer ? 'active' : ''}`}
                onClick={() => onSelectMode(false)}
            >
                Dual Player
            </button>
            <button
                className={`game-mode-button ${vsComputer ? 'active' : ''}`}
                onClick={() => onSelectMode(true)}
            >
                Computer
            </button>
        </div>
    );
}

export default GameMode;
