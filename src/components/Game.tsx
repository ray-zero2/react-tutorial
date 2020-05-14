import React, { useState } from 'react';

import { Histories } from '../@types/types'

import { Board } from './Board';
import { calculateWinner } from '../functions/calculateWinner';

export const Game = () => {
  const [history, setHistory] = useState<Histories>([{squares: Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = (index: number): void => {
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

  const jumpTo = (index: number): void => {
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
