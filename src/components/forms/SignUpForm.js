import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { phoneCodes } from '../../helpers/phoneCodes'
import { required, minLength2, email } from '../../helpers/validate';
import { RenderField } from './renders/RenderField';
import RenderRadio from './renders/RenderRadio';
import RenderSelect from './renders/RenderSelect';
import RenderCheckbox from './renders/RenderCheckbox';
import DvButtonForm from '../../styleComponents/DvButtonForm'
import InputField from './renders/InputField';
import ModalTerms from '../modals/ModalTerms';
import PrivacyPolicy from '../modals/PrivacyPolicy';
import EmailField from './renders/EmailField';
import { Select } from 'semantic-ui-react'
import { Form, Radio } from 'semantic-ui-react'

class SignUpForm extends Component  {

    render() {
        const { handleSubmit, submitting, person, changeUserType, hasPerson } = this.props;
        return (
            <form onSubmit={handleSubmit}>

                {person === 'Specialist' && this.props.children}

                <EmailField
                    name="email"
                    placeholder="Email"
                    disabled={hasPerson === 'Agency'}
                />
                <InputField
                    name="first_name"
                    placeholder="First Name"
                    disabled={hasPerson === 'Agency'}
                />
                <InputField
                    name="last_name"
                    placeholder="Last Name"
                    disabled={hasPerson === 'Agency'}
                />

                {person === 'Client' && this.props.children}

                <Field
                    name="info"
                    component={RenderSelect}
                    placeholder="How did you hear about Digital Village"
                    options={[{ label: 'Internet Article', value: 'Internet Article' },
                        { label: 'Internet Search', value: 'Internet Search' },
                        { label: 'Poster', value: 'Poster' },
                        { label: 'Newspaper/Magazine', value: 'Newspaper/Magazine' },
                        { label: 'Friends/Colleges', value: 'Friends/Colleges' },
                        { label: 'Other', value: 'Other' }]}
                    disabled={hasPerson === 'Agency'}
                    validate={[required]}
                />
                <div style={{display: 'flex'}}>
                    <span>Phone/</span>
                    <Field
                        name="phone-select"
                        component={RenderSelect}
                        placeholder="+61"
                        options={phoneCodes}
                        disabled={hasPerson === 'Agency'}
                        validate={[required]}
                    />

                    <Field
                        name="phone-input"
                        component={RenderField}
                        type="number"
                        placeholder=""
                        disabled={hasPerson === 'Agency'}
                        validate={[required]}
                    />
                </div>
                <div style={{display: 'flex'}}>
                    <Field
                        name="confirm"
                        component={RenderCheckbox}
                        disabled={hasPerson === 'Agency'}
                        validate={[required, minLength2]}
                    />
                    <span>I have read and I agree to the <ModalTerms/> and <PrivacyPolicy/></span>

                </div>
                {hasPerson === 'Agency'
                    ? <DvButtonForm
                        type="submit"
                        disabled={true}
                        content='Continue'
                        primary
                    />
                    : <DvButtonForm
                        type="submit"
                        disabled={submitting}
                        content='Continue'
                        primary
                    />
                }
            </form>
        )
    }
}


export default SignUpForm;
