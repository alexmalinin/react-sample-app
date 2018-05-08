import React, { Component } from "react";
import { Field, reduxForm, change } from "redux-form";
import { required } from "../../../helpers/validate";
import RenderField from "../../forms/renders/RenderField";
import { CancelBtn, SaveBtn } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import LocationField from "../../forms/renders/LocationField";
import { Grid } from "semantic-ui-react";
import StyledWelcomeForm from "../../../styleComponents/StyledWelcomeForm";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import { StyledLabelArea } from "../../../styleComponents/forms/StyledTextArea";

let renderError = true;

class WorkExperienceForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} computer={8}>
              <InputField
                name="position"
                label="Title/Position/Role"
                validate={[required]}
              />
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
              <InputField
                name="name"
                label="Company/Project"
                validate={[required]}
              />
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <LocationField />
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
    if (nextProps.experience) {
      if (nextProps.experience.experienceSuccessId) {
        if (renderError) {
          this.fillFields(nextProps.experience);
          renderError = false;
        }
      }
    }
  }

  fillFields = data => {
    let {
      name,
      position,
      country,
      city,
      degree,
      description,
      started_at,
      finished_at
    } = data;

    this.props.dispatch(change("WorkExperienceForm", "name", name));
    this.props.dispatch(change("WorkExperienceForm", "position", position));
    this.props.dispatch(change("WorkExperienceForm", "country", country));
    this.props.dispatch(change("WorkExperienceForm", "city", city));
    this.props.dispatch(change("WorkExperienceForm", "degree", degree));
    this.props.dispatch(
      change("WorkExperienceForm", "description", description || "")
    );
    this.props.dispatch(change("WorkExperienceForm", "started_at", started_at));
    this.props.dispatch(
      change("WorkExperienceForm", "finished_at", finished_at)
    );
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
  form: "WorkExperienceForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(WorkExperienceForm);
