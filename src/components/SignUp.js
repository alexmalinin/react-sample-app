import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Grid, Button, Tab } from 'semantic-ui-react';

import HeaderIntro from './HeaderIntro';
import DvGrid from '../styleComponents/DvGrid';
import DvTitleBig from '../styleComponents/DvTitleBig';
import Tabs from '../styleComponents/Tabs';
import confirm from '../decorators/confirm';
import { userType } from '../actions/actions';

class SignUp extends Component {

    state = {
        activeTab: 'Specialist',
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
                <DvGrid left="320px" right="265px" grid={"no-pad"}>
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
                                <Tabs className="specialist-form dv-from" mTop="181" action="">
                                    <Tab menu={{ text: true }} panes={panes} onClick={this.activeTab} />
                                    <Button className="form-footer"
                                        content='Continue'
                                        primary
                                        onClick={confirmAccount}
                                    />
                                    { confirm && <Redirect to="/verification"/> }
                                </Tabs>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DvGrid>
            </div>
        )
    }

    activeTab = ev => {
        let item = ev.target;
        item.classList.contains('item') ? this.props.userType(item.text) : null;
    }

}

export default connect(null, {userType})(confirm(SignUp));