import React, { useState, memo } from 'react';

type TileProps = {
  onColor?: string;
  offColor?: string;
  dispatch: any;
  state?: boolean;
  width: number;
  height: number;
  simulationIsRunning: boolean;
  toggle: boolean;
  updateTileState: (value: boolean) => void;
};

function Tile(props: TileProps) {
  const {
    onColor = 'yellow',
    offColor = 'grey',
    state = false,
    width,
    height,
    simulationIsRunning,
    toggle,
    updateTileState,
  } = props;

  const handleTileClick = () => {
    if (!simulationIsRunning && !toggle) {
      setActiveState(!activeState);
      updateTileState(!activeState ? true : false);
    } else if (!simulationIsRunning && toggle) {
      //setActiveState(!activeState);
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
      onClick={handleTileClick}></div>
  );
}

export default memo(Tile);
