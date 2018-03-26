import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../../helpers/validate';
import RenderField from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {clientCategories} from '../../../helpers/selects/clientCategories';
import { DvButton } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import LocationField from '../../forms/renders/LocationField'
import RenderTextArea from '../../forms/renders/RenderTextArea';
import CompanyForm from "./CompanyForm";

class ClientWelcomeForm extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <CompanyForm submitting={submitting}/>
            </form>
        )
    }
}

export default reduxForm({
    form: 'ClientWelcomeForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ClientWelcomeForm);
