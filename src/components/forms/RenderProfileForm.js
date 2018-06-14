import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Field, reduxForm, change, getFormValues } from "redux-form";
import { required } from "../../helpers/validate";
import {
  NextBtn,
  SaveBtn,
  CancelBtn
} from "../../styleComponents/layout/DvButton";
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
      fetchSubmitError: true,
      confirmation: false,
      submitError: false
    };

    this.initialFormValues = {};
  }

  componentWillMount() {
    if (this.props.specialistData) {
      // this.fillFields(this.props.specialistData);
    }
    if (this.props.clientData) {
      // this.fillFields(this.props.clientData);
    }
  }

  componentWillUnmount() {
    if (this.props.specialistData) {
      // this.fillFields(this.props.specialistData);
    }
    if (this.props.clientData) {
      // this.fillFields(this.props.clientData);
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

    // console.log("props", this.props);

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
                        tabIndex="1"
                      />

                      <InputField
                        name="city"
                        label="City"
                        validate={[required]}
                        isRequired
                        tabIndex="3"
                      />
                      <StyledPhoneField>
                        <RenderPhone tabIndex="5" />
                      </StyledPhoneField>
                    </Grid.Column>
                    <Grid.Column computer={8}>
                      <InputField
                        name="last_name"
                        label="Last Name"
                        validate={[required]}
                        isRequired
                        tabIndex="2"
                      />
                      <InputField
                        name="country"
                        label="Country"
                        validate={[required]}
                        isRequired
                        tabIndex="4"
                      />
                      <EmailField
                        name="email"
                        label="Email"
                        validate={[required]}
                        isRequired
                        tabIndex="6"
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
                          tabIndex="7"
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
                    <NavLink exact to="/dashboard/about">
                      <CancelBtn disabled={submitting} primary>
                        <span>Cancel</span>
                      </CancelBtn>
                    </NavLink>
                  ) : null}

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
                      <span>Next Step</span>
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
      // this.fillFields(nextProps.clientData);
      this.setState({
        fetch: false
      });
    } else if (nextProps.specialistData && this.state.fetch) {
      // this.fillFields(nextProps.specialistData);
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

    if (
      (nextProps.submitFailed && this.state.fetchSubmitError) ||
      (nextProps.submitFailed && this.props.triggerSubmit)
    ) {
      this.setState({ submitError: true });
    }
  }

  handleSubmitError = () => {
    if (this.props.submitFailed && this.props.invalid) {
      this.setState({ submitError: true });
    }
  };

  closeErrorModal = () => {
    this.setState({ submitError: false, fetchSubmitError: false });
  };

  // fillFields = data => {
  //   let {
  //     first_name,
  //     last_name,
  //     email,
  //     address,
  //     phone_number,
  //     professional_experience_info,
  //     description
  //   } = data;

  //   this.props.dispatch(change("RenderProfileForm", "first_name", first_name));
  //   this.props.dispatch(change("RenderProfileForm", "last_name", last_name));
  //   this.props.dispatch(change("RenderProfileForm", "email", email));
  //   this.props.dispatch(
  //     change("RenderProfileForm", "phone_number", phone_number)
  //   );
  //   this.props.dispatch(
  //     change("RenderProfileForm", "country", address ? address.country : null)
  //   );
  //   this.props.dispatch(
  //     change("RenderProfileForm", "city", address ? address.city : null)
  //   );
  //   this.props.dispatch(
  //     change("RenderProfileForm", "description", description)
  //   );
  //   this.props.dispatch(
  //     change(
  //       "RenderProfileForm",
  //       "professional_experience_info",
  //       professional_experience_info
  //     )
  //   );
  // };
}

RenderProfileForm = reduxForm({
  form: "RenderProfileForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(RenderProfileForm);

const mapStateToProps = (state, ownProps) => {
  const { specialistData, clientData, percents } = state;
  let initialValues = {};

  if (specialistData) {
    initialValues = {
      first_name: specialistData.first_name,
      last_name: specialistData.last_name,
      email: specialistData.email,
      country: specialistData.address ? specialistData.address.country : null,
      city: specialistData.address ? specialistData.address.city : null,
      phone_number: specialistData.phone_number,
      professional_experience_info: specialistData.professional_experience_info,
      description: specialistData.description
    };
  }

  if (clientData) {
    initialValues = {
      first_name: clientData.first_name,
      last_name: clientData.last_name,
      email: clientData.email,
      country: clientData.address ? clientData.address.country : null,
      city: clientData.address ? clientData.address.city : null,
      phone_number: clientData.phone_number,
      professional_experience_info: clientData.professional_experience_info,
      description: clientData.description
    };
  }

  const formValues = getFormValues("RenderProfileForm")(state);

  return {
    percents,
    specialistData,
    clientData,
    formValues,
    initialValues
  };
};

export default connect(mapStateToProps, {})(RenderProfileForm);
