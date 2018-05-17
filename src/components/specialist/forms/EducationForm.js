import React, { Component } from "react";
import { Field, reduxForm, change } from "redux-form";
import { required } from "../../../helpers/validate";
import RenderField from "../../forms/renders/RenderField";
import RenderSelect from "../../forms/renders/RenderSelect";
import { SaveBtn, CancelBtn } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import { Grid } from "semantic-ui-react";
import StyledWelcomeForm from "../../../styleComponents/StyledWelcomeForm";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import { StyledLabelArea } from "../../../styleComponents/forms/StyledTextArea";
import { getYearsForSelect } from "../../../helpers/functions";

let renderError = true;

class EducationForm extends Component {
  state = {
    fetch: true,
    started: null,
    finished: null,
    disabled: true
  };

  handleSelectChange = e => {
    if (e.value > this.state.finished) {
      this.setState({ started: e.value });
      this.props.dispatch(change("EducationForm", "finished_at", null));
    }
    this.setState({ started: e.value, disabled: false });
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} computer={8}>
              {/* <StyledWelcomeForm> */}
              <InputField
                name="name"
                label="School"
                validate={[required]}
                isRequired
              />
              <Grid>
                <Grid.Row>
                  <Grid.Column computer={8}>
                    <InputField
                      name="started_at"
                      label="From"
                      component={RenderSelect}
                      onChange={this.handleSelectChange}
                      options={getYearsForSelect()}
                      validate={[required]}
                      isRequired
                    />
                  </Grid.Column>
                  <Grid.Column computer={8}>
                    <InputField
                      name="finished_at"
                      label="To"
                      component={RenderSelect}
                      disabled={this.state.disabled}
                      options={getYearsForSelect(this.state.started)}
                      validate={[required]}
                      isRequired
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
                isRequired
              />
              <InputField
                name="degree"
                label="Degree"
                validate={[required]}
                isRequired
              />
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

    if (nextProps.education && this.state.fetch) {
      if (nextProps.education.started_at) {
        this.setState({
          started:
            nextProps.education.started_at.value ||
            nextProps.education.started_at,
          disabled: false
        });
      }

      if (nextProps.education.finished_at) {
        this.setState({
          finished:
            nextProps.education.finished_at.value ||
            nextProps.education.finished_at,
          fetchYears: false
        });
      }
      this.setState({ fetch: false });
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

    let started, finished;
    if (
      started_at.hasOwnProperty("label") &&
      started_at.hasOwnProperty("value")
    ) {
      started = started_at;
    } else {
      started = {
        label: started_at,
        value: started_at
      };
    }
    if (
      finished_at.hasOwnProperty("label") &&
      finished_at.hasOwnProperty("value")
    ) {
      finished = finished_at;
    } else {
      finished = {
        label: finished_at,
        value: finished_at
      };
    }

    this.props.dispatch(change("EducationForm", "name", name));
    this.props.dispatch(
      change("EducationForm", "specialisation", specialisation)
    );
    this.props.dispatch(change("EducationForm", "degree", degree));
    this.props.dispatch(
      change("EducationForm", "description", description || "")
    );
    this.props.dispatch(change("EducationForm", "started_at", started));
    this.props.dispatch(change("EducationForm", "finished_at", finished));
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
