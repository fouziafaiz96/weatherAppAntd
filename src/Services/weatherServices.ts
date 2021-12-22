import axios from "axios";
const API_KEY = "a6e0ca799939d44bba08ab47b4cb301d";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const fetchWeatherData = async (
  searchQuery: string,
  searchBy: string
) => {
  if (!searchBy) searchBy = "q";
  let url = `https://api.openweathermap.org/data/2.5/weather?${searchBy}=${searchQuery},pk&appid=${API_KEY}&units=metric`;
  try {
    let res = await axios.get(url, { headers });
    console.log("Daily weather Update", res.data);
    return res.data;
  } catch (error: any) {
    throw new Error("Error in fetching weather data " + error);
  }
};

export const fetchHistoricalData = async (lat: number, lng: number) => {
  if (lat && lng) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&appid=${API_KEY}&units=metric`;

    try {
      let res = await axios.get(url, { headers });
      console.log("Data of seven days", res.data);
      return res.data;
    } catch (error: any) {
      throw new Error("Error in historical data " + error);
    }
  }
};
