import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '../components/Grid/Grid';

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

    const json = {
        size: 20,
        tiles: "[[1,0,1],[1,1,1],[0,1,1]]"
    };


    return (
        <div>
            <h1> step 1, show a grid</h1>
            <h1> step 2, allows clicks to change tile color</h1>
            <h1> step 3, save grid and clicks to array</h1>
            <h1> step 4, send array to backend for "logic"</h1>
            <h1> step 5, send array back to front end to view logic</h1>


            <Grid size={json.size} gridData={json.tiles}></Grid>

        </div>
    );
}
