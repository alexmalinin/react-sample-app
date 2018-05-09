import React, { Component } from "react";
import { Field } from "redux-form";
import { communicationTypes } from "../../../helpers/selects/communicationTypes";
import RenderCircleCheckbox from "../../forms/renders/RenderCircleCheckbox";

class CommunicationType extends Component {
  render() {
    return (
      <div className="checkbox-group">
        {communicationTypes
          ? communicationTypes.map(item => (
              <Field
                key={item}
                name={`communication_type.${item}`}
                component={RenderCircleCheckbox}
                onChange={(e, v) => this.props.handleCheckboxChange(e, v)}
                type="checkbox"
                label={item}
                value={item}
              />
            ))
          : null}
      </div>
    );
  }
}

export default CommunicationType;
