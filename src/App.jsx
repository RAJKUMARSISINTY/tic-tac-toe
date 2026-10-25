import GameMode from './components/game-mode/game-mode';
import GameBoard from './components/game-board/game-board';
import GameHistory from './components/game-history/game-history';
import GameScore from './components/game-score/game-score';
import './App.scss';

export default function App() {
 
  return (
    <div className="app-container">
      <header className="game-header">
        <h1>Tic Tac Toe</h1>
      </header>

      <main className="game-main-grid">
        <div className="game-column">
          <GameMode />
          <GameScore
            playerXScore={0}
            playerOScore={0}
            drawScore={0}
          />
        </div>

        <div className="game-column">
          <GameBoard/>
        </div>

        <div className="game-column">
          <GameHistory/>
        </div>
      </main>
    </div>
  );
}