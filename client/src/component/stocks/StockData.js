import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  stockDemoData,
  tradedData,
  tradedDataTransaction,
} from "../stockDataDemo";
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
  const [flag, setFlag] = useState([]);
  const [errorUser, setErrorUser] = useState();

  const [user, setuser] = useState([]);
  const [inputData, setinputData] = useState([]);
  const [stockRandInt, setStockRandInt] = useState([]);
  const [stockTransac, setstockTransac] = useState([]);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const handleBuyClick = () => {
    if (!inputData.length) {
      return 0;
    }

    const { name } = props.match.params;
    const token = cookies.get("authToken");
    const userId = cookies.get("userId");

    let url = `${host}/stock-bucket-add`;
    const data = { name, userId, inputData };
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
          setErrorUser(error);
          return;
        }

        //   const { token, allStock} = result;
        //   const getToken = cookies.get("authToken")

        //   if (getToken == undefined) {
        //     cookies.set("authToken", token)
        //     cookies.set("userId", _id)
        //   }
        // setStock(result);

        props.history.push("/myStocks");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        setStockRandInt(getRandomInt(10));
        setstockTransac(getRandomInt(5));
        return setStock(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    let data = e.target.value;
    setinputData(data);
  };
  useEffect(async () => {
    const token = cookies.get("authToken");
    const userId = cookies.get("userId");

    let url = `${host}/users/me`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
        origin: "*",
      },
      redirect: "follow",
    })
      .then((response) => response.json())
      .then(async (result) => {
        const { error } = result;
        if (error) {
        }
        setFlag(true);

        return setuser(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [flag]);

  return (
    <div className="Stocks-data-container">
      <div className="stock-wapper-graphs">
        <div className="stock-title">
          <b>{stock.length && stock[0].name}</b>
        </div>
        <table className="stock-table">
          <tr>
            <th>series</th>
            <th>name</th>
            <th>open</th>
            <th>high</th>
            <th>low</th>
            <th>close</th>
            <th>last</th>
            <th>prevClose</th>
            <th>totalQuantTraded</th>
            <th>numTradingTransaction</th>
            <th>totalTrades</th>
            <th>ISIN</th>
          </tr>
          {stock.map((item, key) => (
            <Fragment>
              <tr className="table-row" key={key}>
                <td>{item.series}</td>
                <td>{item.name}</td>
                <td>{item.open}</td>
                <td>{item.high}</td>
                <td>{item.low}</td>
                <td>{item.close}</td>
                <td>{item.last}</td>
                <td>{item.prevClose}</td>
                <td>{item.totalQuantTraded}</td>
                <td>{item.numTradingTransaction}</td>
                <td>{item.totalTrades}</td>
                <td>{item.ISIN}</td>
              </tr>
            </Fragment>
          ))}
        </table>

        <div className="funds-hve">
          <b>Total Funds available :-</b>
          {user.funds}
        </div>
        <div className="input-buy-stock">
          Enter the amount of stocks to buy at the rate of{" "}
          {stock.length && stock[0].close}
          <div className="input-div">
            <input
              type="number"
              onChange={(e) => handleChange(e)}
              value={inputData}
            />
          </div>
          <div></div>
        </div>
        <div className="button-wrapper">
          <button onClick={() => handleBuyClick()}>Buy Stock</button>
        </div>

        <div className="error-tag"><b>{errorUser ? errorUser : ""} </b></div>

        <div className="stock-data-graph-wapper">
          <div className="graph-desc">
            <div>Stocks Data of Last 10 years</div>
            <LineChart
              width={400}
              height={400}
              data={stockDemoData[stockRandInt]}
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
          </div>
          <div className="graph-desc">
            <div>Traded Amount of the Stock</div>
            <LineChart
              width={400}
              height={400}
              data={tradedData[stockTransac]}
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
              width={400}
              height={400}
              data={tradedDataTransaction[stockTransac]}
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
    </div>
  );
};

export default StockData;
