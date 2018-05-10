import { Input } from "semantic-ui-react";
import React from "react";
import StyledInputs from "../../../styleComponents/forms/StyledInputs";
import StyledError from "../../../styleComponents/forms/StyledError";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class RenderField extends React.Component {
  state = {
    startDate: moment()
  };
  // handleChange = e => {
  //   this.setState({
  //     [e.target.name]: +e.target.value
  //   });
  // };
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    const {
      input,
      placeholder,
      name,
      label,
      type,
      disabled,
      padded,
      meta: { touched, error, warning },
      checkedClass
    } = this.props;

    const className = !error ? checkedClass : "";

    return (
      <StyledInputs padded={padded}>
        <label htmlFor={name}>{label}</label>
        <Input
          error={Boolean(touched && error)}
          {...input}
          name={input.name}
          className={className}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
        >
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormat="DD/MM/YYYY"
          />
        </Input>
        {/* <input
            name="day"
            type="number"
            value={day}
            onChange={this.handleChange}
          /> */}

        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledInputs>
    );
  }
}

export default RenderField;
