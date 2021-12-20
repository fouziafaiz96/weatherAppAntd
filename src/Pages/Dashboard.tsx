import { Button, Card, Col, Row, Collapse, Input } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { ChangeEvent, useEffect, useState } from "react";
import {
  fetchHistoricalData,
  fetchWeatherData,
} from "../Services/weatherServices";
import { weatherData } from "../Common/weather";
import cloud from "../Assets/rainySun.png";
import sunny from "../Assets/sunny.png";
import { BlackTypo } from "./elements";
import Barchart from "../Components/BarChart";

export const Dashboard = () => {
  const { Panel } = Collapse;
  const [searchBy, setSearchBy] = useState<string>("q");
  const [name, setName] = useState<string>("Islamabad");
  const [searchQuery, setSearchQuery] = useState<string>("lahore");
  const [unit, setUnit] = useState<string>("metric");
  const [showMore, setshowMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  //   const [weatherData, setWeather] = useState<any>([]);
  const [prevData, setPrevData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [lat, setLat] = useState<number>(33);
  const [lng, setLng] = useState<number>(73);

  useEffect(() => {
    callApi();
  }, []);
  const callApi = async () => {
    try {
      const response = await fetchHistoricalData(name);
      console.log(response);

      setPrevData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const displayIcon = (temp: string) => {
    if (temp == "Clouds")
      return <img src={cloud} width="85px" height="85px" alt="cloud day" />;
    else return <img src={sunny} width="85px" height="85px" alt="sunny day" />;
  };
  const toTime = (timestamp: number) => {
    let dateObj: any = new Date(timestamp * 1000);
    let utcString = dateObj.toString();
    let time = utcString.slice(-42, -33);
    return time;
  };

  return (
    <>
      <Layout>
        <Content style={styles.content}>
          <Collapse>
            <Panel
              header="Search by city name"
              key="1"
              style={{ width: "100%", margin: 0 }}
            >
              <>
                <Row>
                  <Col span={10}>
                    <Input
                      placeholder="City Name"
                      name="name"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                    />
                  </Col>
                  <Col span={4}>
                    <Button type="primary" onClick={callApi}>
                      Search
                    </Button>
                  </Col>
                </Row>
              </>
            </Panel>
          </Collapse>
          <Row style={styles.container} gutter={20}>
            <Col span={8}>
              <Card
                title={`${name} weather`}
                extra={
                  <Button onClick={() => setshowMore(!showMore)}>
                    {showMore ? "Show Less" : "Show More"}
                  </Button>
                }
                style={{ width: "100%" }}
              >
                <p> {displayIcon(prevData && prevData[0].weather[0].main)}</p>
                <BlackTypo>Highest&nbsp;&nbsp;</BlackTypo>
                {prevData && prevData[0].main.temp_max + " \xB0C"}
                <BlackTypo>Lowest&nbsp;&nbsp;</BlackTypo>
                {prevData && prevData[0].main.temp_min + " \xB0C"}
                {showMore && (
                  <>
                    <BlackTypo>Wind Speed</BlackTypo>
                    {prevData && prevData[0].wind.speed + "km/h"}
                    <BlackTypo>Humidity</BlackTypo>
                    {prevData && prevData[0].main.humidity + "%"}
                    <BlackTypo>Pressure&nbsp;</BlackTypo>
                    {prevData && prevData[0].main.pressure}
                    <BlackTypo>Sunrise&nbsp;</BlackTypo>
                    {toTime(prevData && prevData[0].sys.sunrise)}
                    <BlackTypo>Sunset&nbsp;</BlackTypo>
                    {toTime(prevData && prevData[0].sys.sunset)}
                  </>
                )}
              </Card>
            </Col>
            <Col span={16}>
              <Barchart />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
const styles = {
  content: {
    height: "100vh",
  },
  container: {
    width: "100%",
    padding: "2%",
  },
};
