import cookies from "../cookie/cookie";
const host = process.env.REACT_APP_REACT_HOST;

const allStock = (payload) => {
  return {
    type: "ALL_STOCK",
    payload
  }
}

const oneStock = (payload) => {
  return {
    type: "ONE_STOCK",
    payload
  }
}


export const getAllStocks = () => async (dispatch) => {

  let url = `${host}/stocks`
  fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      origin: "*"
    },
    redirect: 'follow'
  })
    .then(response => response.json())
    .then(async result => {
      const { error } = result;
      if (error) {
      } 
      
    //   const { token, allStock} = result;
    //   const getToken = cookies.get("authToken")

    //   if (getToken == undefined) {
    //     cookies.set("authToken", token)
    //     cookies.set("userId", _id)
    //   }
     
        return await dispatch(allStock(result));
    }).catch(error => {
      console.log(error);
    });
}


export const getStocksByName = (name) => async (dispatch) => {
  const token =  cookies.get("authToken")
  let url = `${host}/stocks-by-name`
  const data = {name}
  fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      'Authorization': `Bearer ${token}`,
      origin: "*"
    },
    body: JSON.stringify(data),
    redirect: 'follow'
  })
    .then(response => response.json())
    .then(async result => {
      const { error } = result;
      if (error) {
      } 
      
    //   const { token, allStock} = result;
    //   const getToken = cookies.get("authToken")

    //   if (getToken == undefined) {
    //     cookies.set("authToken", token)
    //     cookies.set("userId", _id)
    //   }
        return await dispatch(oneStock({result, name}));
    }).catch(error => {
      console.log(error);
    });
}


