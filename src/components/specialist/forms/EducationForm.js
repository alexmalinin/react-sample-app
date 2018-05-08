import React, { Component } from "react";
import { Field, reduxForm, change } from "redux-form";
import { required } from "../../../helpers/validate";
import RenderField from "../../forms/renders/RenderField";
import { SaveBtn, CancelBtn } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import { Grid } from "semantic-ui-react";
import StyledWelcomeForm from "../../../styleComponents/StyledWelcomeForm";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import { StyledLabelArea } from "../../../styleComponents/forms/StyledTextArea";

let renderError = true;

class EducationForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} computer={8}>
              {/* <StyledWelcomeForm> */}
              <InputField name="name" label="School" validate={[required]} />
              <Grid>
                <Grid.Row>
                  <Grid.Column computer={8}>
                    <InputField
                      name="started_at"
                      label="From"
                      validate={[required]}
                    />
                  </Grid.Column>
                  <Grid.Column computer={8}>
                    <InputField
                      name="finished_at"
                      label="To"
                      validate={[required]}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {/* </StyledWelcomeForm> */}
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <InputField
                name="specialisation"
                label="Area of study"
                validate={[required]}
              />
              <InputField name="degree" label="Degree" validate={[required]} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <StyledLabelArea>
                <Field
                  name="description"
                  label="Description"
                  component={RenderTextArea}
                  // validate={[required]}
                />
              </StyledLabelArea>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column mobile={16} textAlign="right">
              <CancelBtn
                onClick={this.closeModal}
                disabled={submitting}
                primary
                static="true"
              >
                <span>Cancel</span>
              </CancelBtn>
              <SaveBtn
                type="submit"
                disabled={submitting}
                primary
                updatebtn="true"
                static="true"
              >
                <span>Save</span>
              </SaveBtn>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.education) {
      if (nextProps.education.educationSuccessId) {
        if (renderError) {
          this.fillFields(nextProps.education);
          renderError = false;
        }
      }
    }
  }

  fillFields = data => {
    let {
      name,
      specialisation,
      degree,
      description,
      started_at,
      finished_at
    } = data;

    this.props.dispatch(change("EducationForm", "name", name));
    this.props.dispatch(
      change("EducationForm", "specialisation", specialisation)
    );
    this.props.dispatch(change("EducationForm", "degree", degree));
    this.props.dispatch(
      change("EducationForm", "description", description || "")
    );
    this.props.dispatch(change("EducationForm", "started_at", started_at));
    this.props.dispatch(change("EducationForm", "finished_at", finished_at));
  };

  closeModal = ev => {
    ev.preventDefault();
    let close = document.querySelector("i.close.icon");
    close.click();
  };

  componentWillUnmount() {
    renderError = true;
  }
}

export default reduxForm({
  form: "EducationForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(EducationForm);
