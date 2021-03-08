const init = {
    name: "",
    userId: "",
    isArchived: false,
    email: "",
    phoneNumber: "",
    time: "",
    loginError: "",
    setAuth: false,
    isLogin: false
}


const user = (state = init, action) => {

    switch (action.type) {
        case "REGISTER_USER":
            return {
                ...state,
                loginError: action.payload
            }
        case "LOGIN_USER":
            return {
                ...state,
                ...action.payload,
                setAuth: true,
                loginError: "",
                isLogin: true
            }
        case "ERROR_LOGIN":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default user;