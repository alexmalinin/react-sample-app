import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { required } from '../../../helpers/validate';
import {renderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {clientCategories} from '../../../helpers/selects/clientCategories';
import { DvButton } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import LocationField from '../../forms/renders/LocationField'
import RenderTextArea from '../../forms/renders/RenderTextArea';
import BusinessForm from "./BusinessForm";

let renderError = true;

class ClientBusinessForm extends Component {

    render() {
        const { handleSubmit, submitting, clientData } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <BusinessForm clientData={clientData} submitting={submitting}/>
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
        let { address, industry, description, we_are } = data;

        this.props.dispatch(change('ClientBusinessForm', 'city',  address["city"]));
        this.props.dispatch(change('ClientBusinessForm', 'country',  address["country"]));
        this.props.dispatch(change('ClientBusinessForm', 'industry', industry));
        this.props.dispatch(change('ClientBusinessForm', 'description',   description));
        this.props.dispatch(change('ClientBusinessForm', 'we_are',  {value: we_are, label: we_are}));
    }
}

ClientBusinessForm = reduxForm({
    form: 'ClientBusinessForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ClientBusinessForm);


export default connect()(ClientBusinessForm);