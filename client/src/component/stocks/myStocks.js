import React, { Fragment, useEffect, useState } from "react";
import "./style.scss";
import cookies from "../../cookie/cookie";

const host = process.env.REACT_APP_REACT_HOST;

const MyStocks = (props) => {
  const [stock, setStock] = useState([]);
  const [inputData, setinputData] = useState([]);
  const [manError, setmanError] = useState([]);
  const [sellData, setsellData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [user, setuser] = useState([]);

  useEffect(async () => {
    const token = cookies.get("authToken");
    const userId = cookies.get("userId");

    let url = `${host}/my-stocks`;
    const data = { userId };

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
        setFlag(true);

        return setStock(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [flag]);

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

  const handleSell = (e) => {
    const quant = e.quantity;

    if (inputData > quant) {
      setmanError("Quantity more than you have");
    } else {
      const token = cookies.get("authToken");
      const userId = cookies.get("userId");

      let url = `${host}/stock-bucket-delete`;
      const data = { name: e.name, quantity: inputData, userId };
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
          setStock(result);
          setFlag(false);
          setmanError("");
          return setFlag(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    let data = e.target.value;
    setinputData(data);
    setsellData(data);
  };

  return (
    <div className="Stocks-data-container">
      <div className="stocks-header-own">
        Stocks Owned
      </div>
      {flag && (
        <div className="stock-wapper-graphs-my">
          {stock.length &&
            stock.map((item, key) => (
              <div key={key} className="my-stock-wrapper">
                <div className="my-stock-name">
                  <b>name:</b> {item.name}
                </div>
                <div className="my-stock-quantity">
                  <div>
                    <b>Quantity Owned:</b> {item.quantity}
                  </div>
                  <div>
                    <b>Closing Price:</b> {item.close}
                  </div>
                  <div>
                    <b>Price on selling:</b>
                    {sellData * item.close}
                  </div>
                </div>
                <div className="sell-stock">
                  Enter the quantity to sell the stock
                  <input type="number" onChange={(e) => handleChange(e)} />
                  <button className="button" onClick={() => handleSell(item)}>
                    Sell Stock
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="total-funds">
        <b>Total Funds available :-</b>
        {user.funds}
      </div>
      <div>{manError ? manError : ""}</div>
    </div>
  );
};

export default MyStocks;
