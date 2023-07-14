import React from 'react';

interface GridContainerProps {
  columns: number;
  rows: number;
  gridTileSize: number;
  children: any;
}

const GridContainer: React.FC<GridContainerProps> = ({ columns, rows, gridTileSize, children }) => {
  console.log(gridTileSize);
  const gridContainerStyle = {
    display: 'grid',
    backgroundColor: 'black',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gap: '1px',
    width: `${columns * gridTileSize + 2 + columns * 1}px`,
    height: `${rows * gridTileSize + 2 + rows * 1}px`,
  };

  return <div style={gridContainerStyle}>{children}</div>;
};

export default GridContainer;
