import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { required } from '../../../helpers/validate';
import {renderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {clientCategories} from '../../../helpers/selects/clientCategories';
import { DvButton } from '../../../styleComponents/layout/DvButton'
import InputField from '../../forms/renders/InputField'
import LocationField from '../../forms/renders/LocationField'
import RenderTextArea from '../../forms/renders/RenderTextArea';

class BusinessForm extends Component {

    render() {
        const {submitting} = this.props;

        return (
            <React.Fragment>
                <div className='wrapper'>
                    <Field
                        name="we_are"
                        component={RenderSelect}
                        options={clientCategories}
                        placeholder="We are a... /"
                        validate={[required]}
                    />
                    <LocationField/>
                    <InputField
                        name="industry"
                        placeholder="Industry /"
                        validate={[required]}
                    />
                </div>
                <span>Tell us about your business /</span>
                <Field name="description" component={RenderTextArea}/>
                <DvButton
                    type="submit"
                    disabled={submitting}
                    content='SAVE & CONTINUE'
                    primary
                />
            </React.Fragment>
        )
    }
}

export default BusinessForm;
