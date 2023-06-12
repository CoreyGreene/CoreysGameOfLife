import React, { useReducer } from 'react';
import { useState } from 'react';
import Grid from '../components/Grid/Grid';
import { reducer } from './Grid/GridReducer';
import { debounce } from 'lodash';
import * as signalR from '@microsoft/signalr';

export default function RunGame() {
  interface MyDataModel {
    stringData: string;
  }

  const TheTilePixelSize = 8;
  const numberOfRows = 80;
  const numberOfColumns = 100;
  const row = Array.from({ length: numberOfColumns }, () => false);
  const grid = Array.from({ length: numberOfRows }, () => [...row]);
  const json = { rows: numberOfRows, columns: numberOfColumns, tiles: JSON.stringify(grid) };
  const [simulationIsRunning, setSimulationIsRunning] = useState(false);
  const [state, dispatch] = useReducer(reducer, { grid });

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

  const updateCell = debounce((newGrid: any) => {
    const updatedGrid = [...newGrid];
    updateGrid(updatedGrid);
  }, 300);

  return (
    <div>
      <button onClick={() => StartSimulation()}>Start</button>
      <button onClick={() => StopSimulation()}>Stop</button>
      <Grid
        dispatch={dispatch}
        rows={numberOfRows}
        columns={numberOfColumns}
        gridData={state.grid}
        gridTileSize={TheTilePixelSize}
        simulationIsRunning={simulationIsRunning}
        updateCelltest={updateCell}></Grid>
    </div>
  );
}
