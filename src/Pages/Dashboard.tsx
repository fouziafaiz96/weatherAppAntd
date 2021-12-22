import { Button, Card, Col, Row, Collapse, Input, Select } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { ChangeEvent, useEffect, useState } from "react";
import {
  fetchHistoricalData,
  fetchWeatherData,
} from "../Services/weatherServices";
import rainysun from "../Assets/rainySun.png";
import clouds from "../Assets/clouds.png";
import sunny from "../Assets/sunny.png";
import loadingGif from "../Assets/loading.gif";
import { BlackTypo, ErrorTypo } from "./elements";
import Barchart from "../Components/BarChart";
import { IGraph } from "../Common/interfaces";

export const Dashboard = () => {
  const { Panel } = Collapse;
  const { Option } = Select;

  const [searchBy, setSearchBy] = useState<string>("");
  const [name, setName] = useState<string>("Islamabad");
  const [searchQuery, setSearchQuery] = useState<string>("islamabad");
  const [showMore, setshowMore] = useState<boolean>(false);
  const [prevData, setPrevData] = useState<any>(null);
  const [graphData, setGraphData] = useState<IGraph[]>([]);
  const [error, setError] = useState<string>("");
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    setName(searchQuery);
    try {
      setLoading(true);
      const response = await fetchWeatherData(searchQuery, searchBy);
      setPrevData(response);
      if (response && response.coord) {
        setLat(response.coord.lat);
        setLng(response.coord.lon);
      }
      const historicalData = await fetchHistoricalData(
        response.coord.lat,
        response.coord.lon
      );
      let graph: IGraph[] = [];
      for (let item of historicalData["daily"]) {
        graph.push({
          date: new Date(item["dt"] * 1000).toLocaleDateString(),
          day: new Date(item["dt"] * 1000).toLocaleString("en-US", {
            weekday: "long",
          }),
          maxTemp: item["temp"]["max"],
          minTemp: item["temp"]["min"],
          description: item["weather"][0]["main"],
        });
      }
      setGraphData(graph);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      if (error.toString().includes("status code 404"))
        setError(
          "Please find weather Condition for places located in Pakistan"
        );
    }
    setLoading(false);
  };

  const displayIcon = (temp: string) => {
    if (temp == "Clouds")
      return <img src={clouds} width="70px" height="60px" alt="cloud day" />;
    else return <img src={sunny} width="60px" height="60px" alt="sunny day" />;
  };
  const toTime = (timestamp: number) => {
    let dateObj: Date = new Date(timestamp * 1000);
    let utcString = dateObj.toString();
    let time = utcString.slice(-42, -33);
    return time;
  };

  return (
    <>
      <Layout style={styles.content}>
        <Content>
          <Collapse>
            <Panel
              header="Search by City name or Zipcode"
              key="1"
              style={{ width: "100%", margin: 0 }}
            >
              <>
                <Row gutter={5}>
                  <Col xs={{ span: 8 }} sm={{ span: 8 }} lg={{ span: 5 }}>
                    <Select
                      style={{ width: "100%" }}
                      onChange={(event) => setSearchBy(event as string)}
                      value={searchBy}
                    >
                      <Option value="" disabled>
                        Select One
                      </Option>
                      <Option value="q">City Name</Option>
                      <Option value="zip">Zip Code</Option>
                    </Select>
                  </Col>
                  <Col span={10}>
                    <Input
                      placeholder="Value"
                      name="searchQuery"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSearchQuery(e.target.value)
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
          {loading ? (
            <Row style={styles.container} gutter={20}>
              <Col span={24}>
                <div style={styles.flexCenter}>
                  <img
                    src={loadingGif}
                    alt="Please wait..."
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
              </Col>
            </Row>
          ) : error ? (
            <Row style={styles.container} gutter={20}>
              <Col span={24}>
                <ErrorTypo>{error}</ErrorTypo>
              </Col>
            </Row>
          ) : (
            <Row style={styles.container} gutter={20}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                <Card
                  title={prevData && prevData.name ? prevData.name : name}
                  extra={
                    <Button onClick={() => setshowMore(!showMore)}>
                      {showMore ? "Show Less" : "Show More"}
                    </Button>
                  }
                  style={{ width: "100%" }}
                >
                  <p> {displayIcon(prevData && prevData.weather[0].main)}</p>
                  <BlackTypo>Current Temp</BlackTypo>
                  {prevData && prevData.main.temp + " \xB0C"}
                  <BlackTypo>Highest Temp</BlackTypo>
                  {prevData && prevData.main.temp_max + " \xB0C"}
                  <BlackTypo>Lowest Temp</BlackTypo>
                  {prevData && prevData.main.temp_min + " \xB0C"}
                  {showMore && (
                    <>
                      <BlackTypo>Wind Speed</BlackTypo>
                      {prevData && prevData.wind.speed + "km/h"}
                      <BlackTypo>Humidity</BlackTypo>
                      {prevData && prevData.main.humidity + "%"}
                      <BlackTypo>Pressure&nbsp;</BlackTypo>
                      {prevData && prevData.main.pressure}
                      <BlackTypo>Sunrise&nbsp;</BlackTypo>
                      {toTime(prevData && prevData.sys.sunrise)}
                      <BlackTypo>Sunset&nbsp;</BlackTypo>
                      {toTime(prevData && prevData.sys.sunset)}
                    </>
                  )}
                </Card>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 16 }}
                lg={{ span: 16 }}
              >
                {graphData && graphData.length && (
                  <Barchart chartData={graphData} />
                )}
              </Col>
            </Row>
          )}
        </Content>
      </Layout>
    </>
  );
};
const styles = {
  content: {
    height: "auto",
    minHeight: "100vh",
  },
  container: {
    width: "100%",
    padding: "2%",
    margin: 0,
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
