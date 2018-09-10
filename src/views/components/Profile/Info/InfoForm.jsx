import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Form, Field } from "redux-form";
import { Grid } from "semantic-ui-react";
import { Element, scroller } from "react-scroll";

import ImageUploader from "@UI/inputs/ImageUploader";
import InputField from "@UI/inputs/InputField";
import PhoneField from "@UI/inputs/PhoneField";
import RenderTextArea from "@UI/inputs/TextArea";

import StyledExperienceCards from "@styled/ExperienceCards";
import ExperinceCards from "./ExperienceCards";
import { CancelBtn, SaveBtn, NextBtn } from "@styled/DVButton";

import { getAllUrlParams } from "@views/utils/functions";
import { required, email } from "@views/utils/validate";

class InfoForm extends Component {
  componentDidMount() {
    const param = getAllUrlParams().hash;

    if (param)
      scroller.scrollTo(param, {
        duration: 1000,
        delay: 100,
        smooth: true,
        offset: -200
      });
  }

  render() {
    const {
      handleSubmit,
      submitting,
      isEditing,
      isSpecialist,
      avatar,
      educations,
      work_experiences
    } = this.props;

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
                      name="first_name"
                      label="First Name"
                      type="text"
                      component={InputField}
                      validate={[required]}
                      isRequired
                      tabIndex="1"
                    />

                    <Field
                      name="city"
                      label="City"
                      type="text"
                      component={InputField}
                      validate={[required]}
                      isRequired
                      tabIndex="3"
                    />

                    <PhoneField tabIndex="5" />
                  </Grid.Column>
                  <Grid.Column computer={8}>
                    <Field
                      name="last_name"
                      label="Last Name"
                      type="text"
                      component={InputField}
                      validate={[required]}
                      isRequired
                      tabIndex="2"
                    />
                    <Field
                      name="country"
                      label="Country"
                      type="text"
                      component={InputField}
                      validate={[required]}
                      isRequired
                      tabIndex="4"
                    />
                    <Field
                      name="email"
                      label="Email"
                      type="email"
                      component={InputField}
                      validate={[required, email]}
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
                        isSpecialist
                          ? "professional_experience_info"
                          : "description"
                      }
                      className="text-area-group"
                    >
                      <Field
                        name={
                          isSpecialist
                            ? "professional_experience_info"
                            : "description"
                        }
                        label={
                          "Write a paragraph or two about your professional experience "
                        }
                        component={RenderTextArea}
                        tabIndex="7"
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {isSpecialist && (
                <Grid>
                  <Grid.Row>
                    <Grid.Column computer={16}>
                      <StyledExperienceCards>
                        <Element
                          name="education"
                          className="experience-section"
                        >
                          <h3>Education</h3>
                          <ExperinceCards educations={educations} />
                        </Element>
                      </StyledExperienceCards>
                    </Grid.Column>
                    <Grid.Column computer={16}>
                      <StyledExperienceCards>
                        <Element
                          name="experience"
                          className="experience-section"
                        >
                          <h3>Work experience</h3>
                          <ExperinceCards experiences={work_experiences} />
                        </Element>
                      </StyledExperienceCards>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )}
            </Grid.Column>
            <Grid.Column computer={3}>
              <div className="navigation-wrap">
                {isEditing ? (
                  <NavLink exact to="/dashboard/about">
                    <CancelBtn primary>
                      <span>Cancel</span>
                    </CancelBtn>
                  </NavLink>
                ) : null}

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
  }
}

export default InfoForm;
