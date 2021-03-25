import { connect } from "react-redux";
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import stocksData from "../component/stocks/StockData";
import { getAllStocks, getStocksByName } from "../action/stocks"


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
            onGetStocksByName: getStocksByName  
        },
        dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(stocksData);