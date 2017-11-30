import React, {Component} from 'react';
import { Field, stopSubmit } from 'redux-form';
import { required, minLength2 } from '../../helpers/validate';
import RenderSelect from '../forms/renders/RenderSelect';
import RenderPhone from '../forms/renders/RenderPhone';
import RenderCheckbox from '../forms/renders/RenderCheckbox';
import DvButtonForm from '../../styleComponents/layout/DvButtonForm'
import StyledPhoneField from '../../styleComponents/forms/StyledPhoneField'
import StyledRequireBox from '../../styleComponents/forms/StyledRequireBox'
import InputField from '../forms/renders/InputField';
import ModalTerms from '../modals/ModalTerms';
import PrivacyPolicy from '../modals/PrivacyPolicy';
import EmailField from '../forms/renders/EmailField';

class SignUpForm extends Component  {

    render() {
        const { handleSubmit, submitting, person, hasPerson } = this.props;

        return (
            <form onSubmit={handleSubmit}>

                <EmailField
                    name='email'
                    placeholder='Your email /'
                />
                <InputField
                    name='first_name'
                    placeholder='First Name /'
                    validate={[required]}
                />
                <InputField
                    name='last_name'
                    placeholder='Last Name /'
                    validate={[required]}
                />

                {person === 'Client' && this.props.children}

                <Field
                    name='hear_from'
                    component={RenderSelect}
                    placeholder='How did you hear about Digital Village /'
                    options={[{ label: 'Facebook', value: 'Facebook' },
                        { label: 'Digital Village Nomads', value: 'Digital Village Nomads' },
                        { label: 'LinkedIn', value: 'LinkedIn' },
                        { label: 'Friend/Colleague', value: 'Friend/Colleague' },
                        { label: 'TV/Radio', value: 'TV/Radio' },
                        { label: 'Other', value: 'Other' }]}
                    validate={[required]}
                />

                <StyledPhoneField>
                    <span>Phone /</span>
                    <RenderPhone hasPerson={hasPerson}/>
                </StyledPhoneField>

                <StyledRequireBox>
                    <Field
                        name='terms'
                        component={RenderCheckbox}
                        validate={[required, minLength2]}
                    />
                    <span>I have read and I agree to the <br/> <ModalTerms/> and <PrivacyPolicy/></span>
                </StyledRequireBox>

                <DvButtonForm
                    type='submit'
                    disabled={submitting}
                    content='Continue'
                    primary
                />
            </form>
        )
    }
}

export default SignUpForm;
