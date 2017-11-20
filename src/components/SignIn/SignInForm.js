import React, { Component } from 'react';
import { reduxForm, Field, change } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, minLength8 } from '../../helpers/validate';
import { RenderField } from '../forms/renders/RenderField';
import DvButtonForm from '../../styleComponents/layout/DvButtonForm'
import StyledFormHint from '../../styleComponents/forms/StyledFormHint';
import EmailField from '../forms/renders/EmailField';
import { Message } from 'semantic-ui-react';
import { S_DeleteCard } from "../../styleComponents/layout/S_DeleteCard";


class SignInForm extends Component {

    state = {
        visibleError: false,
    };

    componentWillMount() {
        let { email } = this.props;
        if (email) {
            this.props.dispatch(change('SignInForm', 'email', email ))
        }
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        const { visibleError } = this.state;

        return (
            <form onSubmit={handleSubmit}>
                { visibleError && <Message
                    floating
                    negative
                    style={{marginBottom: '25px'}}
                >
                    Incorrect email or password.
                    {/*<S_DeleteCard color='red' className="remove icon" onClick={this.renderError(false)}/>*/}
                </Message> }
                <EmailField
                    name="email"
                    placeholder="Email /"
                />
                <Field
                    component={ RenderField }
                    name="password"
                    placeholder="Password /"
                    type="password"
                    validate={[required, minLength8]}
                />
                <StyledFormHint>
                    <Link to="/forgot_password">I've forgotten password</Link>
                </StyledFormHint>

                <DvButtonForm
                    type="submit"
                    disabled={submitting}
                    content='Login'
                    primary
                />
            </form>
        )
    };

    renderError = visible => () => {
        this.setState({visibleError: visible})
    };


    componentWillReceiveProps(nextState) {
        console.log(nextState);
        if (nextState.failSignIn) {
            this.renderError(true)()
        }
    }
}

export default reduxForm({
    form: 'SignInForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignInForm)