import React from 'react';
import Tile from '../Tile/Tile';
import GridContainer from './GridContainer';
import { debounce } from 'lodash';

interface GridProps {
  dispatch: any;
  rows: number;
  columns: number;
  gridData: any[][];
  gridTileSize: number;
  simulationIsRunning: boolean;
}

export default function Grid(props: GridProps) {
  const { dispatch, rows, columns, gridData, gridTileSize, simulationIsRunning } = props;
  var tempGrid = [...gridData];

  const updateCell = (rowIndex: number, colIndex: number, value: any) => {
    tempGrid[rowIndex][colIndex] = value;
    updateGrid(tempGrid);
  };

  const updateGrid = debounce((newGrid: any[][]) => {
    dispatch({ type: 'UPDATE', grid: newGrid });
  }, 300);

  const TileMemo = React.memo(Tile);
  const tiles = gridData.map((row: any[], rowIndex: any) =>
    row.map((value, colIndex) => (
      <TileMemo
        key={`${rowIndex}-${colIndex}`}
        dispatch={dispatch}
        state={!!value}
        width={gridTileSize}
        height={gridTileSize}
        simulationIsRunning={simulationIsRunning}
        updateTileState={(value: boolean) => updateCell(rowIndex, colIndex, value)}
      />
    ))
  );

  return (
    <div>
      <GridContainer columns={columns} rows={rows} gridTileSize={gridTileSize}>
        {tiles}
      </GridContainer>
      ;
    </div>
  );
}
