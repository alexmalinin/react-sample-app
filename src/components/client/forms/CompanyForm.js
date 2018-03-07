import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { required } from '../../../helpers/validate';
import {renderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {clientCategories} from '../../../helpers/selects/clientCategories';
import { DvButton } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import { Grid } from 'semantic-ui-react';
import RenderTextArea from '../../forms/renders/RenderTextArea';
import { employeers } from '../../../helpers/selects/employeers';

class CompanyForm extends Component {

    render() {
        const { submitting, industries } = this.props;

        return (
              <Grid>
                <Grid.Row>
                  <Grid.Column mobile={16} computer={8}>
                    <InputField
                      name="name"
                      placeholder="Company Name /"
                    />


                    <InputField
                      name="company_address"
                      placeholder="Company Address /"
                    />

                    <InputField
                      name="website"
                      placeholder="Website /"
                    />

                    <InputField
                      name="country"
                      placeholder="Country /"
                    />

                    <InputField
                      name="city"
                      placeholder="City /"
                    />

                    <span>Tell us about your business /</span>
                    <Field name="tell_about" component={RenderTextArea}/>

                  </Grid.Column>
                  <Grid.Column mobile={16} computer={8}>

                    <InputField
                      name="registered_name"
                      placeholder="Company Registered Name /"
                    />

                    <InputField
                      name="abn_acn"
                      placeholder="ABN / ACN"
                    />

                    <Field
                      name="segment"
                      component={RenderSelect}
                      options={clientCategories}
                      placeholder="Segment /"
                      validate={[required]}
                    />

                    <div id="industry" className='half-column'>
                      <Field
                        name="industry"
                        component={RenderSelect}
                        placeholder="Industry"
                        options={clientCategories}
                      />
                    </div>

                    <div id="number_of_employers" className='half-column'>
                      <Field
                        name="number_of_employers"
                        component={RenderSelect}
                        placeholder="Number of employers"
                        options={employeers}
                      />
                    </div>

                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <DvButton
                    type="submit"
                    disabled={submitting}
                    content='SAVE & CONTINUE'
                    primary
                  />
                </Grid.Row>
              </Grid>

        )
    }
}

export default CompanyForm;
