import React, { Component } from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

export default class RenderSelect extends Component {
  render() {
    let {
      meta: { touched, error, warning },
      input,
      ...rest
    } = this.props;
    let { value, onChange, placeholder } = input;

    return (
      <div>
        <Select
          value={value}
          onChange={onChange}
          // placeholder={placeholder}
          multi={true}
          openOnFocus={true}
          {...rest}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  }
}
