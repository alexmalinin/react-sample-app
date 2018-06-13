import React, { Component } from "react";
import { StyledSpecialist } from "../../styleComponents/layout/StyledAssignDropdown";
import { IMAGE_PORT } from "../../constans/constans";
import { Field, formValueSelector } from "redux-form";
import { Input } from "react-semantic-redux-form";
import { createNumberMask } from "redux-form-input-masks";
import RenderCost from "../forms/renders/RenderCost";

export default class SpecialistTile extends Component {
  remove = () => {
    const {
      remove,
      specialist: { id }
    } = this.props;
    remove(id);
  };

  submitCost = e => {
    const {
      handleSubmit,
      specialist: { id },
      input
    } = this.props;

    handleSubmit(id);
  };

  render() {
    const { specialist } = this.props;

    return (
      <StyledSpecialist>
        <div className="avatar">
          <img
            src={
              specialist.avatar.url
                ? IMAGE_PORT + specialist.avatar.url
                : "/images/uploadImg.png"
            }
            alt={specialist.first_name + " " + specialist.last_name}
          />
          <button type="button" onClick={this.remove} />
        </div>
        <p>{specialist.first_name + " " + specialist.last_name}</p>
        <Field
          name={"cost_spec_" + specialist.id}
          component={Input}
          fluid
          autoComplete="off"
          onKeyDown={e => {
            if (e.keyCode === 13) {
              this.submitCost(e);
              e.target.blur();
            }
          }}
          onBlur={e => this.submitCost(e)}
          {...createNumberMask({
            prefix: "$"
          })}
        />
      </StyledSpecialist>
    );
  }
}
