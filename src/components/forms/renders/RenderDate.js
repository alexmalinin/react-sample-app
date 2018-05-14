import { Input } from "semantic-ui-react";
import React from "react";
import StyledInputs from "../../../styleComponents/forms/StyledInputs";
import StyledError from "../../../styleComponents/forms/StyledError";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class RenderField extends React.Component {
  state = {
    date: this.props.initData ? moment(this.props.initData) : moment()
  };

  componentWillMount() {
    this.props.handleEtaForm(this.state.date.format("YYYY-MM-DD"));
  }

  handleChange = date => {
    if (date && date._isAMomentObject) {
      this.setState({
        date
      });
    }
  };

  componentDidUpdate() {
    const { date } = this.state;
    date && this.props.handleEtaForm(date.format("YYYY-MM-DD"));
  }

  render() {
    const {
      input,
      placeholder,
      name,
      label,
      type,
      disabled,
      padded,
      small,
      meta: { touched, error, warning },
      checkedClass
    } = this.props;

    const { date } = this.state;

    const className = !error ? checkedClass : "";

    return (
      <StyledInputs small={small} padded={padded}>
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
            {...input}
            name={input.name}
            selected={date}
            value={date && date.format("DD/MM/YYYY")}
            onChange={this.handleChange}
            // onBlur={this.handleChange}
            dateFormat="DD/MM/YYYY"
            autoComplete="off"
            readOnly
          />
          {/* <input
            {...input}
            type={type}
            name={input.name}
            className="shadowInput"
            value={date.format("YYYY-MM-DD")}
          /> */}
        </Input>

        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledInputs>
    );
  }
}

export default RenderField;
