import React, { Component } from "react";
import { Field, stopSubmit } from "redux-form";
import { required, minLength2 } from "../../helpers/validate";
import RenderSelect from "../forms/renders/RenderSelect";
import RenderPhone from "../forms/renders/RenderPhone";
import RenderCheckbox from "../forms/renders/RenderCheckbox";
import DvButtonForm from "../../styleComponents/layout/DvButtonForm";
import { DvButtonBlue } from "../../styleComponents/layout/DvButton";
import StyledPhoneField from "../../styleComponents/forms/StyledPhoneField";
import StyledRequireBox from "../../styleComponents/forms/StyledRequireBox";
import InputField from "../forms/renders/InputField";
import ModalTerms from "../modals/ModalTerms";
import PrivacyPolicy from "../modals/PrivacyPolicy";
import EmailField from "../forms/renders/EmailField";

class SignUpForm extends Component {
  componentWillMount() {
    document.addEventListener("keyup", this.handleFormSubmit);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleFormSubmit);
  }

  handleFormSubmit = event => {
    let key = event.key || event.keyCode;

    if (key === "Enter" || key === 13) {
      this.props.handleSubmit();
    }
  };

  render() {
    const { handleSubmit, submitting, person, hasPerson } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <EmailField checkedClass="checked" name="email" label="Your email" />

        {person === "Client" && this.props.children}

        <StyledRequireBox>
          <Field
            name="terms"
            component={RenderCheckbox}
            validate={[required, minLength2]}
          />
          <p className="privacy">
            I have read and I agree to the <ModalTerms /> and <PrivacyPolicy />
          </p>
        </StyledRequireBox>

        <div className="controls">
          <DvButtonBlue type="submit" className="dv-blue" disabled={submitting}>
            Continue
          </DvButtonBlue>
        </div>
      </form>
    );
  }
}

export default SignUpForm;
