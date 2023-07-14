import React, { useState, memo } from 'react';

type TileProps = {
  onColor?: string;
  offColor?: string;
  templateColor?: string;
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
    templateColor = 'red',
    state = false,
    width,
    height,
    simulationIsRunning,
    toggle,
    updateTileState,
  } = props;

  const handleTileClick = () => {
    if (!simulationIsRunning && !toggle) {
      //const newState = !activeState;
      setActiveState(!activeState);
      updateTileState(!activeState);
    } else if (!simulationIsRunning && toggle) {
      //const newState = !state;
      updateTileState(!state);
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

  //not exactly what I wanted here
  const getBackGroundColor = () => {
    if (toggle) {
      return activeState ? onColor : offColor;
    } else {
      return activeState ? onColor : offColor;
    }
  };

  return (
    <div
      style={{
        backgroundColor: getBackGroundColor(),
        width,
        height,
      }}
      onClick={handleTileClick}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}></div>
  );
}

export default memo(Tile);
