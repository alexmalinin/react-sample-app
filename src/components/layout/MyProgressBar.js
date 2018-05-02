import React, { Component } from "react";

var ProgressBar = require("progressbar.js");

const renderBar = () => {
  debugger;
  let bar = new ProgressBar.Circle("#container", {
    strokeWidth: 6,
    easing: "easeInOut",
    duration: 1400,
    color: "#FFEA82",
    trailColor: "#eee",
    trailWidth: 1,
    svgStyle: null
  });

  bar.animate(1.0);
};

class MyProgressBar extends Component {
  render() {
    return (
      <div>
        ghfghgfhgffhfg
        <div id="container" />
        {renderBar()}
      </div>
    );
  }
}

export default MyProgressBar;
