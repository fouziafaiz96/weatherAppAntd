import React, { useRef, useLayoutEffect, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { IGraph } from "../Common/interfaces";
interface IProps {
  chartData: IGraph[];
}
function BarChart({ chartData }: IProps) {
  useEffect(() => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    if (chartData) {
      for (let item of chartData) {
        chart.data.push({
          date: item["date"],
          value: item["maxTemp"],
          value2: item["minTemp"],
          desc: item["description"],
          day: item["day"],
        });
      }
    }
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    createSeries("value", "High");
    createSeries("value2", "Low");

    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();
    function createSeries(field: string, name: string) {
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.tooltipText = "{day}: [b]{valueY} \xB0C {desc}";
      series.strokeWidth = 2;

      series.smoothing = "monotoneX";

      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = am4core.color("#fff");
      bullet.circle.strokeWidth = 2;

      return series;
    }
    // Create axes
  }, [chartData]);
  return <div id={"chartdiv"} style={{ width: "100%", height: "500px" }}></div>;
}
export default BarChart;
