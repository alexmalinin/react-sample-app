import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
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

import { Grid } from "semantic-ui-react";

window.change = change;

class RenderProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetch: true
    };
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
                    />

                    <InputField
                      name="city"
                      label="City"
                      validate={[required]}
                    />
                    <StyledPhoneField>
                      <span>Phone</span>
                      <RenderPhone />
                    </StyledPhoneField>
                  </Grid.Column>
                  <Grid.Column computer={8}>
                    <InputField
                      name="last_name"
                      label="Last Name"
                      validate={[required]}
                    />
                    <InputField
                      name="country"
                      label="Country"
                      validate={[required]}
                    />
                    <EmailField
                      name="email"
                      label="Email"
                      validate={[required]}
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
                    <h3>Education</h3>
                    <StyledExperienceCards>
                      {this.props.specialistModal ? (
                        <div className="experience-section">
                          <RenderCards educations={educationData} />
                        </div>
                      ) : null}
                    </StyledExperienceCards>
                  </Grid.Column>
                  <Grid.Column computer={16}>
                    <h3>Work experience</h3>
                    <StyledExperienceCards>
                      {this.props.specialistModal ? (
                        <div className="experience-section">
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
                    primary
                    updatebtn
                  >
                    <span>Save</span>
                  </SaveBtn>
                ) : (
                  <NextBtn type="submit" disabled={submitting} primary>
                    <span>NextStep</span>
                  </NextBtn>
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    );
  }

  componentWillUpdate(nextProps) {
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
  }

  fillFields = data => {
    let {
      first_name,
      last_name,
      email,
      address,
      phone_code,
      phone_number,
      professional_experience_info,
      description
    } = data;

    // this.props.dispatch(change('RenderProfileForm', 'avatar',       avatar));
    this.props.dispatch(change("RenderProfileForm", "first_name", first_name));
    this.props.dispatch(change("RenderProfileForm", "last_name", last_name));
    this.props.dispatch(change("RenderProfileForm", "email", email));
    this.props.dispatch(
      change(
        "RenderProfileForm",
        "phone_code",
        phone_code ? { label: phone_code, name: phone_code } : null
      )
    );
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

export default connect(({ clientData, specialistData, percents }) => ({
  clientData,
  specialistData,
  percents
}))(RenderProfileForm);
