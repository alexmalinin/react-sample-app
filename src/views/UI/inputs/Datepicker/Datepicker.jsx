import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { Input } from "semantic-ui-react";

import StyledInputs from "@styled/forms/Inputs";
import StyledError from "@styled/forms/Validation";
import StyledLabel from "@styled/forms/Label";

import "react-datepicker/dist/react-datepicker.css";

class RenderDate extends React.Component {
  state = {
    date: moment(this.props.initData, "YYYY-MM-DD").isValid()
      ? moment(this.props.initData)
      : null,
    fetchDate: true
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.epicId !== nextProps.epicId) {
      this.setState({
        fetchDate: true
      });
    }

    if (this.state.fetchDate) {
      this.setState({
        date: moment(nextProps.initData, "YYYY-MM-DD").isValid()
          ? moment(nextProps.initData)
          : null
      });
    }
  }

  handleChange = date => {
    if (date && date._isAMomentObject) {
      this.setState({
        date,
        fetchDate: false
      });
    }
  };

  componentDidUpdate() {
    const {
      input: { onChange }
    } = this.props;
    const { date } = this.state;
    date && onChange(date.format("YYYY-MM-DD"));
  }

  render() {
    const {
      input,
      placeholder,
      name,
      label,
      type,
      disabled,
      isRequired,
      meta: { touched, error, warning },
      checkedClass,
      ...rest
    } = this.props;

    const { date } = this.state;

    const className = !error ? checkedClass : "";

    return (
      <StyledInputs {...rest}>
        <label htmlFor={name}>
          {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
        </label>
        <Input
          error={Boolean(touched && error)}
          {...input}
          name={input.name}
          className={className}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          iconPosition="left"
          icon={<i className="fas fa-calendar-alt" />}
          input={
            <DatePicker
              {...input}
              name={input.name}
              selected={date}
              value={date && date.format("DD/MM/YYYY")}
              onChange={this.handleChange}
              // onBlur={this.handleChange}
              placeholderText={placeholder}
              dateFormat="DD/MM/YYYY"
              autoComplete="off"
              readOnly
            />
          }
        />

        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledInputs>
    );
  }
}

export default RenderDate;
