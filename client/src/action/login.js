import cookies from "../cookie/cookie";
const host = process.env.REACT_APP_REACT_HOST;

const login = (payload) => {
  return {
    type: "LOGIN_USER",
    payload
  }
}

const errorLogin = (payload) => {
  return {
    type: "ERROR_LOGIN",
    payload
  }
}


export const loginUser = (values) => async (dispatch, getState, ownProps) => {
  let { email, password } = values;

  if (!email.length || !password.length) {
    return "";
  }

  password = btoa(password)

  const data = {email, password}
  let url = `${host}/users/login`
  fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      origin: "*"
    },
    body: JSON.stringify(data),
    redirect: 'follow'
  })
    .then(response => response.json())
    .then(result => {
      const { error } = result;
      if (error) {
        return dispatch(errorLogin({ loginError: error }))
      } 
      
      const { token, user, user :{ _id }} = result;
      const getToken = cookies.get("authToken")

      if (getToken == undefined) {
        cookies.set("authToken", token)
        cookies.set("userId", _id)
      }

        const data = { ...user, userId: user._id }
        dispatch(login(data))
        window.location.href = "/dashboard"; 
    }).catch(error => {
      console.log(error);
    });
}



export const logout = () => (dispatch) => {
  const token = cookies.get("authToken")
  const url = `${host}/users/logout`

  fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(token),
  }).then(res => res.json()).then(result => {

    if(result.message == "logout successful") {
      cookies.remove("authToken");
      cookies.remove("userId");
      window.location.href = "/"
    }
  }).catch((e) => {
    console.log(e, ">>>>>>>>>")
  })
}
