const init = {
    onIsShowLoginSignUp: false
}


const dashboard = (state = init, action) => {

    switch (action.type) {
        case "SET_DASHBOARD":
            return {
                ...state,
                onIsShowLoginSignUp: action.payload
            }
        default:
            return state
    }
}

export default dashboard;