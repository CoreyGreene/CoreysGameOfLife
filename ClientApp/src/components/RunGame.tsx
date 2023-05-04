import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '../components/Grid/Grid';
import * as signalR from '@microsoft/signalr';

export default function RunGame() {
  interface MyDataModel {
    stringData: string;
  }
  const theGridSize = 50;
  const TheTilePixelSize = 10;
  const numberOfRows = theGridSize;
  const numberOfColumns = theGridSize;
  const row = new Array(numberOfColumns).fill(0);
  const grid = new Array(numberOfRows).fill(row);
  const gridString = JSON.stringify(grid);
  const json = { size: theGridSize, tiles: gridString };
  const [data, setData] = useState(JSON.parse(json.tiles));

  const StartSimulation = async () => {
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

  async function ActivateWebSocketConnection() {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7199/hub')
      .build();

    connection.on('ReceiveData', function (data) {
      setData(data);
    });

    await connection.start();
    await connection.invoke('StartSendingData');
  }

  const dataHasBeenUpdated = (updatedData: string) => {
    setData(updatedData)
  }

  return (
    <div>
      <button onClick={() => StartSimulation()}>Start</button>
      <Grid size={theGridSize} gridData={data} updateGridData={(value: string) => dataHasBeenUpdated(value)} gridTileSize={TheTilePixelSize}></Grid>
    </div>
  );
}
