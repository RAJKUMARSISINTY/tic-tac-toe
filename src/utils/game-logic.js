const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return null;
};

const computerLogic = (squares) =>{
    const emptyIndices = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter(val => val !== null);

    if (emptyIndices.length === 0) return null;

    for (let i of emptyIndices) {
        const boardCopy = squares.slice();
        boardCopy[i] = 'O';
        if (calculateWinner(boardCopy)?.winner === 'O') return i;
    }

    for (let i of emptyIndices) {
        const boardCopy = squares.slice();
        boardCopy[i] = 'X';
        if (calculateWinner(boardCopy)?.winner === 'X') return i;
    }

    if (squares[4] === null) return 4;

    const corners = [0, 2, 6, 8].filter(idx => squares[idx] === null);
    if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)];
    }

    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}

export { calculateWinner, computerLogic };