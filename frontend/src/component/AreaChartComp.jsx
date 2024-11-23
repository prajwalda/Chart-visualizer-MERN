import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AreaChartComp = ({ data, range, type }) => {
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
      <h3>Area Chart</h3>
      <AreaChart
        width={730}
        height={300}
        data={filteredData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={orderBy} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          fill="#8884d8"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComp;
