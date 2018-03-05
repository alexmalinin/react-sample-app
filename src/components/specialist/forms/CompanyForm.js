import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { required } from '../../../helpers/validate';
import {RenderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import InputField from '../../forms/renders/InputField';
import { Grid } from 'semantic-ui-react';
import {DvTitle} from '../../../styleComponents/layout/DvTitles';
import StyledWelcomeForm from '../../../styleComponents/StyledWelcomeForm';
import { employeers } from '../../../helpers/selects/employeers';
import { segments } from '../../../helpers/selects/segments';

class CompanyForm extends Component {

  render() {
    const { submitting, industries, welcomeText } = this.props;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={8}>
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
            </StyledWelcomeForm>
          </Grid.Column>

          <Grid.Column mobile={16} computer={8}>

            <div id="segment" className='half-column'>
              <Field
                name="segment"
                component={RenderSelect}
                placeholder="Number of employers"
                options={segments}
              />
            </div>

            <div id="industry" className='half-column'>
              <Field
                name="industry"
                component={RenderSelect}
                placeholder="Industry"
                options={industries["industry"]}
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
          <Grid.Column>
            <DvButton
              type="submit"
              disabled={submitting}
              content='SAVE & CONTINUE'
              primary
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default CompanyForm;