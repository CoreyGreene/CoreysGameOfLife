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
      const newState = !state;
      setActiveState(newState);
      updateTileState(newState);
    } else if (!simulationIsRunning && toggle) {
      const newState = !state;
      updateTileState(newState);
    }
  };

  const handleHover = () => {
    if (toggle) {
      setActiveState(true);
    } else {
      handleTileClick();
    }
  };

  const handleLeave = () => {
    if (toggle) {
      setActiveState(false);
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
      onClick={handleTileClick}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}></div>
  );
}

export default memo(Tile);
