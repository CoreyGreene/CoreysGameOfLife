import React , { useReducer }from 'react';
import { useState, useEffect } from 'react';
import Grid from '../components/Grid/Grid';
import * as signalR from '@microsoft/signalr';



interface State {
  grid: any[][];
}

interface UpdateAction {
  type: 'UPDATE';
  grid: any[][];
}

interface UpdateCellAction {
  type: 'UPDATE_CELL';
  rowIndex: number;
  colIndex: number;
  value: any;
}

type Action = UpdateAction | UpdateCellAction;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        grid: action.grid,
      };
    case 'UPDATE_CELL':
      return {
        ...state,
        grid: state.grid.map((row, rowIndex) =>
          rowIndex === action.rowIndex
            ? row.map((cell, colIndex) =>
                colIndex === action.colIndex ? action.value : cell
              )
            : row
        ),
      };
    default:
      return state;
  }
};
export default function RunGame() {
  interface MyDataModel {
    stringData: string;
  }

const TheTilePixelSize = 8;
const numberOfRows = 50;
const numberOfColumns = 100;
const row = Array.from({ length: numberOfColumns }, () => 0);
const grid = Array.from({ length: numberOfRows }, () => [...row]);
const json = { rows: numberOfRows, columns: numberOfColumns, tiles: JSON.stringify(grid) };
const [simulationIsRunning, setSimulationIsRunning] = useState(false);

const [state, dispatch] = useReducer(reducer, { grid }); // Pass the initial state directly

// ...


    const updateGrid = (newGrid: any[][]) => {
    dispatch({ type: 'UPDATE', grid: newGrid });
  };

  const StartSimulation = async () => {
    setSimulationIsRunning(true);
    const modelData: MyDataModel = {
      stringData: JSON.stringify(state.grid),
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
      updateGrid(data)
    });

    await connection.start();
    await connection.invoke('StartSendingData');
  }

  return (
    <div>
      <button onClick={() => StartSimulation()}>Start</button>
      <button onClick={() => StopSimulation()}>Stop</button>
      <Grid dispatch={dispatch} rows={numberOfRows} columns={numberOfColumns} gridData={state.grid} gridTileSize={TheTilePixelSize} simulationIsRunning={simulationIsRunning}></Grid>
    </div >
  );
}
