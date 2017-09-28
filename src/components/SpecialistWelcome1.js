import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';

import HeaderBasic from './HeaderBasic';
import DvGrid from '../styleComponents/DvGrid';
import DvTitle from '../styleComponents/DvTitle'
import DvForm from '../styleComponents/Tabs';
import DvButton from '../styleComponents/DvButton';
import confirm from '../decorators/confirm';
import SpecialistWelcomeForm1 from './forms/SpecialistWelcomeForm1';

class SpecialistsWelcome1 extends Component {

    render() {
        const { confirm, confirmAccount } = this.props;

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
        this.props.confirmAccount()
        // this.setState({
        //     confirm: !this.state.confirm,
        // })
        console.log('values:', values);
    };
}

export default confirm(SpecialistsWelcome1);