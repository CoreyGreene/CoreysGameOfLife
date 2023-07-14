import React, { useReducer, useEffect } from 'react';
import { useState } from 'react';
import Grid from '../components/Grid/Grid';
import Button from './Button/Button';
import SuperAwesomeSlider from './SuperAwesomeSlider/SuperAwesomeSlider';
import { reducer } from './Grid/GridReducer';
import * as signalR from '@microsoft/signalr';

export default function RunGame() {
  interface MyDataModel {
    stringData: string;
  }

  const TheTilePixelSize = 8;
  const [numberOfColumns, setNumberOfColumns] = useState<number>(80);
  const [numberOfRows, setNumberOfRows] = useState<number>(60);
  const row = Array.from({ length: numberOfColumns }, () => false);
  const grid = Array.from({ length: numberOfRows }, () => [...row]);
  const [simulationIsRunning, setSimulationIsRunning] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [state, dispatch] = useReducer(reducer, { grid });
  useEffect(() => {
    ClearSimulation();
  }, [numberOfColumns, numberOfRows]);
  const updateGrid = (newGrid: any[][]) => {
    dispatch({ type: 'UPDATE', grid: newGrid });
  };

  const StartSimulation = async () => {
    setSimulationIsRunning(true);

    const modelData: MyDataModel = {
      stringData: JSON.stringify(state.grid),
    };

    const response = await fetch('gameOfLife/StartSimulation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modelData),
    });

    if (response.ok) {
      ActivateWebSocketConnection();
    } else {
      console.error(`Failed to send data. Status: ${response.status}`);
    }
  };

  const ClearSimulation = () => {
    StopSimulation();
    updateGrid(grid);
  };

  const StopSimulation = async () => {
    setSimulationIsRunning(false);

    const response = await fetch('gameOfLife/StopSimulation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
    }
  };

  async function ActivateWebSocketConnection() {
    const connection = new signalR.HubConnectionBuilder().withUrl('https://localhost:7199/hub').build();

    connection.on('ReceiveData', function (data) {
      updateGrid(data);
    });

    await connection.start();
    await connection.invoke('StartSendingData');
  }

  return (
    <div>
      <SuperAwesomeSlider
        initialValue={numberOfRows}
        onSlideCallback={setNumberOfRows}
        isDisabled={simulationIsRunning}
        text={'number of rows'}></SuperAwesomeSlider>

      <SuperAwesomeSlider
        initialValue={numberOfColumns}
        onSlideCallback={setNumberOfColumns}
        isDisabled={simulationIsRunning}
        text={'number of columns'}></SuperAwesomeSlider>

      <Button text="Run" onClick={StartSimulation}></Button>
      <Button text="Stop" onClick={StopSimulation}></Button>
      <Button text="Clear" onClick={ClearSimulation}></Button>
      <label className="toggle-switch">
        Glider Gun
        <input type="checkbox" checked={toggle} onChange={() => setToggle(!toggle)} />
        <span className="slider" />
      </label>
      <Grid
        dispatch={dispatch}
        rows={numberOfRows}
        columns={numberOfColumns}
        gridData={state.grid}
        gridTileSize={TheTilePixelSize}
        simulationIsRunning={simulationIsRunning}
        toggle={toggle}></Grid>
    </div>
  );
}
