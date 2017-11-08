import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Field, reduxForm, change} from 'redux-form';
import {required} from '../../helpers/validate';
import { DvButton } from '../../styleComponents/layout/DvButton'
import InputField from './renders/InputField';
import {RenderField} from './renders/RenderField';
import EmailField from './renders/EmailField';
import StyledPhoneField from '../../styleComponents/forms/StyledPhoneField';
import RenderPhone from './renders/RenderPhone';

class RenderProfileForm  extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.clientData) {
            let { first_name, last_name, email, phone_code, address, phone_number } = nextProps.clientData;
            this.props.dispatch(change('RenderProfileForm', 'first_name',   first_name));
            this.props.dispatch(change('RenderProfileForm', "last_name" ,   last_name));
            this.props.dispatch(change('RenderProfileForm', 'email',        email));
            this.props.dispatch(change('RenderProfileForm', 'phone_code',   phone_code));
            this.props.dispatch(change('RenderProfileForm', 'phone_number', +phone_number));
            this.props.dispatch(change('RenderProfileForm', 'country',      address.country));
        }
    }

    render() {

        const { handleSubmit, submitting, clientData } = this.props;
        let renderPlace = clientData ? clientData.phone_code : null;

        return (
            <form onSubmit={handleSubmit}>
                <InputField
                    name="first_name"
                    placeholder="First Name /"
                />

                <InputField
                    name="last_name"
                    placeholder="Last Name /"
                />

                <InputField
                    name="country"
                    placeholder="Country /"
                />

                <StyledPhoneField>
                    <span>Phone /</span>
                    <RenderPhone value={renderPlace}/>
                </StyledPhoneField>

                <EmailField
                    name="email"
                    placeholder="Email /"
                />

                <Field
                    component={RenderField}
                    name="password"
                    placeholder="Password /"
                    type="password"
                    validate={[required]}
                />

                <DvButton type="submit"
                          disabled={submitting}
                          content='SAVE & UPDATE'
                          primary
                />
            </form>
        )
    }
};

RenderProfileForm = reduxForm({
    form: 'RenderProfileForm'
})(RenderProfileForm);

export default connect( ({clientData}) => ({clientData}))(RenderProfileForm);

// export default connect( state => ({
//     initialValues: {
//         first_name: 'some value here'
//     }
// }))(RenderProfileForm)