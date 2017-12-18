import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../../helpers/validate';
import {renderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {clientCategories} from '../../../helpers/selects/clientCategories';
import { DvButton } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import LocationField from '../../forms/renders/LocationField'
import RenderTextArea from '../../forms/renders/RenderTextArea';
import BusinessForm from "./BusinessForm";

class ClientBusinessForm extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <BusinessForm submitting={submitting}/>
            </form>
        )
    }
}

export default reduxForm({
    form: 'ClientBusinessForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ClientBusinessForm);
