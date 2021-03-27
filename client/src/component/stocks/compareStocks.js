import React, { Fragment, useEffect, useState } from "react";
import "./style.scss";
import cookies from "../../cookie/cookie";
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
import {
  stockDemoData,
  tradedData,
  tradedDataTransaction,
} from "../stockDataDemo";
const host = process.env.REACT_APP_REACT_HOST;

const CompareStocks = (props) => {
  const [stock, setStock] = useState([]);
  const [Stockfirst, setStockfirst] = useState("");
  const [stockSecond, setStockSecond] = useState("");
  const [stockRandInt, setStockRandInt] = useState([]);
  const [stockTransac, setstockTransac] = useState([]);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const handleClick = (e) => {
    const token = cookies.get("authToken");
    const userId = cookies.get("userId");

    const data = { Stockfirst, stockSecond };
    let url = `${host}/stock-compare`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
        origin: "*",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then(async (result) => {
        const { error } = result;
        if (error) {
        }

        setStockRandInt(getRandomInt(8));
        setstockTransac(getRandomInt(3));
        return setStock(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlestockfirst = (e) => {
    const data = e.target.value;
    setStockfirst(data);
  };

  const handlestockSecond = (e) => {
    const data = e.target.value;
    setStockSecond(data);
  };

  return (
    <div className="Stocks-data-container">
      <div className="stocks-header-own">Compare Stocks</div>
      <div className="Stocks-compare">
        <div>
          <span>Enter name of 1st stock</span>
          <input onChange={(e) => handlestockfirst(e)} />
        </div>
        <div>
          <span>Enter name of 1st stock</span>
          <input onChange={(e) => handlestockSecond(e)} />
        </div>
      </div>
      <div className="button-compare">
        <button onClick={handleClick}>Submit</button>
      </div>
      <div className="compare-stocks">
        {stock.length &&
          stock.map((item, key) => (
            <div key={key} className="my-stock-wrapper-compare">
              <div className="my-stock-name">
                <b> {item.name} </b>
              </div>
              <div className="my-stock-compare">
                <div>
                  <b>Closing Price:</b> {item.close}
                </div>
                <div>
                  <b>high:</b> {item.high}
                </div>
                <div>
                  <b>low:</b> {item.low}
                </div>
                <div>
                  <b>numTradingTransaction:</b> {item.numTradingTransaction}
                </div>
                <div>
                  <b>open:</b> {item.open}
                </div>
                <div>
                  <b>prevClose:</b> {item.prevClose}
                </div>
                <div>
                  <b>totalQuantTraded:</b> {item.totalQuantTraded}
                </div>
                <div>
                  <b>totalTrades:</b> {item.totalTrades}
                </div>
              </div>
              <div className="stock-data-graph-wapper">
                <div className="graph-desc">
                  <div>Stocks Data of Last 10 years</div>
                  <LineChart
                    width={300}
                    height={300}
                    data={stockDemoData[stockRandInt + key]}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line
                      type="monotone"
                      dataKey="open"
                      stroke="#ff7300"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="high"
                      stroke="#387908"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="low"
                      stroke="red"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="close"
                      stroke="blue"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="last"
                      stroke="pink"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="prevClose"
                      stroke="yellow"
                      yAxisId={0}
                    />
                  </LineChart>
                </div>
                <div className="graph-desc">
                  <div>Traded Amount of the Stock</div>
                  <LineChart
                    width={300}
                    height={300}
                    data={tradedData[stockTransac + key]}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line
                      type="monotone"
                      dataKey="totalQuantTraded"
                      stroke="#ff7300"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="numTradingTransaction"
                      stroke="#387908"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalTrades"
                      stroke="red"
                      yAxisId={0}
                    />
                  </LineChart>
                </div>
                <div className="graph-desc">
                  <div>Total Transaction Amount of the Stock</div>
                  <LineChart
                    width={300}
                    height={300}
                    data={tradedDataTransaction[stockTransac + key]}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line
                      type="monotone"
                      dataKey="totalQuantTraded"
                      stroke="#ff7300"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="numTradingTransaction"
                      stroke="#387908"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalTrades"
                      stroke="red"
                      yAxisId={0}
                    />
                  </LineChart>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CompareStocks;
