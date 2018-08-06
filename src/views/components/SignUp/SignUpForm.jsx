import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "redux-form";

import ModalTerms from "./modals/ModalTerms";
import PrivacyPolicy from "./modals/ProvacyPolicy";

import InputField from "@UI/inputs/InputField";
import RenderCheckbox from "./helpers/RenderCheckbox";

import StyledRequireBox from "./StyledRequiredBox";
import { DvButtonBlue } from "@styled/DVButton";

import { required, minLength2, email } from "@views/utils/validate";

const SignUpForm = props => {
  const { handleSubmit, submitting } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="email"
        type="email"
        label="Your email"
        validate={[required, email]}
        component={InputField}
        checkedClass="checked"
      />

      {/* {person === "Client" && this.props.children} */}

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
    </Form>
  );
};

export default SignUpForm;
