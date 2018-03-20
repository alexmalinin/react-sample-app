import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { required } from '../../../helpers/validate';
import {renderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {clientCategories} from '../../../helpers/selects/clientCategories';
import { SaveBtn } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import { Grid } from 'semantic-ui-react';
import RenderTextArea from '../../forms/renders/RenderTextArea';
import { employeers } from '../../../helpers/selects/employeers';
import RenderImage from '../../forms/renders/RenderImage';

class CompanyForm extends Component {

    render() {
        const { submitting, industries, clientData, specialistData } = this.props;
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
                          />

                          <InputField
                            name="company_address"
                            label="Company Address"
                          />

                          <InputField
                            name="website"
                            label="Website"
                          />

                          <InputField
                            name="country"
                            label="Country"
                          />

                          <InputField
                            name="city"
                            label="City"
                          />

                          <Field name="tell_about" component={RenderTextArea} label="Tell us about your business"/>
                        </Grid.Column>

                        <Grid.Column computer={8}>
                          <InputField
                            name="registered_name"
                            label="Company Registered Name"
                          />

                          <InputField
                            name="abn_acn"
                            label="ABN / ACN"
                          />

                          <Field
                            name="segment"
                            component={RenderSelect}
                            options={clientCategories}
                            label="Segment"
                            placeholder="Select"
                            validate={[required]}
                          />

                          <div id="industry" className='half-column'>
                            <Field
                              name="industry"
                              component={RenderSelect}
                              label="Industry"
                              placeholder="Select"
                              options={industries.industry}
                            />
                          </div>

                          <div id="number_of_employers" className='half-column'>
                            <Field
                              name="number_of_employers"
                              component={RenderSelect}
                              label="Number of employers"
                              placeholder="Select"
                              options={employeers}
                            />
                          </div>
                        </Grid.Column>  
                      </Grid.Row>
                    </Grid>

                  {/* </Grid.Column>
                  <Grid.Column mobile={16} computer={8}> */}
                     
                  </Grid.Column>
                  <Grid.Column computer={3}>
                    <SaveBtn type="submit"
                              disabled={submitting}
                              content=''
                              primary
                              >
                      <span>next step</span>
                    </SaveBtn>
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
