import React from 'react';
import { Histories } from '../@types/types';

interface MovesProps {
  history: Histories;
  onClick: (index: number) => void;
}

export const Moves: React.FC<MovesProps> = ({history, onClick}) => {
  return(
    <ol>
      {
        history.map((step, index) => {
          const desc = index ? `Go to move #${index}` : 'Go to start';
          return (
            <li key={index}>
              <button onClick={()=>onClick(index)}>{desc}</button>
            </li>
          );
        })
      }
    </ol>
  );
}
