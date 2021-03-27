import React, { Fragment, useEffect, useState } from "react";
import "./style.scss";
import cookies from "../../cookie/cookie";

const host = process.env.REACT_APP_REACT_HOST;

const AddFunds = (props) => {
  const [user, setuser] = useState([]);
  const [inputData, setinputData] = useState([]);
  const [flag, setFlag] = useState(false);


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
        console.log(result,">>>>>>>>>>>")

        return setuser(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [flag]);


  const handleAddFunds = () => {
    let url = `${host}/users/funds`;
    const token = cookies.get("authToken");
    const userId = cookies.get("userId");
    const data = {id: userId, funds: inputData}
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
        // dispatch(result)
        setFlag(false);
        setFlag(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    let data = e.target.value;
    setinputData(data);
  };


  return (
    <div className="Stocks-container-funds">
            <div>
                <b>
                    Total Funds available :-
                </b>
                {user.funds}
            </div>
            <div className="add-funds">
                Add funds to your account
                <input onChange={(e) => handleChange(e)}/>
                <button onClick={handleAddFunds}>Add Funds</button>
            </div>
    </div>
  );
};

export default AddFunds;
