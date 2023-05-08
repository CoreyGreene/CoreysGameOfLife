import React from 'react';
import Tile from '../Tile/Tile';
import { useState } from 'react';
import styled from 'styled-components';

interface GridProps {
    rows: number;
    columns: number;
    gridData: any[];
    updateGridData: CallableFunction;
    gridTileSize: number
}

export default function Grid(props: GridProps) {
    const { rows, columns, gridData, updateGridData, gridTileSize } = props;
    const [data, setData] = useState(gridData);


    const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    gap: 0px;
    border: 1px solid black;
    width: ${gridTileSize * gridTileSize +2}px;
    height: ${gridTileSize * gridTileSize +2}px;
  `;

    const updateTileState = (rowIndex: number, colIndex: number, value: boolean) => {
        const updatedData = data;
        updatedData[rowIndex][colIndex] = value ? 1 : 0;
        setData(updatedData);

        updateGridData(updatedData)
    };

    const TileMemo = React.memo(Tile);
    const tiles = gridData.map((row: any[], rowIndex: any) =>
        row.map((value, colIndex) => (
            <TileMemo key={`${rowIndex}-${colIndex}`} state={!!value} width={gridTileSize} height={gridTileSize}
                updateTileState={(value: boolean) => updateTileState(rowIndex, colIndex, value)} />
        ))
    );

    return <GridContainer>{tiles}</GridContainer>;
}