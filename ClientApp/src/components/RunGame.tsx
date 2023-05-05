import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '../components/Grid/Grid';
import * as signalR from '@microsoft/signalr';

export default function RunGame() {
  interface MyDataModel {
    stringData: string;
  }

  const TheTilePixelSize = 8;
  const numberOfRows = 20;
  const numberOfColumns = 40;
  const row = new Array(numberOfColumns).fill(0);
  const grid = new Array(numberOfRows).fill(row);
  const gridString = JSON.stringify(grid);
    const json = { rows: numberOfRows, columns: numberOfColumns, tiles: gridString };
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

   // var hasTimeStarted = false;
   // var count = 0;
   // var startTime: number

  async function ActivateWebSocketConnection() {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7199/hub')
      .build();

      connection.on('ReceiveData', function (data) {
         //if (!hasTimeStarted) {
         //    hasTimeStarted = true
         //    count = count + 1
         //    startTime = performance.now()
         //} else {
         //    if (count == 99) {
         //        var endTime = performance.now()
         //
         //        console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
         //    } else {
         //        count = count + 1
         //    }
         //}
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
          <Grid rows={numberOfRows} columns={numberOfColumns} gridData={data} updateGridData={(value: string) => dataHasBeenUpdated(value)} gridTileSize={TheTilePixelSize}></Grid>
    </div>
  );
}
