import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = ({value, onClick}) => {
  return (
    <button
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

const Board = ({ squares, onClick }) => {
  const renderSquare = index => {
    return (
      <Square
        value={squares[index]}
        onClick={() => onClick(index)}
      />
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const Game = () => {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = index => {
    const _history = history.slice(0, stepNumber + 1);
    const lastIndex = _history.length - 1;
    const current = _history[lastIndex];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[index]) return;

    squares[index] = xIsNext ? 'X' : 'O';

    setHistory(_history.concat([{squares}]));
    setStepNumber(_history.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = index => {
    setStepNumber(index);
    setXIsNext(index % 2 === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, index) => {
    const desc = index ? `Go to move #${index}` : 'Go to start';
    return (
      <li key={ index }>
        <button onClick={() => jumpTo(index)}>{ desc }</button>
      </li>
    )
  })

  const status = winner ?
    `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;


  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{ status }</div>
        <ol>{ moves }</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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

  for(let i = 0, length = lines.length; i < length; i ++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
