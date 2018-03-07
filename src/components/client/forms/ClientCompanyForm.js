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
import CompanyForm from "./CompanyForm";

let renderError = true;

class ClientCompanyForm extends Component {

    render() {
        const { handleSubmit, submitting, clientData } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <CompanyForm clientData={clientData} submitting={submitting}/>
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
        let { name, company_address, website, segment, country, city } = data;

        this.props.dispatch(change('ClientCompanyForm', 'name',              name));
        this.props.dispatch(change('ClientCompanyForm', 'company_address',   company_address));
        this.props.dispatch(change('ClientCompanyForm', 'website',           website));
        this.props.dispatch(change('ClientCompanyForm', 'country',           country));
        this.props.dispatch(change('ClientCompanyForm', 'city',              city));
        this.props.dispatch(change('ClientCompanyForm', 'segment',           segment));
    }
}

ClientCompanyForm = reduxForm({
    form: 'ClientCompanyForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ClientCompanyForm);


export default connect()(ClientCompanyForm);