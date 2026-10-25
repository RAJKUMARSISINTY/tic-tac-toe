import './square.scss';

const Square = ({ value, onClick, isWinningSquare, row, col }) => {
  const accessibilityLabel = value 
    ? `Row ${row}, Column ${col}, marked as ${value}` 
    : `Row ${row}, Column ${col}, empty square`;
    return (
        <button
            type="button"
            className={`square ${isWinningSquare ? 'winning' : ''} ${value ? value.toLowerCase() : ''}`}
            onClick={onClick}
            aria-label={accessibilityLabel} 
        >
            {value}
        </button>
    );
}

export default Square;