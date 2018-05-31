import React, { Component } from "react";
import { Field } from "redux-form";
import RenderMultiSelect from "../renders/RenderMultiSelect";
import StyledSkillsArea from "../../../styleComponents/forms/StyledSkillsArea";

class RenderSkillsArea extends Component {
  render() {
    const {
      handleSelectChange,
      options,
      onOpen,
      label,
      name,
      padded,
      placeholder,
      className
    } = this.props;

    return (
      <StyledSkillsArea
        className={className}
        padded={padded}
        placeholder={placeholder}
      >
        <span>{label}</span>
        <Field
          name={name}
          component={RenderMultiSelect}
          onChange={e => handleSelectChange && handleSelectChange(e, name)}
          placeholder=""
          onOpen={onOpen}
          // disabled
          options={options}
        />
      </StyledSkillsArea>
    );
  }
}

export default RenderSkillsArea;
