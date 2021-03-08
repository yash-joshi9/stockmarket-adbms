import React from "react";
import "./style.scss"

const HelpPage = () => {
  return (
    <div className="helppage-container">
      <div className="section-wrapper">
        <div className="help-text">
            Feel free to ask us about your queries and we will get back to you as soon as possible!!
        </div>
        <div className="text-area">
          <textarea></textarea>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
