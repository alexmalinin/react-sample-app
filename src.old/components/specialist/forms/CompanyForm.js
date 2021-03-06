import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Field } from "redux-form";
import RenderSelect from "../../forms/renders/RenderSelect";
import {
  NextBtn,
  BackBtn,
  SaveBtn,
  CancelBtn
} from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import { Grid } from "semantic-ui-react";
import { DvTitle } from "../../../styleComponents/layout/DvTitles";
import StyledWelcomeForm from "../../../styleComponents/StyledWelcomeForm";
import { employeers } from "../../../helpers/selects/employeers";
import { segments } from "../../../helpers/selects/segments";
import RenderImage from "../../forms/renders/RenderImage";

class CompanyForm extends Component {
  render() {
    const {
      submitting,
      industries,
      welcomeText,
      clientData,
      specialistData,
      isEditing
    } = this.props;
    let { avatar } = specialistData || clientData || false;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={3}>
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

              <InputField name="name" label="Company Name" />

              <InputField name="company_address" label="Company Address" />

              <InputField name="website" label="Website" />

              <InputField name="country" label="Country" />

              <InputField name="city" label="City" />
            </StyledWelcomeForm>
          </Grid.Column>

          <Grid.Column mobile={16} computer={5}>
            <StyledWelcomeForm>
              <div id="segment" className="half-column">
                <Field
                  name="segment"
                  component={RenderSelect}
                  label="Segment"
                  placeholder="Select"
                  options={segments}
                />
              </div>

              <div id="industry" className="half-column">
                <Field
                  name="industry"
                  component={RenderSelect}
                  label="Industry"
                  placeholder="Select"
                  options={industries["industry"]}
                />
              </div>

              <div id="number_of_employers" className="half-column">
                <Field
                  name="number_of_employers"
                  component={RenderSelect}
                  label="Number of employers"
                  placeholder="Select"
                  options={employeers}
                />
              </div>
            </StyledWelcomeForm>
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
                <NavLink exact to="/profile/industry">
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
                  onClick={this.props.handleSubmitError}
                  updatebtn="true"
                >
                  <span>Save</span>
                </SaveBtn>
              ) : (
                <NextBtn
                  type="submit"
                  disabled={submitting}
                  onClick={this.props.handleSubmitError}
                  primary
                >
                  <span>next step</span>
                </NextBtn>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default CompanyForm;
