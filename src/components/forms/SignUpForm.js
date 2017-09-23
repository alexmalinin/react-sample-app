import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, minLength2, email } from '../../helpers/validate';
import { RenderField } from './RenderField';
import RenderRadio from './RenderRadio';
import RenderSelect from './RenderSelect';
import DvButtonForm from '../../styleComponents/DvButtonForm'
import InputField from './InputField';
import EmailField from './EmailField';
import { Select } from 'semantic-ui-react'
import { Form, Radio } from 'semantic-ui-react'

class SignUpForm extends Component  {

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    <Field name="person" component={RenderRadio} type="radio" label="Individual" value="Individual"/>
                </label>
                <label>
                    <Field name="person" component={RenderRadio} type="radio" label="Agency" value="Agency"/>
                </label>
                <EmailField
                    name="email"
                    placeholder="Email"
                />
                <InputField
                    name="first_name"
                    placeholder="First Name"
                />
                <InputField
                    name="last_name"
                    placeholder="Last Name"
                />
                <Field
                    name="info"
                    component={RenderSelect}
                    placeholder="How did you hear about Digital Village"
                    options={[{ label: 'Internet Article', value: 'Internet Article' },
                        { label: 'Internet Search', value: 'Internet Search' },
                        { label: 'Friends/Colleges', value: 'Friends/Colleges' },
                        { label: 'Poster', value: 'Poster' },
                        { label: 'Newspaper/Magazine', value: 'Newspaper/Magazine' },
                        { label: 'Friends/Colleges', value: 'Friends/Colleges' },
                        { label: 'Other', value: 'Other' }]}/>
                <DvButtonForm
                    type="submit"
                    disabled={submitting}
                    content='Continue'
                    primary
                />
            </form>
        )
    }
}


export default reduxForm({
    form: 'SignUpForm' // a unique identifier for this form
})(SignUpForm);
