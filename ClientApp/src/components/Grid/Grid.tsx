import React from 'react';
import Tile from '../Tile/Tile';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface GridProps {
    size: number;
    gridData: string;
}

export default function Grid(props: GridProps) {
    const { size = 20, gridData } = props;
 //   const [data, setData] = useState(gridData);

    const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr);
    gap: 1px;
    border: 1px solid black;
    width: ${size * 30}px;
    height: ${size * 30}px;
  `;

    const tiles = JSON.parse(gridData).map((row: any[], rowIndex: any) =>
        row.map((value, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} state={!!value} width={size} height={size} />
        ))
    );

    return <GridContainer>{tiles}</GridContainer>;
}