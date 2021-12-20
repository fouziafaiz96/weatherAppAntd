import axios from "axios";
const API_KEY = "a6e0ca799939d44bba08ab47b4cb301d";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const fetchWeatherData = async () => {
  var options: any = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    params: {
      q: "islamabad,pk",
      lat: "33",
      lon: "73",
      callback: "test",
      id: "2172797",
      lang: "null",
      units: "imperial",
      mode: "xml",
    },
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "a6e0ca799939d44bba08ab47b4cb301d",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const fetchHistoricalData = async (city: string) => {
  let prevDates: any;
  var dataToSend = Array();

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  try {
    await axios.get(url, { headers }).then((res) => {
      dataToSend.push(res.data);
    });
  } catch (error: any) {
    return error;
  }

  return dataToSend;
};
