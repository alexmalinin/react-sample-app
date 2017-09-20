import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react'

import HeaderIntro from './HeaderIntro';
import DvGrid from '../styleComponents/DvGrid'
import DvTitle from '../styleComponents/DvTitle'
import DvForm from '../styleComponents/DvForm'
import DvButton from '../styleComponents/DvButton'
import confirm from '../decorators/confirm'

class SignUp extends Component {

    render() {
        const { confirm, confirmAccount } = this.props;

        return (
            <div>
                <HeaderIntro/>
                <DvGrid width="1560">
                    <DvTitle mTop="126">
                        Account Verification
                    </DvTitle>
                    <DvForm>
                        <div style={{height: '100px', marginTop: '50px'}}>some inputs with validations</div>
                    </DvForm>
                    <DvButton onClick={confirmAccount} primary content='SAVE & CONTINUE'/>
                    { confirm && <Redirect from="/verification" to="/action_creation_1"/> }
                </DvGrid>
            </div>
        )
    }

}

export default confirm(SignUp);