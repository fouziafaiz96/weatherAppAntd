import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
interface IProps {
  data: any;
}
export const Barchart = () => {
  let chartRef = useRef();
  useLayoutEffect(() => {
    am4core.useTheme(am4themes_animated);
    if (!chartRef.current) {
      // Create chart instance
      var chart = am4core.create("barchartdiv", am4charts.XYChart);

      chart.data = [
        {
          country: "Abusive",
          visits: 2500,
        },
        {
          country: "Supportive",
          visits: 1882,
        },
        {
          country: "Positive",
          visits: 1809,
        },
        {
          country: "Negative",
          visits: 1620,
        },
        {
          country: "Anti-state",
          visits: 1122,
        },
        {
          country: "Blasphemy",
          visits: 500,
        },
      ];

      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.labels.template.fill = am4core.color();
      categoryAxis.renderer.labels.template.adapter.add(
        "dy",
        function (dy: any, target: any) {
          if (target.dataItem && target.dataItem.index && 2 == 2) {
            return dy + 25;
          }
          return dy;
        }
      );

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      valueAxis.renderer.labels.template.fill = am4core.color("#ffffff");
      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "country";
      series.dataFields.categoryX = "visits";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = 0.8;

      var columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;

      series.heatRules.push({
        target: series.columns.template,
        property: "fill",
        min: am4core.color("lightblue"),
        max: am4core.color("lightblue"),
        dataField: "valueY",
      });
    }

    return () => {
      // chartRef.current && chartRef.current.dispose();
      // chartRef.current = null;
    };
  }, []);
  return (
    <div id="barchartdiv" style={{ width: "100%", height: "300px" }}></div>
  );
};
export default Barchart;
