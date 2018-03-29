import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { required } from '../../../helpers/validate';
import RenderField from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import { SaveBtn } from '../../../styleComponents/layout/DvButton';
import InputField from '../../forms/renders/InputField';
import { Grid } from 'semantic-ui-react';
import { DvTitle } from '../../../styleComponents/layout/DvTitles';
import StyledWelcomeForm from '../../../styleComponents/StyledWelcomeForm';
import { employeers } from '../../../helpers/selects/employeers';
import { segments } from '../../../helpers/selects/segments';
import RenderImage from '../../forms/renders/RenderImage';

class CompanyForm extends Component {
 
  render() {
    const { submitting, industries, welcomeText, clientData, specialistData, handleFormField } = this.props;
    let { avatar } = specialistData || clientData || false;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={3}>
            <Grid.Column computer={3}>
              { !avatar && <p>Upload your photo</p>}
                <Field
                  name='person'
                  component={RenderImage}
                  type='file'
                  avatar={avatar}
                  placeholder='Choose your photo'
                />
            </Grid.Column>
          </Grid.Column>
          <Grid.Column mobile={16} computer={5}>
            <StyledWelcomeForm>
              { welcomeText && [
                <DvTitle mTop='80' xs key="1">
                  Welcome to The Digital Village!

                </DvTitle>,
                <p key="2">
                  Please complete your profile so we can help you make the
                  most out of the Digital Village platform.
                </p>
              ]}

              <InputField
                name="name"
                label="Company Name"
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
            </StyledWelcomeForm>
          </Grid.Column>

          <Grid.Column mobile={16} computer={5}>
          <StyledWelcomeForm>
            <div id="segment" className='half-column'>
              <Field
                name="segment"
                component={RenderSelect}
                label="Segment"
                placeholder="Select"
                options={segments}
                validate={[required]}
                handleFormField={handleFormField}
              />
            </div>

            <div id="industry" className='half-column'>
              <Field
                name="industry"
                component={RenderSelect}
                label="Industry"
                placeholder="Select"
                options={industries["industry"]}
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

            </StyledWelcomeForm>
          </Grid.Column>
          <Grid.Column computer={3}>
            <SaveBtn type="submit"
                    disabled={submitting}
                    // content='321'
                    primary
                >
              <span>next step</span>
            </SaveBtn>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default CompanyForm;
