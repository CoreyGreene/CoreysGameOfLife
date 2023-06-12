interface State {
  grid: boolean[][];
}

interface UpdateAction {
  type: 'UPDATE';
  grid: boolean[][];
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
    default:
      return state;
  }
};
