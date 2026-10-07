const { useState } = React;

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function calculateWinner(sqs) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (sqs[a] && sqs[a] === sqs[b] && sqs[a] === sqs[c]) {
        return sqs[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status = '';
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
      
      {/* CSS-based Grid / standard row layout */}
      <div className="board">
        <div className="board-row">
          <button className="square" onClick={() => handleClick(0)}>{squares[0]}</button>
          <button className="square" onClick={() => handleClick(1)}>{squares[1]}</button>
          <button className="square" onClick={() => handleClick(2)}>{squares[2]}</button>
        </div>
        <div className="board-row">
          <button className="square" onClick={() => handleClick(3)}>{squares[3]}</button>
          <button className="square" onClick={() => handleClick(4)}>{squares[4]}</button>
          <button className="square" onClick={() => handleClick(5)}>{squares[5]}</button>
        </div>
        <div className="board-row">
          <button className="square" onClick={() => handleClick(6)}>{squares[6]}</button>
          <button className="square" onClick={() => handleClick(7)}>{squares[7]}</button>
          <button className="square" onClick={() => handleClick(8)}>{squares[8]}</button>
        </div>
      </div>

      <button id="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}