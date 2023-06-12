import React from 'react';
import Tile from '../Tile/Tile';
import GridContainer from './GridContainer';

interface GridProps {
  dispatch: any;
  rows: number;
  columns: number;
  initGridData: any[][];
  gridData: any[][];
  gridTileSize: number;
  simulationIsRunning: boolean;
}

export default function Grid(props: GridProps) {
  const { dispatch, rows, columns, initGridData, gridData, gridTileSize, simulationIsRunning } = props;

  const updateCell = (rowIndex: number, colIndex: number, value: any) => {
    initGridData[rowIndex][colIndex] = value;
  };

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
        updateTileState={(value: number) => updateCell(rowIndex, colIndex, value)}
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
