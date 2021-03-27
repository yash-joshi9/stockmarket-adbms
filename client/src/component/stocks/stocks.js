import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";

const host = process.env.REACT_APP_REACT_HOST;

const Stock = (props) => {
  const [stock, setStock] = useState([]);

  
  useEffect(async () => {
    let url = `${host}/stocks`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        origin: "*",
      },
      redirect: "follow",
    })
      .then((response) => response.json())
      .then(async (result) => {
        const { error } = result;
        if (error) {
        }
        // dispatch(result)
        return setStock(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleClick = async (item) => {
    await props.onGetStocksByName(item.name)
    props.history.push(`allStocks/${item.name}`)
  }

  return (
    <div className="Stocks-container">
      {stock ? (
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
              <tr className="table-row" key={key} onClick={(e) => handleClick(item)}>
                <td >{item.series}</td>
                <td >{item.name}</td>
                <td >{item.open}</td>
                <td >{item.high}</td>
                <td >{item.low}</td>
                <td >{item.close}</td>
                <td >{item.last}</td>
                <td >{item.prevClose}</td>
                <td >{item.totalQuantTraded}</td>
                <td >{item.numTradingTransaction}</td>
                <td >{item.totalTrades}</td>
                <td >{item.ISIN}</td>
              </tr>
            </Fragment>
          ))}
        </table>
      ) : (
        ""
      )}
    </div>
  );
};

export default Stock;
