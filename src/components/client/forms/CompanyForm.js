import React, { Component } from "react";
import { Field } from "redux-form";
import { NavLink } from "react-router-dom";
import { required } from "../../../helpers/validate";
import RenderSelect from "../../forms/renders/RenderSelect";
import { clientCategories } from "../../../helpers/selects/clientCategories";
import {
  NextBtn,
  BackBtn,
  SaveBtn
} from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import { Grid } from "semantic-ui-react";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import { employeers } from "../../../helpers/selects/employeers";
import RenderImage from "../../forms/renders/RenderImage";

class CompanyForm extends Component {
  render() {
    const {
      submitting,
      industries,
      clientData,
      specialistData,
      handleFormField,
      isEditing,
      handleSelectChange
    } = this.props;
    let { avatar } = specialistData || clientData || false;

    return (
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
                    name="name"
                    label="Company Name"
                    validate={[required]}
                    handleFormField={handleFormField}
                    isRequired
                  />

                  <InputField
                    name="company_address"
                    label="Company Address"
                    handleFormField={handleFormField}
                  />

                  <InputField
                    name="website"
                    label="Website"
                    handleFormField={handleFormField}
                  />

                  <InputField
                    name="country"
                    label="Country"
                    handleFormField={handleFormField}
                  />

                  <InputField
                    name="city"
                    label="City"
                    handleFormField={handleFormField}
                  />

                  <Field
                    name="tell_about"
                    component={RenderTextArea}
                    label="Tell us about your business"
                    className="area"
                  />
                </Grid.Column>

                <Grid.Column computer={8}>
                  <InputField
                    name="registered_name"
                    label="Company Registered Name"
                    handleFormField={handleFormField}
                  />

                  <InputField
                    name="abn_acn"
                    label="ABN / ACN"
                    handleFormField={handleFormField}
                  />

                  <Field
                    name="segment"
                    component={RenderSelect}
                    options={clientCategories}
                    label="Segment"
                    placeholder="Select"
                    onChange={e => handleSelectChange(e, "segment")}
                    validate={[required]}
                    handleFormField={handleFormField}
                    isRequired
                  />

                  <div id="industry" className="half-column">
                    <Field
                      name="industry"
                      component={RenderSelect}
                      label="Industry"
                      placeholder="Select"
                      onChange={e => handleSelectChange(e, "industry")}
                      options={industries.industry}
                      validate={[required]}
                      handleFormField={handleFormField}
                      isRequired
                    />
                  </div>

                  <div id="number_of_employers" className="half-column">
                    <Field
                      name="number_of_employers"
                      component={RenderSelect}
                      label="Number of employers"
                      placeholder="Select"
                      onChange={e =>
                        handleSelectChange(e, "number_of_employers")
                      }
                      options={employeers}
                      validate={[required]}
                      handleFormField={handleFormField}
                      isRequired
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {/* </Grid.Column>
                  <Grid.Column mobile={16} computer={8}> */}
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
                <SaveBtn
                  type="submit"
                  disabled={submitting}
                  onClick={this.props.handleSubmitError}
                  primary
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
                  <span>NextStep</span>
                </NextBtn>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>

        {/* <Grid.Row>
                  <DvButton
                    type="submit"
                    disabled={submitting}
                    content='SAVE & CONTINUE'
                    primary
                  />
                </Grid.Row> */}
      </Grid>
    );
  }
}

export default CompanyForm;
