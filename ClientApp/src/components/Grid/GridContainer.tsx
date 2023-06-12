import React from 'react';

interface GridContainerProps {
  columns: number;
  rows: number;
  gridTileSize: number;
  children: any;
}

const GridContainer: React.FC<GridContainerProps> = ({ columns, rows, gridTileSize, children }) => {
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gap: '0px',
    border: '1px solid black',
    width: `${gridTileSize * gridTileSize + 2}px`,
    height: `${gridTileSize * gridTileSize + 2}px`,
  };

  return <div style={gridContainerStyle}>{children}</div>;
};

export default GridContainer;
