import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { NavLink } from 'react-router-dom';
import { required } from '../../../helpers/validate';
import RenderField from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {clientCategories} from '../../../helpers/selects/clientCategories';
import { NextBtn, BackBtn } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import { Grid } from 'semantic-ui-react';
import RenderTextArea from '../../forms/renders/RenderTextArea';
import { employeers } from '../../../helpers/selects/employeers';
import RenderImage from '../../forms/renders/RenderImage';

class CompanyForm extends Component {

    render() {
        const { submitting, industries, clientData, specialistData, handleFormField } = this.props;
        let { avatar } = specialistData || clientData || false;

        return (
              <Grid>
                <Grid.Row>
                  <Grid.Column computer={3}>
                    {/* { !avatar && <p>Upload your photo</p>} */}
                      <Field
                        name='person'
                        component={RenderImage}
                        type='file'
                        avatar={avatar}
                        placeholder='Choose your photo'
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

                          <Field name="tell_about" component={RenderTextArea} label="Tell us about your business" className="area"/>
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
                            validate={[required]}
                            handleFormField={handleFormField}
                          />

                          <div id="industry" className='half-column'>
                            <Field
                              name="industry"
                              component={RenderSelect}
                              label="Industry"
                              placeholder="Select"
                              options={industries.industry}
                              validate={[required]}
                              handleFormField={handleFormField}
                            />
                          </div>

                          <div id="number_of_employers" className='half-column'>
                            <Field
                              name="number_of_employers"
                              component={RenderSelect}
                              label="Number of employers"
                              placeholder="Select"
                              options={employeers}
                              validate={[required]}
                              handleFormField={handleFormField}
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
                    <NavLink exact to="/dashboard/profile">
                      <BackBtn
                        disabled={submitting}
                        primary
                      >
                        <span>Back</span>
                      </BackBtn>
                    </NavLink>
                    <NextBtn type="submit"
                      disabled={submitting}
                      primary
                      >
                      <span>next step</span>
                    </NextBtn>
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

        )
    }
}

export default CompanyForm;
