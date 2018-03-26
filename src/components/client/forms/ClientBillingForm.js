import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { required } from '../../../helpers/validate';
import RenderField from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {clientCategories} from '../../../helpers/selects/clientCategories';
import { DvButton } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import LocationField from '../../forms/renders/LocationField'
import RenderTextArea from '../../forms/renders/RenderTextArea';
import BillingForm from "./BillingForm";

let renderError = true;

class ClientBillingForm extends Component {

    render() {
        const { handleSubmit, submitting, clientData } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <BillingForm clientData={clientData} submitting={submitting}/>
            </form>
        )
    }

    componentWillReceiveProps(nextProps) {
        let client = nextProps.clientData;

        if (client) {
            if(client.successId) {
                if (renderError) {
                    this.fillFields(client);
                    renderError = false;
                }
            }
        }
    }

    fillFields = data => {
        let { customer_billing } = data;

        for(let key in customer_billing) {
          this.props.dispatch(change('ClientBillingForm', key, customer_billing[key]));
        }

    }
}

ClientBillingForm = reduxForm({
    form: 'ClientBillingForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ClientBillingForm);

export default connect(
  state => {
    const { clientData } = state;
    return { clientData }
  })(ClientBillingForm);
