import React, { Component } from "react";
import CommunicationType from "./CommunicationType";

import {
  DropdownAvailability,
  Days
} from "../../../styleComponents/StyledDropdown";
import StyledAvailabilityForm from "../../../styleComponents/StyledAvailabilityForm";
import RenderRadio from "../../forms/renders/RenderRadio";

import SlideTogle from "../../SlideTogle";
import Field from "redux-form/es/Field";

class Communication extends Component {
  render() {
    let { specialistData } = this.props;
    let { successId } = specialistData || false;

    return (
      <StyledAvailabilityForm>
        {/* <DropdownAvailability customPadd>
          <SlideTogle rerender={successId} height={0}> */}
        <label>Preferred method of communication</label>
        <CommunicationType />
        {/* </SlideTogle>
        </DropdownAvailability> */}
      </StyledAvailabilityForm>
    );
  }
}

export default Communication;
