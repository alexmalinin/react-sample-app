import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Button, Tab } from 'semantic-ui-react';

import HeaderIntro from './HeaderIntro';
import DvGrid from '../styleComponents/DvGrid';
import DvTitleBig from '../styleComponents/DvTitleBig';
import DvForm from '../styleComponents/DvForm';
import confirm from '../decorators/confirm'

class SignUp extends Component {

    state = {
        activeTab: '',
    };

    render() {
        const { confirm, confirmAccount } = this.props;
        const panes = [
            { menuItem: 'Specialist', render: () =>
                <Tab.Pane attached={false}>
                        some inputs with validations for specialist
                </Tab.Pane>
            },
            { menuItem: 'Client', render: () =>
                <Tab.Pane attached={false}>
                    some inputs with validations for client
                </Tab.Pane>
            },
        ];

        window.state = this.state;

        return (
            <div>
                <HeaderIntro/>
                <DvGrid left="320" right="265" grid={"no-pad"}>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <DvTitleBig mTop="137" fz="">
                                    sign
                                    <br/>
                                    up/
                                </DvTitleBig>
                            </Grid.Column>
                            <Grid.Column>
                                <DvForm className="specialist-form dv-from" mTop="181" action="">
                                    <Tab menu={{ text: true }} panes={panes} onClick={this.activeTab} />
                                    <Button className="form-footer"
                                        content='Continue'
                                        primary
                                        onClick={confirmAccount}
                                    />
                                    { confirm && <Redirect from="/sign_up" to="/verification"/> }
                                </DvForm>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DvGrid>
            </div>
        )
    }

    activeTab =  ev => {
        console.log(ev.target.text);
    }

}

export default confirm(SignUp);