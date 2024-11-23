import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComp = ({ data, range, type }) => {
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
      <h2>{`Line chart`}</h2>
      <LineChart
        width={500}
        height={300}
        data={filteredData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={orderBy} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComp;
