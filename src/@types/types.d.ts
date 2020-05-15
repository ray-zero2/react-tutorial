export type Mark = null | 'X' | 'O' ;
export interface HistoryElement {
  squares: Mark[];
}
export type Histories = HistoryElement[];
