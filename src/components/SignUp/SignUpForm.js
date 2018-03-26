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
                    placeholder='Your email'
                />

                {person === 'Client' && this.props.children}

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
