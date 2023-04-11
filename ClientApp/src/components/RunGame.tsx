import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '../components/Grid/Grid';
import * as signalR from '@microsoft/signalr';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export default function RunGame() {


    //const [forecasts, setForecasts] = useState<Forecast[]>([]);
    //const [loading, setLoading] = useState<boolean>(true);

    // useEffect(() => {
    //     async function populateWeatherData() {
    //         const response = await fetch('weatherforecast');
    //         const data = await response.json();
    //         setForecasts(data);
    //         setLoading(false);
    //     }
    //     populateWeatherData();
    // }, []);

    // function renderForecastsTable(forecasts: Forecast[]) {
    //     return (
    //         <table className='table table-striped' aria-labelledby='tableLabel'>
    //             <thead>
    //                 <tr>
    //                     <th>Date</th>
    //                     <th>Temp. (C)</th>
    //                     <th>Temp. (F)</th>
    //                     <th>Summary</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {forecasts.map((forecast) => (
    //                     <tr key={forecast.date}>
    //                         <td>{forecast.date}</td>
    //                         <td>{forecast.temperatureC}</td>
    //                         <td>{forecast.temperatureF}</td>
    //                         <td>{forecast.summary}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     );
    // }

    //const contents = loading ? (
    //    <p>
    //        <em>Loading...</em>
    //    </p>
    //) : (
    //    renderForecastsTable(forecasts)
    //);
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

        const response = await fetch("weatherforecast/NewMethod", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data2)
        });

        if (response.ok) {
            console.log("Data sent successfully");
            OpenTheGates();
        } else {
            console.error(`Failed to send data. Status: ${response.status}`);
        }
    };

    async function OpenTheGates() {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:44409/hub')
            .build();

        connection.on('ReceiveMessage', function (message) {
            console.log('Received message: ' + message);
        });

        await connection.start();
        console.log('WebSocket connection established.');

        // Send a message to the SignalR hub
        await connection.invoke('SendMessage', 'Hello, SignalR hub!');
    }

    /*    //try putting this in its own component and loading it? or tie it in to this one 
    import React, { useState, useEffect } from 'react';
    import * as signalR from '@microsoft/signalr';
    
    function App() {
      const [messages, setMessages] = useState([]);
    
      useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
          .withUrl('https://localhost:44409/hub')
          .build();
    
        connection.on('ReceiveMessage', (message) => {
          setMessages([...messages, message]);
        });
    
        connection.start();
    
        return () => {
          connection.stop();
        };
      }, []);
    
      return (
        <div>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      );
    }
    
    export default App;
    
    */









    // async function OpenTheGates() {
    //     const socket = new WebSocket('wss://localhost:44409/hub');


    //     socket.onopen = function () {
    //         console.log('WebSocket connection established.');
    //     };

    //     socket.onmessage = function (event) {
    //         console.log('Received message: ' + event.data);
    //     };

    //     socket.onclose = function () {
    //         console.log('WebSocket connection closed.');
    //     };

    //     socket.onerror = function (event) {
    //         console.error('WebSocket error:', event);
    //     };
    // }

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
