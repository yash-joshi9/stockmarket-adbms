import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { stockDemoData, tradedData } from "../stockDataDemo";
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

const host = process.env.REACT_APP_REACT_HOST;

const StockData = (props) => {
  const [stock, setStock] = useState([]);

  useEffect(async () => {
    const { name } = props.match.params;
    const token = cookies.get("authToken");
    let url = `${host}/stocks-by-name`;
    const data = { name };
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

        //   const { token, allStock} = result;
        //   const getToken = cookies.get("authToken")

        //   if (getToken == undefined) {
        //     cookies.set("authToken", token)
        //     cookies.set("userId", _id)
        //   }
        return setStock(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="Stocks-data-container">
      {stock.map((item, key) => (
        <div key={key}>
          <div>{item.name}</div>
          <div>{item.series}</div>
          <div>{item.open}</div>
          <div>{item.high}</div>
          <div>{item.low}</div>
          <div>{item.close}</div>
          <div>{item.last}</div>
          <div>{item.prevClose}</div>
          <div>{item.totalQuantTraded}</div>
          <div>{item.numTradingTransaction}</div>
          <div>{item.totalTrades}</div>
          <div>{item.ISIN}</div>
        </div>
      ))}

      <div className="stock-data-graph-wapper">
        <LineChart
          width={400}
          height={400}
          data={stockDemoData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="open" stroke="#ff7300" yAxisId={0} />
          <Line type="monotone" dataKey="high" stroke="#387908" yAxisId={0} />
          <Line type="monotone" dataKey="low" stroke="red" yAxisId={0} />
          <Line type="monotone" dataKey="close" stroke="blue" yAxisId={0} />
          <Line type="monotone" dataKey="last" stroke="pink" yAxisId={0} />
          <Line
            type="monotone"
            dataKey="prevClose"
            stroke="yellow"
            yAxisId={0}
          />
        </LineChart>

        <LineChart
          width={400}
          height={400}
          data={tradedData}
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
  );
};

export default StockData;
