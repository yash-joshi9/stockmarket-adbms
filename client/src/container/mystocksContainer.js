import { connect } from "react-redux";
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import MyStocks from "../component/stocks/myStocks";
import { getAllStocks, getStocksByName } from "../action/stocks"

class MyStocksContainer extends Component {

    render() {
        return (
            <MyStocks
                {...this.props}
            />
        );
    }
}



const mapStateToProps = (state) => {
    const {
        stocksData,
        singleStock
    } = state
    return {
        stocksData,
        singleStock
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({ 
            onGetAllStocks: getAllStocks,
            onGetStocksByName: getStocksByName  
        },
        dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStocksContainer);