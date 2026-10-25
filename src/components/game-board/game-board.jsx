import {useState} from 'react'
import Square from '../square/square'
import { calculateWinner } from '../../utils/game-logic'
import './game-board.scss'

const GameBoard = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winnerInfo = calculateWinner(squares);
    const winner = winnerInfo ? winnerInfo.winner : null;
    const winningLine = winnerInfo ? winnerInfo.line : [];
    const isDraw = !winner && squares.every(square => square !== null);
    

    const handleSquareClick = (index) => {
        if (squares[index] || winner || isDraw) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);
    }

    const handleGameUndo = () => {
        const newSquares = squares.slice();
        const lastMoveIndex = newSquares.lastIndexOf(isXNext ? 'O' : 'X');
        if (lastMoveIndex !== -1) {
            newSquares[lastMoveIndex] = null;
            setSquares(newSquares);
            setIsXNext(!isXNext);
        }
    };

    const handleGameReset = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
    };

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
                <button className='undo-button' onClick={handleGameUndo}>Undo</button>
                <button className='reset-button' onClick={handleGameReset}>Reset Game</button>
            </div>
        </div>
    );
}

export default GameBoard;