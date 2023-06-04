import { useEffect, useState } from "react";

export default function App(){
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const url = "http://localhost:8080/api/weather";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setWeatherData(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []); // Add closing curly brace for the useEffect hook

  return (
    <div>
      <h1>Weather Data</h1>
      {weatherData.map((data) => (
        <div key={data.id_stacji}>
          <p>Station: {data.stacja}</p>
          <p>Temperature: {data.temperatura}</p>
          <p>Wind Speed: {data.predkosc_wiatru}</p>
          {/* Render other data fields */}
          <hr />
        </div>
      ))}
    </div>
  );
}