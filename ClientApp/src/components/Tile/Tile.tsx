import React, { useState, memo } from 'react';

type TileProps = {
  onColor?: string;
  offColor?: string;
  dispatch: any;
  state?: boolean;
  width: number;
  height: number;
  simulationIsRunning: boolean;
  updateTileState: (value: boolean) => void;
};

function Tile(props: TileProps) {
  const {
    onColor = 'green',
    offColor = 'black',
    state = false,
    width,
    height,
    simulationIsRunning,
    updateTileState,
  } = props;

  const handleTileClick = () => {
    if (!simulationIsRunning) {
      setActiveState(!activeState);
      updateTileState(!activeState ? true : false);
    }
  };

  const [activeState, setActiveState] = useState<boolean>(state);

  return (
    <div
      style={{
        backgroundColor: activeState ? onColor : offColor,
        width,
        height,
      }}
      onMouseOver={handleTileClick}></div>
  );
}

export default memo(Tile);
