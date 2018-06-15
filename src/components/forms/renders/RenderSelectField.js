import React, { Component } from "react";
import { change } from "redux-form";
import "react-select/dist/react-select.css";
import StyledInputs from "../../../styleComponents/forms/StyledInputs";
import StyledError from "../../../styleComponents/forms/StyledError";
import StyledSelect from "../../../styleComponents/forms/StyledSelect";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";
import { Select } from "react-semantic-redux-form/dist";
import { taskStatuses } from "../../../helpers/selects/taskStatuses";

export default class RenderSelectField extends Component {
  state = {
    loading: false,
    updError: false
  };

  //TODO: apply thunk here
  handleChange = (e, data) => {
    const {
      handleSubmit,
      input,
      meta: { dispatch, form }
    } = this.props;

    this.setState({ loading: true });

    handleSubmit(input.name, data.value)
      .then(resp => {
        const { data } = resp;
        data.state = taskStatuses.find(
          status => status.enum === data.state
        ).value;
        this.setState({ loading: false, updError: false });
        dispatch(change(form, input.name, data.state));
      })
      .catch(error => this.setState({ loading: false, updError: true }));
  };

  render() {
    let {
      input,
      meta,
      label,
      small,
      isRequired,
      handleSubmit,
      ...rest
    } = this.props;
    const { loading, updError } = this.state;

    const { touched, error, warning } = meta;

    return (
      <StyledInputs {...rest} small={small}>
        <label>
          {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
        </label>
        <Select
          input={input}
          meta={meta}
          onChange={this.handleChange}
          loading={loading}
          error={updError}
          onFocus={e => this.setState({ updError: false })}
          {...rest}
        />
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledInputs>
    );
  }
}
