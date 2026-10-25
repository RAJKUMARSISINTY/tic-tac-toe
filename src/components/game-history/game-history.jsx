import './game-history.scss';

const GameHistory = ({ history }) => {
  return (
    <div className="game-history">
      <h2>Game History</h2>
      {history.length === 0 ? (
        <p className="no-moves">No moves made yet.</p>
      ) : (
        <ol className="history-list">
          {history.map((move, index) => {
            const row = Math.floor(move.index / 3) + 1;
            const col = (move.index % 3) + 1;

            return (
              <li key={index} className="history-item">
                <span className="move-text">
                  {move.player} : Row {row}, Column {col}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default GameHistory;