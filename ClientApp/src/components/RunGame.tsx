import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '../components/Grid/Grid';
import * as signalR from '@microsoft/signalr';

export default function RunGame() {

  const numberOfRows = 20;
  const numberOfColumns = 20;
  const row = new Array(numberOfColumns).fill(0);
  const grid = new Array(numberOfRows).fill(row);

  const gridString = JSON.stringify(grid);

  const json = {
    size: 20,
    tiles: gridString
  };

  const [data, setData] = useState(JSON.parse(json.tiles));

  const start = () => {
    console.log(data)
    callNewMethod();
  }
  interface MyDataModel {
    stringData: string;
  }

  const sendData = async () => {
    const data2: MyDataModel = {
      stringData: JSON.stringify(data),
    };

    const response = await fetch("gameOfLife/StartSimulation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data2)
    });

    if (response.ok) {
      console.log("Data sent successfully");
      CallTheSocket();
    } else {
      console.error(`Failed to send data. Status: ${response.status}`);
    }
  };

  async function CallTheSocket() {

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7199/hub')
      .build();

    connection.on('ReceiveData', function (data) {
      console.log('ReceiveData: ' + data);
      setData(data);
    });

    await connection.start();
    await connection.invoke('StartSendingData');
  }

  async function callNewMethod() {

    sendData();

  }

  const dataHasBeenUpdated = (updatedData: string) => {
    setData(updatedData)
  }

  return (
    <div>
      <h1> step 1, show a grid</h1>
      <h1> step 2, allows clicks to change tile color</h1>
      <h1> step 3, save grid and clicks to array</h1>
      <h1> step 4, send array to backend for "logic"</h1>
      <h1> step 5, send array back to front end to view logic</h1>
      <h1>experiment with web sockets, redux, and anything that would improve performance</h1>

      <button onClick={start}>Start</button>
      <Grid size={json.size} gridData={data} updateGridData={(value: string) => dataHasBeenUpdated(value)}></Grid>

    </div>
  );
}
