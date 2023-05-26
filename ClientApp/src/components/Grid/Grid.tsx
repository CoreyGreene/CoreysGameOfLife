import React from 'react';
import Tile from '../Tile/Tile';
import { useState } from 'react';
import styled from 'styled-components';

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

    const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    gap: 0px;
    border: 1px solid black;
    width: ${gridTileSize * gridTileSize + 2}px;
    height: ${gridTileSize * gridTileSize + 2}px;
  `;

  const updateCell = (rowIndex: number, colIndex: number, value: any) => {
    dispatch({ type: 'UPDATE_CELL', rowIndex, colIndex, value });
  };

    const TileMemo = React.memo(Tile);
    const tiles = gridData.map((row: any[], rowIndex: any) =>
        row.map((value, colIndex) => (
            <TileMemo key={`${rowIndex}-${colIndex}`} dispatch={dispatch} state={!!value} width={gridTileSize} height={gridTileSize} simulationIsRunning={simulationIsRunning}
            updateTileState={(value: number) => updateCell(rowIndex, colIndex, value)}/>
        ))
    );

    return (
<div>
      <GridContainer>{tiles}</GridContainer>;
</div>


    )
}