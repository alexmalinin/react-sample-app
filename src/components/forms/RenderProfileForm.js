import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change, getFormValues } from "redux-form";
import { required } from "../../helpers/validate";
import { NextBtn, SaveBtn } from "../../styleComponents/layout/DvButton";
import InputField from "./renders/InputField";
import EmailField from "./renders/EmailField";
import StyledPhoneField from "../../styleComponents/forms/StyledPhoneField";
import RenderPhone from "./renders/RenderPhone";
import RenderImage from "../forms/renders/RenderImage";
import RenderTextArea from "../forms/renders/RenderTextArea";
import StyledExperienceCards from "../../styleComponents/StyledExperienceCards";
import RenderCards from "../specialist/renders/RenderCards";
import EdicationModal from "../modals/EdicationModal";
import WorkExperienceModal from "../modals/WorkExperienceModal";
import SubmitFormErrorModal from "../modals/SubmitFormErrorModal";

import { Grid } from "semantic-ui-react";

window.change = change;

class RenderProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetch: true,
      formData: {},
      fetchFormValues: true,
      submitError: false
    };

    this.initialFormValues = {};
  }

  componentWillMount() {
    if (this.props.specialistData) {
      this.fillFields(this.props.specialistData);
    }
    if (this.props.clientData) {
      this.fillFields(this.props.clientData);
    }
  }

  componentWillUnmount() {
    if (this.props.specialistData) {
      this.fillFields(this.props.specialistData);
    }
    if (this.props.clientData) {
      this.fillFields(this.props.clientData);
    }

    this.props.reset();
  }

  render() {
    const {
      handleSubmit,
      educations,
      experiences,
      submitting,
      clientData,
      specialistData,
      isEditing
    } = this.props;

    let { avatar } = specialistData || clientData || false;

    let educationsChilds1 = specialistData ? specialistData["educations"] : [];
    let experiencesChilds1 = specialistData
      ? specialistData["work_experiences"]
      : [];

    let educationData = educations
      ? [...educationsChilds1, ...educations]
      : null;
    let experienceData = experiences
      ? [...experiencesChilds1, ...experiences]
      : null;

    return (
      <Fragment>
        <form
          name="account"
          onSubmit={handleSubmit}
          onChange={this.handleChange}
        >
          <Grid>
            <Grid.Row>
              <Grid.Column computer={3}>
                {/* { !avatar && <p>Upload your photo</p>} */}
                <Field
                  name="person"
                  component={RenderImage}
                  type="file"
                  avatar={avatar}
                  placeholder="Choose your photo"
                />
              </Grid.Column>
              <Grid.Column computer={10}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column computer={8}>
                      <InputField
                        name="first_name"
                        label="First Name"
                        validate={[required]}
                        isRequired
                      />

                      <InputField
                        name="city"
                        label="City"
                        validate={[required]}
                        isRequired
                      />
                      <StyledPhoneField>
                        <RenderPhone />
                      </StyledPhoneField>
                    </Grid.Column>
                    <Grid.Column computer={8}>
                      <InputField
                        name="last_name"
                        label="Last Name"
                        validate={[required]}
                        isRequired
                      />
                      <InputField
                        name="country"
                        label="Country"
                        validate={[required]}
                        isRequired
                      />
                      <EmailField
                        name="email"
                        label="Email"
                        validate={[required]}
                        isRequired
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid>
                  <Grid.Row>
                    <Grid.Column computer={16}>
                      <div
                        id={
                          specialistData
                            ? "professional_experience_info"
                            : "description"
                        }
                        className="text-area-group"
                      >
                        <Field
                          name={
                            specialistData
                              ? "professional_experience_info"
                              : "description"
                          }
                          label={
                            "Write a paragraph or two about your professional experience "
                          }
                          component={RenderTextArea}
                          className="area"
                        />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid>
                  <Grid.Row>
                    <Grid.Column computer={16}>
                      <StyledExperienceCards>
                        {this.props.specialistModal ? (
                          <div className="experience-section">
                            <h3>Education</h3>
                            <RenderCards educations={educationData} />
                          </div>
                        ) : null}
                      </StyledExperienceCards>
                    </Grid.Column>
                    <Grid.Column computer={16}>
                      <StyledExperienceCards>
                        {this.props.specialistModal ? (
                          <div className="experience-section">
                            <h3>Work experience</h3>
                            <RenderCards experiences={experienceData} />
                          </div>
                        ) : null}
                      </StyledExperienceCards>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column computer={3}>
                <div className="navigation-wrap">
                  {isEditing ? (
                    <SaveBtn
                      type="submit"
                      disabled={submitting}
                      onClick={this.handleSubmitError}
                      primary
                      updatebtn="true"
                    >
                      <span>Save</span>
                    </SaveBtn>
                  ) : (
                    <NextBtn
                      type="submit"
                      disabled={submitting}
                      onClick={this.handleSubmitError}
                      primary
                    >
                      <span>NextStep</span>
                    </NextBtn>
                  )}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </form>

        <SubmitFormErrorModal
          isOpen={this.state.submitError}
          close={this.closeErrorModal}
        />
      </Fragment>
    );
  }

  handleChange = e => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value === "" ? null : e.target.value
      }
    });
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.clientData && this.state.fetch) {
      this.fillFields(nextProps.clientData);
      this.setState({
        fetch: false
      });
    } else if (nextProps.specialistData && this.state.fetch) {
      this.fillFields(nextProps.specialistData);
      this.setState({
        fetch: false
      });
    }

    this.props.handleFormChange(nextState.formData, this.initialFormValues);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formValues) {
      if (this.state.fetchFormValues) {
        this.initialFormValues = nextProps.formValues;

        this.setState({
          formData: nextProps.formValues,
          fetchFormValues: false
        });
      }
    }

    if (nextProps.submitFailed && this.state.fetchSubmitError) {
      this.setState({ submitError: true });
    }
  }

  handleSubmitError = () => {
    if (this.props.invalid) {
      this.setState({ submitError: true });
    }
  };

  closeErrorModal = () => {
    this.setState({ submitError: false, fetchSubmitError: false });
  };

  fillFields = data => {
    let {
      first_name,
      last_name,
      email,
      address,
      phone_number,
      professional_experience_info,
      description
    } = data;

    // this.props.dispatch(change('RenderProfileForm', 'avatar',       avatar));
    this.props.dispatch(change("RenderProfileForm", "first_name", first_name));
    this.props.dispatch(change("RenderProfileForm", "last_name", last_name));
    this.props.dispatch(change("RenderProfileForm", "email", email));
    this.props.dispatch(
      change("RenderProfileForm", "phone_number", phone_number)
    );
    this.props.dispatch(
      change("RenderProfileForm", "country", address ? address.country : null)
    );
    this.props.dispatch(
      change("RenderProfileForm", "city", address ? address.city : null)
    );
    this.props.dispatch(
      change("RenderProfileForm", "description", description)
    );
    this.props.dispatch(
      change(
        "RenderProfileForm",
        "professional_experience_info",
        professional_experience_info
      )
    );
  };
}

RenderProfileForm = reduxForm({
  form: "RenderProfileForm"
})(RenderProfileForm);

RenderProfileForm = connect(state => ({
  formValues: getFormValues("RenderProfileForm")(state)
}))(RenderProfileForm);

export default connect(({ clientData, specialistData, percents }) => ({
  clientData,
  specialistData,
  percents
}))(RenderProfileForm);
