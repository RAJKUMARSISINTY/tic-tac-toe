import {useState, useEffect, useRef} from 'react';
import GameMode from './components/game-mode/game-mode';
import GameBoard from './components/game-board/game-board';
import GameHistory from './components/game-history/game-history';
import GameScore from './components/game-score/game-score';
import { calculateWinner } from './utils/game-logic';
import './App.scss';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const isDraw = !winner && squares.every(square => square !== null);
  const localStorageKey = 'tic-tac-toe-game-score';
  const [gameScore, setGameScore] = useState(() => {
      const savedScore = localStorage.getItem(localStorageKey);
      return savedScore ? JSON.parse(savedScore) : { playerXScore: 0, playerOScore: 0, drawScore: 0 };
  });
  const scoreRecordedRef = useRef(false);

  useEffect(() => {
    if ((winner || isDraw) && !scoreRecordedRef.current) {
      const newScore = { ...gameScore };
      if (winner === 'X') {
        newScore.playerXScore += 1;
      } else if (winner === 'O') {
        newScore.playerOScore += 1;
      } else if (isDraw) {
        newScore.drawScore += 1;
      }
      setGameScore(newScore);
      localStorage.setItem(localStorageKey, JSON.stringify(newScore));
      scoreRecordedRef.current = true;
    } else if (!winner && !isDraw) {
      scoreRecordedRef.current = false;
    }
  }, [winner, isDraw]);


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

  const resetScore = () => {
      const newScore = { playerXScore: 0, playerOScore: 0, drawScore: 0 };
      setGameScore(newScore);
      localStorage.setItem(localStorageKey, JSON.stringify(newScore));
      handleGameReset();
  }

  return (
    <div className="game">
      <header className="game-header">
        <h1>Tic Tac Toe</h1>
      </header>

      <main className="game-main-grid">
        <div className="game-column">
          <GameMode />
          <GameScore
            playerXScore={gameScore.playerXScore}
            playerOScore={gameScore.playerOScore}
            drawScore={gameScore.drawScore}
            resetScore={resetScore}
          />
        </div>

        <div className="game-column">
          <GameBoard
            squares={squares}
            isXNext={isXNext}
            winnerInfo={winnerInfo}
            winner={winner}
            isDraw={isDraw}
            handleSquareClick={handleSquareClick}
            handleGameUndo={handleGameUndo}
            handleGameReset={handleGameReset}
          />
        </div>

        <div className="game-column">
          <GameHistory/>
        </div>
      </main>
    </div>
  );
}

export default App;