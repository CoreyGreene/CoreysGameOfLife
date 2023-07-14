import React from 'react';
import Tile from '../Tile/Tile';
import GridContainer from './GridContainer';
import * as Templates from '../Templates/CustomTemplates';
import { debounce } from 'lodash';

interface GridProps {
  dispatch: any;
  rows: number;
  columns: number;
  gridData: any[][];
  gridTileSize: number;
  simulationIsRunning: boolean;
  toggle: boolean;
}

export default function Grid(props: GridProps) {
  const { dispatch, rows, columns, gridData, gridTileSize, simulationIsRunning, toggle } = props;
  var tempGrid = [...gridData];

  const updateCell = (rowIndex: number, colIndex: number, value: any) => {
    if (!toggle) {
      tempGrid[rowIndex][colIndex] = value;
      updateGrid(tempGrid);
    } else {
      const coordinates = Templates.getGliderGun(rowIndex, colIndex);

      for (let i = 0; i < coordinates.length; i++) {
        var pair = coordinates[i];
        tempGrid[pair[0]][pair[1]] = value;
      }

      updateGrid(tempGrid);
    }
  };

  const updateGrid = debounce((newGrid: any[][]) => {
    dispatch({ type: 'UPDATE', grid: newGrid });
  }, 200);

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
        toggle={toggle}
        updateTileState={(value: boolean) => updateCell(rowIndex, colIndex, value)}
      />
    ))
  );

  return (
    <div>
      <GridContainer columns={columns} rows={rows} gridTileSize={gridTileSize}>
        {tiles}
      </GridContainer>
    </div>
  );
}
