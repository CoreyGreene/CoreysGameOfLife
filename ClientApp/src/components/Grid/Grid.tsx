import React from 'react';
import Tile from '../Tile/Tile';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface GridProps {
    size: number;
    gridData: any[];
    updateGridData: CallableFunction
}

export default function Grid(props: GridProps) {
    const { size = 20, gridData, updateGridData } = props;
    const [data, setData] = useState(gridData);



    const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr);
    gap: 1px;
    border: 1px solid black;
    width: ${size * 30}px;
    height: ${size * 30}px;
  `;

    const updateTileState = (rowIndex: number, colIndex: number, value: boolean) => {
        const updatedData = data;
        updatedData[rowIndex][colIndex] = value ? 1 : 0;
        setData(updatedData);

        updateGridData(updatedData)
    };


    const tiles = gridData.map((row: any[], rowIndex: any) =>
        row.map((value, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} state={!!value} width={size} height={size}
                updateTileState={(value: boolean) => updateTileState(rowIndex, colIndex, value)} />
        ))
    );

    return <GridContainer>{tiles}</GridContainer>;
}