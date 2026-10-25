import './game-board.scss'

const GameBoard = () => {
    return (
        <div className="game-board">
            <button className='undo-button'>Undo</button>
            <button className='reset-button'>Reset Game</button>
        </div>
    );
}

export default GameBoard;