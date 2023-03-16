import React from 'react';
import { useState, useEffect } from 'react';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export default function FetchData() {
    const [forecasts, setForecasts] = useState<Forecast[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function populateWeatherData() {
            const response = await fetch('weatherforecast');
            const data = await response.json();
            setForecasts(data);
            setLoading(false);
        }
        populateWeatherData();
    }, []);

    function renderForecastsTable(forecasts: Forecast[]) {
        return (
            <table className='table table-striped' aria-labelledby='tableLabel'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map((forecast) => (
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    const contents = loading ? (
        <p>
            <em>Loading...</em>
        </p>
    ) : (
        renderForecastsTable(forecasts)
    );

    return (
        <div>
            <h1 id='tableLabel'>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
}
