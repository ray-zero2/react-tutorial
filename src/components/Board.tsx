import React from 'react';

import { Mark } from '../@types/types'

import { Square } from './Square';

interface BoardProps {
  squares: Mark[];
  onClick: (index: number) => void;
}

export const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  return (
    <div className="board">
      {
        squares.map((square, index) =>
          <Square key={index} value={square} onClick={()=> onClick(index)} />
        )
      }
    </div>
  );
}
