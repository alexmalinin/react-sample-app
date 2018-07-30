import React, { Component } from "react";
import { Field } from "redux-form";
import { required, minLength2 } from "view/utils/validate";
import RenderCheckbox from "../forms/renders/RenderCheckbox";
import { DvButtonBlue } from "../../styleComponents/layout/DvButton";
import StyledRequireBox from "../../styleComponents/forms/StyledRequireBox";
import ModalTerms from "view/components/modals/ModalTerms";
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
