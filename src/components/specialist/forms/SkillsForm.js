import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Field } from "redux-form";
import { required } from "../../../helpers/validate";
import { job_titles } from "../../../helpers/selects/job_titles";
import RenderField from "../../forms/renders/RenderField";
import RenderSelect from "../../forms/renders/RenderSelect";
import {
  NextBtn,
  BackBtn,
  SaveBtn
} from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import { Grid } from "semantic-ui-react";
import { DvTitle } from "../../../styleComponents/layout/DvTitles";
import StyledWelcomeForm from "../../../styleComponents/StyledWelcomeForm";
import RenderSpecialityArea from "../../forms/renders/RenderSpecialityArea";
import RenderSkillsArea from "../../forms/renders/RenderSkillsArea";
import Communication from "../Communication/Communication";
import Availability from "../Availability/Availability";
import RenderImage from "../../forms/renders/RenderImage";

class SkillsForm extends Component {
  render() {
    const {
      submitting,
      industry,
      industries,
      projectTypes,
      experienceLevels,
      welcomeText,
      clientData,
      specialistData,
      isEditing,
      handleChange,
      handleSelectChange,
      handleCheckboxChange
    } = this.props;
    let { avatar } = specialistData || clientData || false;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column computer={3}>
            {!avatar && <p>Upload your photo</p>}
            <Field
              name="person"
              component={RenderImage}
              type="file"
              avatar={avatar}
              disabled
              placeholder="Choose your photo"
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={5}>
            <StyledWelcomeForm>
              {welcomeText && [
                <DvTitle mTop="80" xs key="1">
                  Welcome to The Digital Village!
                </DvTitle>,
                <p key="2">
                  Please complete your profile so we can help you make the most
                  out of the Digital Village platform.
                </p>
              ]}
              <div id="job_title" className="half-column">
                <Field
                  name="job_title"
                  label="I Am a"
                  placeholder="Select"
                  component={RenderSelect}
                  onChange={e => this.props.handleSelectChange(e, "job_title")}
                  options={job_titles}
                  validate={[required]}
                />
              </div>
              <InputField
                name="position"
                label="Position"
                onChange={handleChange}
              />
              <InputField
                name="industry_title"
                label="What is your industry title?"
                onChange={handleChange}
                validate={[required]}
              />
              {/*doesn't save value*/}
              <div id="experience_level" className="half-column">
                <Field
                  name="experience_level"
                  component={RenderSelect}
                  placeholder="Select"
                  label="Experience Level"
                  onChange={e =>
                    this.props.handleSelectChange(e, "experience_level")
                  }
                  options={experienceLevels}
                  validate={[required]}
                />
              </div>
              <span id="industry" /> {/*for error scrolling*/}
              <Field
                name="industry"
                component={RenderSelect}
                placeholder="Select"
                label="Select your area within the digital industry"
                onChange={e => this.props.handleSelectChange(e, "industry")}
                options={industries["industry"]}
                validate={[required]}
              />
              <span id="industry_title" /> {/*for error scrolling*/}
              {industry && (
                <RenderSpecialityArea
                  speciality={industries["speciality"]}
                  industry={industry}
                  specialities={specialistData.specialities}
                />
              )}
              <RenderSkillsArea handleSelectChange={handleSelectChange} />
            </StyledWelcomeForm>
          </Grid.Column>

          <Grid.Column mobile={16} computer={5}>
            <InputField
              name="contact_number"
              label="Best Contact Number"
              onChange={handleChange}
            />

            <div id="project_type" className="half-column">
              <Field
                name="project_type"
                component={RenderSelect}
                placeholder="Select"
                label="Project Interest"
                onChange={e => this.props.handleSelectChange(e, "project_type")}
                options={projectTypes}
                validate={[required]}
              />
            </div>

            <div className="rate">
              <div className="flex-wrapper">
                <div>
                  <Field
                    name="hourly_rate"
                    component={RenderField}
                    onChange={handleChange}
                    type="number"
                    label="Hourly Rate"
                  />
                </div>
              </div>
            </div>

            <Availability />

            <Communication handleCheckboxChange={handleCheckboxChange} />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            <div className="navigation-wrap">
              {!isEditing ? (
                <NavLink exact to="/dashboard/profile">
                  <BackBtn disabled={submitting} primary>
                    <span>Back</span>
                  </BackBtn>
                </NavLink>
              ) : null}

              {isEditing ? (
                <SaveBtn type="submit" disabled={submitting} primary updatebtn>
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
    );
  }
}

export default SkillsForm;
