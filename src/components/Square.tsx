import React from 'react';

import { Mark } from '../@types/types'

interface SquareProps {
  value: Mark;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({value, onClick}) => {
  return (
    <button
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
