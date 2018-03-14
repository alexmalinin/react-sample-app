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
          tab: event.target.value 
        });
    }

    componentWillReceiveProps(nextProps) {
        if( nextProps.clientData && this.state.fetch ) {
            if( nextProps.clientData.customer_billing ) {
                if ( nextProps.clientData.customer_billing.billing_type ) {
                    this.setState({
                        tab: nextProps.clientData.customer_billing.billing_type,
                        fetch: false,
                    });
                }
            }
        }
    }
    
    render() {
    const { submitting, clientData } = this.props;
    const { tab } = this.state;

    const tabs = [
        { billingTab: "paypal", render: () => 
            <Grid.Column mobile={16} computer={8}>
                <InputField 
                    name="account_number"
                    placeholder="Account number"
                />
                <InputField 
                    name="password"
                    placeholder="Password"
                />
            </Grid.Column>
        },
        { billingTab: "credit_card", render: () => 
            <Grid.Column mobile={16} computer={8}>

                <InputField 
                    name="card_name"
                    placeholder="Card name"
                />
                <InputField 
                    name="card_number"
                    placeholder="Card number"
                />

                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={8}>

                            <InputField 
                                name="expiry_date"
                                placeholder="Expiry date"
                            />

                        </Grid.Column>
                        <Grid.Column computer={8}>

                            <InputField 
                                name="cvv"
                                placeholder="CVV"
                            />

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        },
        { billingTab: "accounts", render: () => 
            <Grid.Column mobile={16} computer={8}>
                <InputField 
                    name="account_details"
                    placeholder="Account details"
                />
            </Grid.Column>
        },
    ];

    return (
        <Grid>
            <Grid.Row textAlign="center">
                <Grid.Column mobile={16} computer={3}>

                    <InputRadio 
                        name="billing_type"
                        placeholder="Paypal"
                        value={0}
                        onChange={this.handleChange}
                        checked={this.state.tab == 0}

                    />

                </Grid.Column>
                <Grid.Column mobile={16} computer={3}>

                    <InputRadio 
                        name="billing_type"
                        value={1}
                        placeholder="Credit card"
                        onChange={this.handleChange}
                        checked={this.state.tab == 1}
                        
                    />

                </Grid.Column>
                <Grid.Column mobile={16} computer={3}>

                    <InputRadio 
                        name="billing_type"
                        value={2}
                        placeholder="Accounts"
                        onChange={this.handleChange}
                        checked={this.state.tab == 2}

                    />

                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                {tabs[tab].render()}
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
