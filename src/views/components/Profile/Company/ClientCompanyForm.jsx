import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Field } from "redux-form";
import { Grid } from "semantic-ui-react";

import ImageUploader from "@UI/inputs/ImageUploader";
import InputField from "@UI/inputs/InputField";
import SelectField from "@UI/inputs/SelectField";
import RenderTextArea from "@UI/inputs/TextArea";

import { CancelBtn, BackBtn, SaveBtn, NextBtn } from "@styled/DVButton";

import { required } from "@views/utils/validate";
import { segments, employeers } from "./helpers/selects";

const propTypes = {};

const defaultProps = {};

const ClientCompanyForm = ({
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
          <Grid.Column computer={3}>
            <Field
              name="person"
              component={ImageUploader}
              type="file"
              avatar={avatar}
              placeholder="Choose your photo"
            />
          </Grid.Column>
          <Grid.Column computer={10}>
            <Grid>
              <Grid.Row>
                <Grid.Column computer={8}>
                  <Field
                    name="name"
                    label="Company Name"
                    component={InputField}
                    validate={[required]}
                    isRequired
                  />

                  <Field
                    name="company_address"
                    label="Company Address"
                    component={InputField}
                  />

                  <Field
                    name="website"
                    label="Website"
                    component={InputField}
                  />

                  <Field
                    name="country"
                    label="Country"
                    component={InputField}
                  />

                  <Field name="city" label="City" component={InputField} />

                  <Field
                    name="tell_about"
                    component={RenderTextArea}
                    label="Tell us about your business"
                    className="area"
                  />
                </Grid.Column>

                <Grid.Column computer={8}>
                  <Field
                    name="registered_name"
                    label="Company Registered Name"
                    component={InputField}
                  />

                  <Field
                    name="abn_acn"
                    label="ABN / ACN"
                    component={InputField}
                  />

                  <Field
                    name="segment"
                    label="Segment"
                    placeholder="Select"
                    component={SelectField}
                    options={segments}
                    validate={[required]}
                    isRequired
                  />

                  <div id="industry" className="half-column">
                    <Field
                      name="industry"
                      component={SelectField}
                      label="Industry"
                      placeholder="Select"
                      options={industries}
                      validate={[required]}
                      isRequired
                    />
                  </div>

                  <div id="number_of_employers" className="half-column">
                    <Field
                      name="number_of_employers"
                      label="Number of employers"
                      placeholder="Select"
                      component={SelectField}
                      options={employeers}
                      validate={[required]}
                      isRequired
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
                <NavLink exact to="/profile/info">
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

ClientCompanyForm.propTypes = propTypes;
ClientCompanyForm.defaultProps = defaultProps;

export default ClientCompanyForm;
