import React from 'react';

import { Mark } from '../@types/types'

import { Square } from './Square';

interface BoardProps {
  squares: Mark[];
  onClick: (index: number) => void;
}

export const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  const renderSquare = (index: number) => {
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
