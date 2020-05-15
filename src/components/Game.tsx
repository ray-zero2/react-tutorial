import React, { useState } from 'react';

import { Histories } from '../@types/types'

import { Board } from './Board';
import { Moves } from './Moves';
import { calculateWinner } from '../functions/calculateWinner';

export const Game = () => {
  const [history, setHistory] = useState<Histories>([{squares: Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClickBoard = (index: number): void => {
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

  const handleClickMoves = (index: number): void => {
    setStepNumber(index);
    setXIsNext(index % 2 === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const status = winner ?
    `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;


  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClickBoard}
        />
      </div>
      <div className="game-info">
        <div>{ status }</div>
        <Moves
          history={history}
          onClick={handleClickMoves}
        />
      </div>
    </div>
  );
}
