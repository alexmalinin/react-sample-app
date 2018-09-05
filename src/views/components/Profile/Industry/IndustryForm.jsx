import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Field } from "redux-form";
import { Grid } from "semantic-ui-react";

import ImageUploader from "@UI/inputs/ImageUploader";
import InputField from "@UI/inputs/InputField";
import SelectField from "@UI/inputs/SelectField";
import MultiSelect from "@UI/inputs/MultiSelect";

import Availability from "./forms/Availability";
import Communication from "./forms/Communication";

import { CancelBtn, BackBtn, SaveBtn, NextBtn } from "@styled/DVButton";

import { required } from "@views/utils/validate";
import { jobTitles } from "./helpers/selects";

const IndustryForm = ({
  handleSubmit,
  submitting,
  avatar,
  industries,
  experienceLevels,
  getSkills,
  skills,
  isEditing,
  getProjectTypes,
  projectTypesLoading,
  projectTypes
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Grid>
        <Grid.Row>
          <Grid.Column computer={3}>
            <Field
              name="person"
              component={ImageUploader}
              type="file"
              avatar={avatar}
              disabled
              placeholder="Choose your photo"
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={5}>
            <div id="job_title" className="half-column">
              <Field
                name="job_title"
                label="I Am a"
                placeholder="Select"
                component={SelectField}
                options={jobTitles}
                validate={[required]}
                isRequired
              />
            </div>
            <Field
              name="position"
              label="Position"
              placeholder="Select"
              component={InputField}
            />
            <Field
              name="industry_title"
              label="What is your industry title?"
              component={InputField}
              validate={[required]}
              isRequired
            />
            <div id="experience_level" className="half-column">
              <Field
                name="experience_level"
                label="Experience Level"
                placeholder="Select"
                component={SelectField}
                options={experienceLevels}
                validate={[required]}
                isRequired
              />
            </div>
            <span id="industry" />
            <Field
              name="industry_area_id"
              label="Select your area within the digital industry"
              placeholder="Select"
              component={SelectField}
              options={industries}
              validate={[required]}
              isRequired
            />
            <MultiSelect
              name="skills_attributes"
              label="Enter your skills here"
              placeholder="Start type your skill here..."
              onOpen={getSkills}
              options={skills}
            />
          </Grid.Column>

          <Grid.Column mobile={16} computer={5}>
            <Field
              name="contact_number"
              label="Best Contact Number"
              component={InputField}
            />

            <div id="project_type" className="half-column">
              <Field
                name="project_type"
                label="Project Interest"
                placeholder="Select"
                component={SelectField}
                onOpen={getProjectTypes}
                options={projectTypes}
                validate={[required]}
                isRequired
              />
            </div>

            <div className="rate">
              <div className="flex-wrapper">
                <div>
                  <Field
                    name="hourly_rate"
                    type="number"
                    label="Hourly Rate"
                    component={InputField}
                  />
                </div>
              </div>
            </div>

            <Availability />

            <Communication />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            <div className="navigation-wrap">
              {isEditing ? (
                <NavLink exact to="/dashboard/about">
                  <CancelBtn primary>
                    <span>Cancel</span>
                  </CancelBtn>
                </NavLink>
              ) : (
                <NavLink exact to="/profile/info">
                  <BackBtn primary>
                    <span>Back</span>
                  </BackBtn>
                </NavLink>
              )}

              {isEditing ? (
                <SaveBtn
                  type="submit"
                  disabled={submitting}
                  primary
                  updatebtn="true"
                >
                  <span>Save</span>
                </SaveBtn>
              ) : (
                <NextBtn type="submit" disabled={submitting} primary>
                  <span>Next Step</span>
                </NextBtn>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default IndustryForm;
