import React from 'react';

interface TileProps {
    title: string;
    color?: string;
    width?: string;
    height?: string;
}

export default function Tile(props: TileProps) {
    const { title, color = 'blue', width = '20px', height = '20px' } = props;

    return (
        <div style={{ backgroundColor: color, width, height }}>
            <span style={{ display: 'block', width: '100%', height: '100%' }}></span>
        </div>
    )
}