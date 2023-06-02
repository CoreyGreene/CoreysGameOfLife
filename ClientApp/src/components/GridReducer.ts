interface State {
  grid: any[][];
}

interface UpdateAction {
  type: 'UPDATE';
  grid: any[][];
}

interface UpdateCellAction {
  type: 'UPDATE_CELL';
  rowIndex: number;
  colIndex: number;
  value: any;
}

type Action = UpdateAction | UpdateCellAction;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        grid: action.grid,
      };
    case 'UPDATE_CELL':
      return {
        ...state,
        grid: state.grid.map((row, rowIndex) =>
          rowIndex === action.rowIndex
            ? row.map((cell, colIndex) => (colIndex === action.colIndex ? action.value : cell))
            : row
        ),
      };
    default:
      return state;
  }
};
