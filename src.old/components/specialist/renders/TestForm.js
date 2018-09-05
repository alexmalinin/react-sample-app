import React, { Component } from "react";

class TestForm extends Component {
  render() {
    const inputValue = this.props.inputValue;
    const onChange = this.props.onChange;

    return (
      <form>
        <input onChange={onChange} value={inputValue} type="text" />
      </form>
    );
  }
}

export default TestForm;
