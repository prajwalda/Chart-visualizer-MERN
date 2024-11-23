import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartComp = ({ data, range ,type}) => {
  const filteredData =
    range !== 0 ? data.filter((item) => item.sales > range) : data;

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
    <div style={{ width: "100%", height: "100%" }}>
      <h2 style={{ textAlign: "center" }}>Product Sales</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={160}
            fill="#8884d8"
            dataKey="sales"
            nameKey={orderBy}
          >
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComp;
