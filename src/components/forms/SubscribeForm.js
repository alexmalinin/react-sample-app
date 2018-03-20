import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { DvButton } from '../../styleComponents/layout/DvButton';
import StyledSubscribeForm from '../../styleComponents/StyledSubscribeForm';
import EmailField from './renders/EmailField';
import { required } from '../../helpers/validate';
import RenderSelect from './renders/RenderSelect';
import { signUpUser } from '../../helpers/selects/signUpUser';

class SubscribeForm extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <StyledSubscribeForm>
                {/* <h3>
                    Keep in touch
                </h3>

                <p>
                    Join the Village lorem ipsum dolor sit <br/>
                    amet, consectetur adipisicing elit, sed do
                </p> */}

                <form onSubmit={handleSubmit}>
                    {/* <Field
                        name='industry-select'
                        component={RenderSelect}
                        placeholder='I am a.../'
                        options={signUpUser}
                        validate={[required]}
                    />
                    <EmailField
                        name='email'
                        placeholder='Email /'
                    /> */}
                    <DvButton
                        type='submit'
                        disabled={submitting}
                        content='Subscribe'
                        primary
                    />
                </form>
            </StyledSubscribeForm>
        )
    }
}

export default reduxForm({
    form: 'SubscribeForm'
})(SubscribeForm)
