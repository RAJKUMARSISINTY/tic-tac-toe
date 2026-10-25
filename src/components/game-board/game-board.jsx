import Square from '../square/square'
import './game-board.scss'

const GameBoard = ({ squares, isXNext, winnerInfo, winner, isDraw, canUndo, handleSquareClick, handleGameUndo, handleGameReset }) => {
    const winningLine = winnerInfo ? winnerInfo.line : [];

    let statusText;
    if (winner) {
        statusText = `Winner: Player ${winner}`;
    } else if (isDraw) {
        statusText = "It's a Draw!";
    } else {
        statusText = `Current Turn: Player ${isXNext ? 'X' : 'O'}`;
    }

    return (
        <div className="game-board">
            <div className="game-status-display">
                <span>{statusText}</span>
            </div>
            <div className="game-board-grid">
                {squares.map((value, index) => (
                    <Square
                        key={index}
                        value={value}
                        onClick={() => handleSquareClick(index)}
                        isWinningSquare={winningLine.includes(index)}
                        row={Math.floor(index / 3)}
                        col={index % 3}
                    />
                ))}
            </div>
            <div className="game-board-controls">
                <button className='undo-button' onClick={handleGameUndo} disabled={!canUndo}>
                    Undo
                </button>
                <button className='reset-button' onClick={handleGameReset}>Reset Game</button>
            </div>
        </div>
    );
}

export default GameBoard;