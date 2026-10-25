import {useState, useEffect, useRef} from 'react';
import GameMode from './components/game-mode/game-mode';
import GameBoard from './components/game-board/game-board';
import GameHistory from './components/game-history/game-history';
import GameScore from './components/game-score/game-score';
import { calculateWinner, computerLogic } from './utils/game-logic';
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
  const [history, setHistory] = useState([]);
  const canUndo = history.length > 0 && !winner && !isDraw;

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
      const player = isXNext ? 'X' : 'O';
      newSquares[index] = player;
      setSquares(newSquares);
      setIsXNext(!isXNext);

      setHistory(prevHistory => [...prevHistory, {player, index}]);

  }

  const handleGameUndo = () => {
    const stepsToUndo = vsComputer && history.length >= 2 ? 2 : 1;
    const updatedHistory = history.slice(0, history.length - stepsToUndo);

    const newSquares = Array(9).fill(null);
    updatedHistory.forEach(move => {
      newSquares[move.index] = move.player;
    });

    setSquares(newSquares);
    setHistory(updatedHistory);
    setIsXNext(updatedHistory.length % 2 === 0);
  };

  const handleGameReset = () => {
      setSquares(Array(9).fill(null));
      setIsXNext(true);
      setHistory([]);
  };

  const resetScore = () => {
      const newScore = { playerXScore: 0, playerOScore: 0, drawScore: 0 };
      setGameScore(newScore);
      localStorage.setItem(localStorageKey, JSON.stringify(newScore));
      handleGameReset();
  }

  const [vsComputer, setVsComputer] = useState(false);
  const handleModeChange = (mode) => {
      const wantComputer = mode === 'computer';
      if (wantComputer === vsComputer) return;
      setVsComputer(wantComputer);
      resetScore();
  };

  useEffect(() => {
      if (vsComputer && !isXNext && !winner && !isDraw) {
          const timer = setTimeout(() => {
              const computerMoveIndex = computerLogic(squares);
              if (computerMoveIndex !== undefined) {
                  handleSquareClick(computerMoveIndex);
              }
          }, 700);
          return () => clearTimeout(timer); 
      }
  }, [squares, isXNext, vsComputer, winner, isDraw]);

  return (
    <div className="game">
      <header className="game-header">
        <h1>Tic Tac Toe</h1>
      </header>

      <main className="game-main-grid">
        <div className="game-column">
          <GameMode
            vsComputer={vsComputer}
            onModeChange={handleModeChange}
           />
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
            canUndo={canUndo}
            handleSquareClick={handleSquareClick}
            handleGameUndo={handleGameUndo}
            handleGameReset={handleGameReset}
          />
        </div>

        <div className="game-column">
          <GameHistory
            history={history}
          />
        </div>
      </main>
    </div>
  );
}

export default App;