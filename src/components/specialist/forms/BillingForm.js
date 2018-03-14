import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { required } from '../../../helpers/validate';
import {RenderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import InputField from '../../forms/renders/InputField';
import { Grid } from 'semantic-ui-react';
import { DvTitle } from '../../../styleComponents/layout/DvTitles';
import StyledWelcomeForm from '../../../styleComponents/StyledWelcomeForm';
import { employeers } from '../../../helpers/selects/employeers';
import { segments } from '../../../helpers/selects/segments';
import SpecialistBillingForm from './SpecialistBillingForm';
import InputRadio from '../../forms/renders/InputRadio';

class BillingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "0",
      fetch: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      tab: event.target.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.specialistData && this.state.fetch) {
      if( nextProps.specialistData.specialist_billing ) {
        if( nextProps.specialistData.specialist_billing.billing_type ) {
          this.setState({
            tab: nextProps.specialistData.specialist_billing.billing_type,
            fetch: false,
          });
        }
      }
    }
  }

  render() {
    const { submitting, industries, welcomeText } = this.props;
    const { tab } = this.state;

    const tabs = [
      { billingTab: "direct_payment", render: () => 
        <Grid.Column mobile={16} computer={8}>
          <InputField 
            name="bank_account_details"
            placeholder="Bank account details"
          />
          <InputField 
            name="swift_code"
            placeholder="Swift code"
          />
        </Grid.Column>
      },
      { billingTab: "payment_to_company", render: () => 
        <Grid.Column mobile={16} computer={8}>
          <InputField 
            name="company_name"
            placeholder="Company name"
          />
          <InputField 
            name="manager"
            placeholder="Manager"
          />
        </Grid.Column>
      },
    ];

    return (
      <Grid>
        <Grid.Row textAlign="center">
            <Grid.Column mobile={16} computer={4}>

                <InputRadio 
                    name="billing_type"
                    placeholder="Direct payment"
                    value={0}
                    // checked={true}
                    onChange={this.handleChange}
                    checked={this.state.tab == 0}

                />

            </Grid.Column>
            <Grid.Column mobile={16} computer={4}>

                <InputRadio 
                    name="billing_type"
                    value={1}
                    placeholder="Payment to company"
                    onChange={this.handleChange}
                    checked={this.state.tab == 1}
                    
                />

            </Grid.Column>
        </Grid.Row>

        <Grid.Row>
            {tabs[tab].render()}
        </Grid.Row>
        
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

              {}
            </StyledWelcomeForm>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={8}>
            <DvButton
              type="submit"
              disabled={submitting}
              content='SAVE &amp; CONTINUE'
              primary
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default BillingForm;
