import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import DvGrid from '../../styleComponents/layout/DvGrid';
import confirm from '../../decorators/confirm';
import SpecialistWelcomeForm1 from '../forms/specialistForms/SpecialistWelcomeForm1';
import { Container }from '../../styleComponents/layout/Container';

class SpecialistsWelcome1 extends Component {

    render() {
        const { confirm } = this.props;

        return (
            <div>
                <HeaderBasic/>
                <Container indentBot>
                    <SpecialistWelcomeForm1 onSubmit={this.submit}/>
                    {confirm && <Redirect to="/specialists/dashboard/welcome-to-the-village-2"/> }
                </Container>
            </div>
        )
    }

    submit = values => {
        this.props.confirmAccount();
        console.log('values:', values);
    };
}

export default confirm(SpecialistsWelcome1);