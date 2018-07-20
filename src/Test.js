import React, { Component } from "react";
import { connect } from "react-redux";
import { getSkills } from "./state/ducks/skills/operations";

class Test extends Component {
  componentDidMount() {
    this.props.getSkills();
  }

  render() {
    return <div>Hello world!</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    skills: state.skills
  };
};

export default connect(mapStateToProps, { getSkills })(Test);
