import './game-history.scss';

const GameHistory = () => {
    const history = [];
    
  return (
        <div className="game-history">
            <h2>Game History</h2>
            {history.length === 0 && <p>No moves made yet.</p>}
            <ul className="history-list">
                {history.map((move, index) => (
                    <li key={index}>Move {index + 1}: {move}</li>
                ))}
            </ul>
        </div>
    );
};

export default GameHistory;