import React from "react";
import { Pie } from "@ant-design/charts";
import { useData } from "../utils/data";

const PieChart: React.FC = () => {
  const { data } = useData();

  const chartData = data.reduce((acc, item) => {
    const city = item.address.city;
    if (acc[city]) {
      acc[city] += 1;
    } else {
      acc[city] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(chartData).map(([city, count]) => ({
    type: city,
    value: count,
  }));

  const config = {
    appendPadding: 10,
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: "{value} ({percentage})",
      style: {
        fontSize: 19,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };

  return <Pie {...config} />;
};

export default PieChart;
