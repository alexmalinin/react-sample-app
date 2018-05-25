import React, { Component } from "react";
import ProgressBar from "progressbar.js";

class ProgressBars extends Component {
  renderBar() {
    if (this.props.linear) {
      this.bar = new ProgressBar.Line(this.container, {
        strokeWidth: 6,
        easing: "easeInOut",
        duration: 1400,
        color: "#fff",
        trailColor: "#eee",
        trailWidth: 1,
        svgStyle: { width: "100%", height: "100%" }
      });
    } else {
      this.bar = new ProgressBar.Circle(this.container, {
        strokeWidth: 6,
        easing: "easeInOut",
        duration: 1400,
        color: "#fff",
        trailColor: "#eee",
        trailWidth: 1,
        svgStyle: { width: "100%", height: "100%" }
      });
    }
  }

  setContainer = container => {
    this.container = container;
  };

  componentDidMount() {
    this.renderBar();
    this.bar.animate(this.props.percents / 100);

    if (this.props.strokeColor) {
      this.bar.path.setAttribute("stroke", this.props.strokeColor);
    } else {
      if (this.props.percents === 100) {
        this.bar.path.setAttribute("stroke", "#00ffc0");
      } else {
        this.bar.path.setAttribute("stroke", "#fff");
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.bar.animate(nextProps.percents / 100);

    if (this.props.strokeColor) {
      this.bar.path.setAttribute("stroke", this.props.strokeColor);
    } else {
      if (nextProps.percents === 100) {
        this.bar.path.setAttribute("stroke", "#00ffc0");
      } else {
        this.bar.path.setAttribute("stroke", "#fff");
      }
    }
  }

  render() {
    return <div className="container" ref={this.setContainer} />;
  }
}

export default ProgressBars;
