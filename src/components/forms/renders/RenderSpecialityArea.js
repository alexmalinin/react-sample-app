import React, { Component } from "react";
import { Field } from "redux-form";
import { required } from "../../../helpers/validate";
import RenderCircleCheckbox from "../renders/RenderCircleCheckbox";
import StyledSpecialityArea from "../../../styleComponents/forms/StyledSpecialityArea";

class RenderSpecialityArea extends Component {
  state = {
    specialities: []
  };

  handleSpecialityCheckbox = (index, data) => {
    let values = [];

    values = this.state.specialities.slice();
    values[index - 1] = data;

    this.setState({
      specialities: values
    });
  };

  render() {
    const { industry, speciality } = this.props;
    let industry_id = industry ? industry.value : null;

    let validateProp = !this.state.specialityError
      ? { validate: [required] }
      : null;

    return (
      <StyledSpecialityArea>
        <p className="speciality-area__label">
          Select your speciality within that area
        </p>

        <div>
          {speciality &&
            speciality[industry_id - 1] &&
            speciality[industry_id - 1][industry_id] &&
            speciality[industry_id - 1][industry_id].map(item => (
              <Field
                key={item.value}
                name={`speciality_ids._${item.value}`}
                type="checkbox"
                component={RenderCircleCheckbox}
                label={item.label}
                handleSpecialityCheckbox={this.handleSpecialityCheckbox}
                itemValue={item.value}
                {...validateProp}
              />
            ))}
        </div>
      </StyledSpecialityArea>
    );
  }
}

export default RenderSpecialityArea;
