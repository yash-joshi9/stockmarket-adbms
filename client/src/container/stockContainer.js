import { connect } from "react-redux";
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import Stocks from "../component/stocks/stocks";
import { getAllStocks, getStocksByName } from "../action/stocks"

class StocksContainer extends Component {

    render() {
        return (
            <Stocks
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

export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);