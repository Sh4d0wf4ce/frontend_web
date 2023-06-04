import { useEffect, useState } from "react";

export default function App(){
  const [weatherData, setWeatherData] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/stacje");
        const data = await response.json();
        setStationList(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let url = "http://localhost:8080/api/weather";
  
        if (selectedStation) {
          url += `?station=${selectedStation}`;
        }
  
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.log("error", error);
      }
    };
  
    fetchWeatherData();
  }, [selectedStation]);
  

  return (
    <div>
      <h1>Weather Data</h1>
      <label htmlFor="station-select">Select a station: </label>
      <select id="station-select" value={selectedStation} onChange={handleStationChange}>
        <option value="">All Stations</option>
        {stationList.map((station, index) => (
          <option key={index} value={station}>
            {station}
          </option>
        ))}
      </select>
      <hr />
      {weatherData.map((data) => (
        <div key={data.id_stacji}>
        <p>Stacja: {data.stacja}</p>
        <p>Data pomiaru: {data.data_pomiaru}</p>
        <p>Godzina pomiaru: {data.godzina_pomiaru}</p>
        <p>Temperatura: {data.temperatura}</p>
        <p>Prędkość wiatru: {data.predkosc_wiatru}</p>
        <p>Kierunek wiatru: {data.kierunek_wiatru}</p>
        <p>Wilgotność względna: {data.wilgotnosc_wzgledna}</p>
        <p>Suma opadów: {data.suma_opadu}</p>
        <p>Ciśnienie: {data.cisnienie}</p> 
          <hr />
        </div>
      ))}
    </div>
  );
}