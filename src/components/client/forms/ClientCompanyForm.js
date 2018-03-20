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
        const { handleSubmit, submitting, clientData, industries } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <CompanyForm industries={industries} clientData={clientData} submitting={submitting}/>
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
        let { company } = data;
        console.log(data);

        if(company) {
            for(let key in company) {
            this.props.dispatch(change('ClientCompanyForm', key, company[key]));
            }
            this.props.dispatch(change('ClientCompanyForm', 'industry', company.industry_area_id));
        }

    }
}

ClientCompanyForm = reduxForm({
    form: 'ClientCompanyForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ClientCompanyForm);

export default connect(
  state => {
    const { clientData } = state;
    return { clientData }
  })(ClientCompanyForm);
