import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Field } from "redux-form";
import { Grid } from "semantic-ui-react";

import ImageUploader from "@UI/inputs/ImageUploader";
import InputField from "@UI/inputs/InputField";
import SelectField from "@UI/inputs/SelectField";

import { CancelBtn, BackBtn, SaveBtn, NextBtn } from "@styled/DVButton";

import { segments, employeers } from "./helpers/selects";

const SpecialistCompanyForm = ({
  isEditing,
  avatar,
  submitting,
  industries,
  handleSubmit
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={3}>
            <Grid.Column computer={3}>
              <Field
                name="person"
                component={ImageUploader}
                type="file"
                avatar={avatar}
                placeholder="Choose your photo"
              />
            </Grid.Column>
          </Grid.Column>
          <Grid.Column mobile={16} computer={5}>
            <Field name="name" label="Company Name" component={InputField} />

            <Field
              name="company_address"
              label="Company Address"
              component={InputField}
            />

            <Field name="website" label="Website" component={InputField} />

            <Field name="country" label="Country" component={InputField} />

            <Field name="city" label="City" component={InputField} />
          </Grid.Column>

          <Grid.Column mobile={16} computer={5}>
            <div id="segment" className="half-column">
              <Field
                name="segment"
                component={SelectField}
                label="Segment"
                placeholder="Select"
                options={segments}
              />
            </div>

            <div id="industry" className="half-column">
              <Field
                name="industry"
                component={SelectField}
                label="Industry"
                placeholder="Select"
                options={industries}
              />
            </div>

            <div id="number_of_employers" className="half-column">
              <Field
                name="number_of_employers"
                label="Number of employers"
                component={SelectField}
                placeholder="Select"
                options={employeers}
              />
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            <div className="navigation-wrap">
              {isEditing ? (
                <NavLink exact to="/dashboard/about">
                  <CancelBtn disabled={submitting} primary>
                    <span>Cancel</span>
                  </CancelBtn>
                </NavLink>
              ) : (
                <NavLink exact to="/dashboard/industry">
                  <BackBtn disabled={submitting} primary>
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
                  <span>next step</span>
                </NextBtn>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default SpecialistCompanyForm;
