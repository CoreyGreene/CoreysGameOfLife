import React , { useReducer }from 'react';
import { useState, useEffect } from 'react';
import Grid from '../components/Grid/Grid';
import * as signalR from '@microsoft/signalr';

  const reducer = (state: { count: number; }, action: { type: any; }) => {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      case 'DECREMENT':
        return { count: state.count - 1 };
      default:
        throw new Error('Unknown action type');
    }
  };

export default function RunGame() {
  interface MyDataModel {
    stringData: string;
  }

  const TheTilePixelSize = 8;
  const numberOfRows = 50;
  const numberOfColumns = 100;
  const row = new Array(numberOfColumns).fill(0);
  const grid = new Array(numberOfRows).fill(row);
  const gridString = JSON.stringify(grid);
  const json = { rows: numberOfRows, columns: numberOfColumns, tiles: gridString };
  const [data, setData] = useState(JSON.parse(json.tiles));
  const [simulationIsRunning, setSimulationIsRunning] = useState(false);

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  useEffect(() => {
    console.log('Count changed:', state.count);
  }, [state.count]);

  const StartSimulation = async () => {
    setSimulationIsRunning(true);
    const modelData: MyDataModel = {
      stringData: JSON.stringify(data),
    };

    const response = await fetch("gameOfLife/StartSimulation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(modelData)
    });

    if (response.ok) {
      ActivateWebSocketConnection();
    } else {
      console.error(`Failed to send data. Status: ${response.status}`);
    }
  };

  const StopSimulation = async () => {
    setSimulationIsRunning(false);

    const response = await fetch("gameOfLife/StopSimulation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });


  };

  async function ActivateWebSocketConnection() {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7199/hub')
      .build();

    connection.on('ReceiveData', function (data) {
      setData(data);
      decrement();
    });

    await connection.start();
    await connection.invoke('StartSendingData');
  }

  const dataHasBeenUpdated = (updatedData: string) => {
    setData(updatedData)
  }

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={() => StartSimulation()}>Start</button>
      <button onClick={() => StopSimulation()}>Stop</button>
      <Grid dispatch={dispatch} rows={numberOfRows} columns={numberOfColumns} gridData={data} updateGridData={(value: string) => dataHasBeenUpdated(value)} gridTileSize={TheTilePixelSize} simulationIsRunning={simulationIsRunning}></Grid>
    </div >
  );
}
