import React, { useReducer } from 'react';
import { useState } from 'react';
import Grid from '../components/Grid/Grid';
import { reducer } from './Grid/GridReducer';
import * as signalR from '@microsoft/signalr';

export default function RunGame() {
  interface MyDataModel {
    stringData: string;
  }

  const TheTilePixelSize = 8;
  const numberOfRows = 70;
  const numberOfColumns = 100;
  const row = Array.from({ length: numberOfColumns }, () => false);
  const grid = Array.from({ length: numberOfRows }, () => [...row]);
  const json = { rows: numberOfRows, columns: numberOfColumns, tiles: JSON.stringify(grid) };
  const [simulationIsRunning, setSimulationIsRunning] = useState(false);
  const [state, dispatch] = useReducer(reducer, { grid });
  const [initGrid, setInitGrid] = useState(grid);

  const updateGrid = (newGrid: any[][]) => {
    dispatch({ type: 'UPDATE', grid: newGrid });
  };

  const StartSimulation = async () => {
    setSimulationIsRunning(true);

    console.log('initGrid grid');
    console.log(initGrid);

    const modelData: MyDataModel = {
      stringData: JSON.stringify(initGrid),
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
    const updatedGrid = [...state.grid];
    setInitGrid(updatedGrid);
    setSimulationIsRunning(false);

    const response = await fetch('gameOfLife/StopSimulation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log('response');
      console.log('initGrid grid');
      console.log(initGrid);
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

  const updateCell = (rowIndex: number, colIndex: number, value: any) => {
    const updatedGrid = [...initGrid];
    updatedGrid[rowIndex][colIndex] = value;
    setInitGrid(updatedGrid);
  };

  return (
    <div>
      <button onClick={() => StartSimulation()}>Start</button>
      <button onClick={() => StopSimulation()}>Stop</button>
      <Grid
        dispatch={dispatch}
        rows={numberOfRows}
        columns={numberOfColumns}
        initGridData={initGrid}
        gridData={state.grid}
        gridTileSize={TheTilePixelSize}
        simulationIsRunning={simulationIsRunning}
        updateCelltest={updateCell}></Grid>
    </div>
  );
}
