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
import SpecialistBillingForm from './SpecialistBillingForm';
import InputRadio from '../../forms/renders/InputRadio';
import RenderImage from '../../forms/renders/RenderImage';

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
    const { submitting, industries, welcomeText, clientData, specialistData } = this.props;
    const { tab } = this.state;
    let { avatar } = specialistData || clientData || false;

    const tabs = [
      { billingTab: "direct_payment", render: () => 
        <Grid.Column mobile={16} computer={16}>
          <InputField 
            name="bank_account_details"
            label="Bank account details"
          />
          <InputField 
            name="swift_code"
            label="Swift code"
          />
        </Grid.Column>
      },
      { billingTab: "payment_to_company", render: () => 
        <Grid.Column mobile={16} computer={16}>
          <InputField 
            name="company_name"
            label="Company name"
          />
          <InputField 
            name="manager"
            label="Manager"
          />
        </Grid.Column>
      },
    ];

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={3}>
            { !avatar && <p>Upload your photo</p>}
                <Field
                  name='person'
                  component={RenderImage}
                  type='file'
                  avatar={avatar}
                  placeholder='Choose your photo'
                />
          </Grid.Column>
          <Grid.Column mobile={16} computer={10}>
            <Grid>
              <Grid.Row>
                <Grid.Column computer={3}>

                </Grid.Column>
                <Grid.Column computer={5}>
                  <InputRadio 
                      name="billing_type"
                      placeholder="Direct payment"
                      value={0}
                      // checked={true}
                      onChange={this.handleChange}
                      checked={this.state.tab == 0}

                  /> 
                </Grid.Column>
                <Grid.Column computer={5}>
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
            </Grid>
          </Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            <SaveBtn
              type="submit"
              disabled={submitting}
              content='SAVE'
              primary
            >
            <span>save</span>
            </SaveBtn>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default BillingForm;