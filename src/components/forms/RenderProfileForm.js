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
import { showClientData } from '../../actions/actions';

class RenderProfileForm  extends Component {

    componentWillMount() {
        this.props.showClientData();
        // console.log(first_name)
        // this.props.initialize({ first_name: first_name });
        // set the value individually

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clientData) {
            let { first_name, last_name, email, phone_number, address } = nextProps.clientData;
            // this.props.initialize({ first_name, last_name, email, 'phone-input' : +phone_number, "country" : address.country });
            this.props.dispatch(change('RenderProfileForm', 'first_name',   first_name));
            this.props.dispatch(change('RenderProfileForm', "last_name" ,   last_name));
            this.props.dispatch(change('RenderProfileForm', 'email',        email));
            this.props.dispatch(change('RenderProfileForm', 'phone-input',  +phone_number));
            this.props.dispatch(change('RenderProfileForm', 'country',      address.country));
        }
    }

    render() {

        const { handleSubmit, submitting } = this.props;

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
                    <RenderPhone/>
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

export default connect( ({clientData}) => ({clientData}),
    { showClientData }
)(RenderProfileForm);

// export default connect( state => ({
//     initialValues: {
//         first_name: 'some value here'
//     }
// }))(RenderProfileForm)