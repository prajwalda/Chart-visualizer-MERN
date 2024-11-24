import axios from "axios";
import React, { useState, useEffect } from "react";
import LineChartComp from "../component/LineChartComp";
import PieChartComp from "../component/PieChartComp";
import BarChartComp from "../component/BarChartComp";
import AreaChartComp from "../component/AreaChartComp";

const HomePage = () => {
  const [mongodbData, setMongodbData] = useState({});
  const [sqlData, setSqlData] = useState([]);
  const [error, setError] = useState(false);
  const [range, setRange] = useState(0);
  const [dataType, setDataType] = useState("monthlySales");
  const [chartType, setChartType] = useState("line");

  const apiCall = async () => {
    try {
      const responseMongo = await axios.get(
        "https://chart-visualizer-mern.onrender.com/mongodb"
      );
      setMongodbData(responseMongo.data[0] || {});
      const responseSql = await axios.get(
        "https://chart-visualizer-mern.onrender.com/mysql"
      );
      setSqlData(responseSql.data || []);
      setError(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(true);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const renderChart = (data) => {
    switch (chartType) {
      case "line":
        return <LineChartComp data={data} range={range} type={dataType} />;
      case "bar":
        return <BarChartComp data={data} range={range} type={dataType} />;
      case "pie":
        return <PieChartComp data={data} range={range} type={dataType} />;
      case "area":
        return <AreaChartComp data={data} range={range} type={dataType} />;
      default:
        return <LineChartComp data={data} range={range} type={dataType} />;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Sales Dashboard
      </h1>

      {error ? (
        <p className="text-red-500 text-center">
          Error fetching data. Please try again later.
        </p>
      ) : (
        <>
          {/* Range input */}
          <div className="mb-6 text-center">
            <input
              type="number"
              placeholder="Enter a range"
              className="shadow-md p-3 outline-none border-2 border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setRange(Number(e.target.value))}
            />
          </div>

          {/* Dropdown Data Type */}
          <div className="mb-6 text-center">
            <label className="mr-4 text-lg text-gray-700">
              Select Data Type:{" "}
            </label>
            <select
              value={dataType}
              onChange={handleDataTypeChange}
              className="p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="monthlySales">Monthly Sales</option>
              <option value="weeklySales">Weekly Sales</option>
              <option value="productSales">Product Sales</option>
              <option value="regionalSales">Regional Sales</option>
            </select>
          </div>

          {/* Dropdown Chart Type */}
          <div className="mb-6 text-center">
            <label className="mr-4 text-lg text-gray-700">
              Select Chart Type:{" "}
            </label>
            <select
              value={chartType}
              onChange={handleChartTypeChange}
              className="p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="area">Area Chart</option>
            </select>
          </div>

          <div className="flex flex-col gap-10 justify-center items-center">
            {/* mongo db data */}
            <p className="text-lg font-semibold text-gray-700 underline decoration-indigo-500">
              MongoDB Insights
            </p>
            {mongodbData[dataType] && renderChart(mongodbData[dataType])}

            {/* sql database */}
            <p className="text-lg font-semibold text-gray-700 underline decoration-indigo-500">
              MySQL Insights
            </p>
            {sqlData[dataType] && renderChart(sqlData[dataType])}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
