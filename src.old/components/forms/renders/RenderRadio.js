import React, { Component } from "react";
import { connect } from "react-redux";
import StyledRadio from "../../../styleComponents/forms/StyledRadio";

class RenderRadio extends Component {
  componentWillMount() {
    // this.props.input.checked = this.props.checked;
  }

  render() {
    const { input, label, checked, name, onChange } = this.props;

    let radioChecked = null;
    if (checked === undefined) {
      input.hasOwnProperty("checked") ? (radioChecked = input.checked) : null;
    }

    return (
      <StyledRadio>
        <label>
          <input
            className="ownInput"
            type="radio"
            name={name}
            {...input}
            checked={radioChecked === null ? checked : radioChecked}
          />
          <span className={`ownRadio`}>{label}</span>
        </label>
      </StyledRadio>
    );
  }
}

export default connect(({ form }) => ({ form }))(RenderRadio);
