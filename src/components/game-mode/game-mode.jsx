import './game-mode.scss';

const GameMode = ({ vsComputer, onModeChange }) => {
    return (
        <div className="game-mode">
            <h2>Select Game Mode</h2>
            <div className="game-mode-buttons"
            role="radiogroup"
            aria-label="Game Mode Selection"
            >
                <button
                    className={`game-mode-button ${!vsComputer ? 'active' : ''}`}
                    role="radio"
                    aria-checked={!vsComputer}
                    onClick={() => onModeChange('dual')}
                >
                    Dual Player
                </button>
                <button
                    className={`game-mode-button ${vsComputer ? 'active' : ''}`}
                    role="radio"
                    aria-checked={vsComputer}
                    onClick={() => onModeChange('computer')}
                >
                    Computer (Player O)
                </button>
            </div>
        </div>
    );
}

export default GameMode;
