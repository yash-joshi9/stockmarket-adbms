import React, { Component, Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router";
import LoginSignUpModal from "../login-signup-modal/loginSignUpModal";
import "./style.scss";
import cookies from "../../cookie/cookie";
import DropDown from "../dropdown/dropdown";

function HeaderComponent(props) {
  const handleHome = () => {
    const { history } = props;
    const getToken = cookies.get("authToken");
    if (getToken) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  };

  const handleSignIn = () => {
    const { history } = props;
    history.push("/sign-up");
  };

  const handleLogin = () => {
    const { history } = props;
    history.push("/login");
  };

  const handleLogout = () => {
    const { onLogout } = props;
    onLogout();
  };

  const {
    isLogin,
    onIsShowLoginSignUp,
    onHandleShowLoginSignUp,
    onGetTeamDetailsByName,
  } = props;

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const handleTeam = async (e) => {
    const teamName = e.currentTarget.textContent;
    const { history } = props;
    await onGetTeamDetailsByName(teamName);

    history.push(`/teams/${teamName}`);
  };

  const handleCreateTeam = async (e) => {
    const { history } = props;
    history.push("/create-a-team");
  };

  const handleMatches = async (e) => {
    const { history } = props;
    history.push("/matches");
  };

  const handleAboutUs = async (e) => {
    const { history } = props;
    history.push("/AboutUs");
  };

  const handleHelp = async (e) => {
    const { history } = props;
    history.push("/help-page");
  };


  const getToken = cookies.get("authToken");
  return (
    <div className={`header-main ${scroll ? "is-scrolled" : ""}`}>
      <div className="title-part">Stock Market</div>
      <div className="title-tag">TEST YOUR SKILLS</div>
      <div className="header-container">
        <div className="logo-part">FLA</div>
        <div className="header-list-part">
          <div className="first-part-header">
            <ul className="list-part">
              <li onClick={handleHome}> Home </li>
              {getToken && (
                <Fragment>
                  <li>
                    <DropDown name="Teams">
                      <ul>
                        <li>
                          <div onClick={(e) => handleTeam(e)}>
                            Chennai Super Kings
                          </div>
                        </li>
                        <li>
                          <div onClick={(e) => handleTeam(e)}>
                            Delhi Capitals
                          </div>
                        </li>
                        <li>
                          <div onClick={(e) => handleTeam(e)}>
                            Kings XI Punjab
                          </div>
                        </li>
                        <li>
                          <div onClick={(e) => handleTeam(e)}>
                            Kolkata Knight Riders
                          </div>
                        </li>
                        <li>
                          <div onClick={(e) => handleTeam(e)}>
                            Mumbai Indians
                          </div>
                        </li>
                        <li>
                          <div onClick={(e) => handleTeam(e)}>
                            Rajasthan Royals
                          </div>
                        </li>
                        <li>
                          <div onClick={(e) => handleTeam(e)}>
                            Royal Challengers Bangalore
                          </div>
                        </li>
                        <li>
                          <div onClick={(e) => handleTeam(e)}>
                            Sunrisers Hyderabad
                          </div>
                        </li>
                      </ul>
                    </DropDown>
                  </li>
                  <li
                    onClick={() => {
                      handleMatches();
                    }}
                  >
                    {" "}
                    Matches{" "}
                  </li>
                </Fragment>
              )}
              {getToken && (
                <li onClick={() => handleCreateTeam()}> Create a team </li>
              )}
              <li onClick={() =>handleAboutUs()}> About Us </li>
              <li onClick={() =>handleHelp()}> Help </li>
            </ul>
          </div>
          <div className="sec-part-header">
            <ul className="list-part">
              {isLogin ? (
                <li onClick={handleLogout}> Log Out </li>
              ) : (
                <Fragment>
                  <li onClick={() => onHandleShowLoginSignUp(true)}>
                    {" "}
                    Login/Sign-Up{" "}
                  </li>
                  <LoginSignUpModal
                    onIsShowLoginSignUp={onIsShowLoginSignUp}
                    onHandleShowLoginSignUp={onHandleShowLoginSignUp}
                  />
                  {/* <li onClick={handleLogin}> Login </li> */}
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(HeaderComponent);
