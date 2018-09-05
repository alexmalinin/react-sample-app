import React, { Component } from "react";
import { change } from "redux-form";
import { Input } from "react-semantic-redux-form/dist";
import { taskStatuses } from "../../../helpers/selects/taskStatuses";

class RenderCost extends Component {
  state = {
    editing: false,
    loading: false,
    updError: false
  };

  keyDown = e => {
    e.keyCode === 27 && e.target.blur();
  };

  render() {
    const {
      input,
      label,
      meta: { touched, error, warning, pristine },
      meta,
      placeholder,
      className,
      large,
      isRequired,
      ...rest
    } = this.props;
    const { editing, loading, updError } = this.state;

    return <Input {...input} meta={meta} fluid {...rest} />;
  }
}

export default RenderCost;
