import React, {Component} from 'react';
import { Field } from 'redux-form';
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
        const { handleSubmit, submitting, person, changeUserType, hasPerson } = this.props;
        return (
            <form onSubmit={handleSubmit}>

                {/*{person === 'Specialist' && this.props.children}*/}

                <EmailField
                    name="email"
                    placeholder="Your email /"
                    // disabled={hasPerson === 'Agency'}
                />
                <InputField
                    name="first_name"
                    placeholder="First Name /"
                    // disabled={hasPerson === 'Agency'}
                />
                <InputField
                    name="last_name"
                    placeholder="Last Name /"
                    // disabled={hasPerson === 'Agency'}
                />

                {person === 'Client' && this.props.children}

                <Field
                    name="hear_from"
                    component={RenderSelect}
                    placeholder="How did you hear about Digital Village /"
                    options={[{ label: 'Internet Article', value: 'Internet Article' },
                        { label: 'Internet Search', value: 'Internet Search' },
                        { label: 'Poster', value: 'Poster' },
                        { label: 'Newspaper/Magazine', value: 'Newspaper/Magazine' },
                        { label: 'Friends/Colleges', value: 'Friends/Colleges' },
                        { label: 'Other', value: 'Other' }]}
                    // disabled={hasPerson === 'Agency'}
                    validate={[required]}
                />

                <StyledPhoneField>
                    <span>Phone /</span>
                    <RenderPhone hasPerson={hasPerson}/>
                </StyledPhoneField>

                <StyledRequireBox>
                    <Field
                        name="terms"
                        component={RenderCheckbox}
                        // disabled={hasPerson === 'Agency'}
                        validate={[required, minLength2]}
                    />
                    <span>I have read and I agree to the <br/> <ModalTerms/> and <PrivacyPolicy/></span>
                </StyledRequireBox>

                {/*{hasPerson === 'Agency'*/}
                    {/*? <DvButtonForm*/}
                        {/*type="submit"*/}
                        {/*disabled={true}*/}
                        {/*content='Continue'*/}
                        {/*primary*/}
                    {/*/>*/}
                    {/*: <DvButtonForm*/}
                        {/*type="submit"*/}
                        {/*disabled={submitting}*/}
                        {/*content='Continue'*/}
                        {/*primary*/}
                    {/*/>*/}
                {/*}*/}
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


export default SignUpForm;
