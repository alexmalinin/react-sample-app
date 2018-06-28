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
import { getUserRole } from "../../helpers/functions";
import { CUSTOMER } from "../../constants/user";

import { Grid } from "semantic-ui-react";

class RenderProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchSubmitError: true,
      confirmation: false,
      submitError: false
    };
  }

  componentWillUnmount() {
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
        <form name="account" onSubmit={handleSubmit}>
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
                          getUserRole() === CUSTOMER
                            ? "description"
                            : "professional_experience_info"
                        }
                        className="text-area-group"
                      >
                        <Field
                          name={
                            getUserRole() === CUSTOMER
                              ? "description"
                              : "professional_experience_info"
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

  componentWillReceiveProps(nextProps) {
    this.props.handleFormEdit(nextProps.dirty);

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

  if (getUserRole() === CUSTOMER) {
    const data = clientData ? clientData : {};

    initialValues = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      country: data.address ? data.address.country : null,
      city: data.address ? data.address.city : null,
      phone_number: data.phone_number,
      description: data.description || null,
      professional_experience_info: null
    };
  } else {
    const data = specialistData ? specialistData : {};

    initialValues = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      country: data.address ? data.address.country : null,
      city: data.address ? data.address.city : null,
      phone_number: data.phone_number,
      professional_experience_info: data.professional_experience_info,
      description: null
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
