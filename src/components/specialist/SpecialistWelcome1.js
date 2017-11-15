import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import DvGrid from '../../styleComponents/layout/DvGrid';
import confirm from '../../decorators/confirm';
import SpecialistWelcomeForm1 from './forms/SpecialistWelcomeForm1';
import { Container }from '../../styleComponents/layout/Container';
import { getIndustries, updateSpecStep1 } from '../../actions/actions'

class SpecialistsWelcome1 extends Component {

    componentWillMount() {
        sessionStorage.setItem('spec_step1', true);
        this.props.getIndustries();
    }

    render() {
        const { indusrties, signUpData } = this.props;
        let confirm = signUpData ? signUpData.welcomeSpecStep1 : null;

        return (
            <div>
                <HeaderBasic/>
                <Container indentBot>
                    <SpecialistWelcomeForm1 indusrties={indusrties} welcomeText={true} onSubmit={this.submit}/>
                    {confirm && <Redirect to="/specialists/dashboard/welcome-to-the-village-2"/> }
                </Container>
            </div>
        )
    }

    submit = values => {
        this.props.updateSpecStep1(values);
    };
}

export default connect(({indusrties, signUpData}) => ({indusrties, signUpData}), { getIndustries, updateSpecStep1 })(confirm(SpecialistsWelcome1));