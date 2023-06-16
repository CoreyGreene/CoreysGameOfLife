import React, { useReducer, useEffect } from 'react';
import { useState } from 'react';
import Grid from '../components/Grid/Grid';
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

  const storeNumberOfRows = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = parseInt(event.target.value, 10);
    setNumberOfRows(inputNumber);
  };

  const storeNumberOfColumns = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = parseInt(event.target.value, 10);
    setNumberOfColumns(inputNumber);
  };

  return (
    <div>
      <h2>numberof rows</h2>
      <input type="number" value={numberOfRows} onChange={storeNumberOfRows} disabled={simulationIsRunning} />
      <h2>numberof columns</h2>
      <input type="number" value={numberOfColumns} onChange={storeNumberOfColumns} disabled={simulationIsRunning} />
      <button onClick={() => StartSimulation()}>Start</button>
      <button onClick={() => StopSimulation()}>Stop</button>
      <button onClick={() => ClearSimulation()}>Clear</button>
      <Grid
        dispatch={dispatch}
        rows={numberOfRows}
        columns={numberOfColumns}
        gridData={state.grid}
        gridTileSize={TheTilePixelSize}
        simulationIsRunning={simulationIsRunning}></Grid>
    </div>
  );
}
