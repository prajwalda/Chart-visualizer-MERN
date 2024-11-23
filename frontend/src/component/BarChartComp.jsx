import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

const BarChartComp = ({ data, range, type }) => {
  const filteredData =
    range !== 0 ? data.filter((entry) => entry.sales > range) : data;

  const orderBy = type.includes("month")
    ? "month"
    : type.includes("week")
    ? "week"
    : type.includes("product")
    ? "product"
    : type.includes("region")
    ? "region"
    : "";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={filteredData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={orderBy} />
        <YAxis dataKey="sales" />
        <Tooltip />
        <Legend />

        <Bar
          dataKey="sales"
          fill="#82ca9d"
          activeShape={{
            fill: "gold",
            stroke: "purple",
            strokeWidth: 2,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComp;
