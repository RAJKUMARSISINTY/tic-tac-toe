import './game-score.scss';

const GameScore = ({ playerXScore, playerOScore, drawScore }) => {
  return (
    <div className="game-score">
        <h2>Game Score</h2>
        <div className="game-score-player">
            <span>Player X :</span>
            <span>{playerXScore}</span>
        </div>
        <div className="game-score-player">
            <span>Player O :</span>
            <span>{playerOScore}</span>
        </div>
        <div className="game-score-player">
            <span>Draw :</span>
            <span>{drawScore}</span>
        </div>
        <button className="reset-button">Reset Score</button>
    </div>
  );
};

export default GameScore;