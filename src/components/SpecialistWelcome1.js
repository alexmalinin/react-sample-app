import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import HeaderBasic from './HeaderBasic';
import DvGrid from '../styleComponents/DvGrid';
import confirm from '../decorators/confirm';
import SpecialistWelcomeForm1 from './forms/SpecialistWelcomeForm1';

class SpecialistsWelcome1 extends Component {

    render() {
        const { confirm } = this.props;

        return (
            <div>
                <HeaderBasic/>
                <DvGrid left="343px" right="340px" grid={"no-pad"}>
                    <SpecialistWelcomeForm1 onSubmit={this.submit}/>
                    {confirm && <Redirect to="/specialists/dashboard/welcome-to-the-village-2"/> }
                </DvGrid>
            </div>
        )
    }

    submit = values => {
        this.props.confirmAccount();
        console.log('values:', values);
    };
}

export default confirm(SpecialistsWelcome1);