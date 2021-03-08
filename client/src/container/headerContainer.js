import { connect } from "react-redux";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import Header from "../component/Header/Header";
import { withRouter } from "react-router";
import { logout } from "../action/login";
import { handleShowLoginSignUp, getUserById } from "../action/dashboard";
import { getTeamDetailsByName } from "../action/team";
import cookies from "../cookie/cookie" 

class HeaderContainer extends Component {
  state = {
    isLoading: false,
  };

  async componentDidMount() {
    const { onGetUserById } = this.props;
    const userId = cookies.get("userId");
    const authToken = cookies.get("userId");

    if(authToken) {
      this.setState({isLoading: true})
      await onGetUserById(userId).then(() => {
        this.setState({isLoading: false});
      });
    }
}

render() {
    const {isLoading} = this.state;
    return isLoading ? "" : <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const {
    user: { isLogin },
    dashboard: { onIsShowLoginSignUp },
  } = state;
  return {
    onIsShowLoginSignUp,
    isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(
      {
        onLogout: logout,
        onHandleShowLoginSignUp: handleShowLoginSignUp,
        onGetTeamDetailsByName: getTeamDetailsByName,
        onGetUserById: getUserById
      },
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderContainer));
