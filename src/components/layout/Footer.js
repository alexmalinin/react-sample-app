import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react'
import {SFooter} from '../../styleComponents/StyledFooter'
import Logotype from './Logotype'

class FooterBasic extends Component {
    render() {

        return (
            <SFooter>
                <div className="container">
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Logotype/>
                                <p>
                                    DV is a platform that brings specialist digital contractors together <br/>
                                    to create temporary or long-term teams, businesses & groups.
                                </p>
                                <span>
                                    ©Copyright 2017 by Digital Village Pty Ltd. All rights reserved.
                                </span>
                            </Grid.Column>
                            <Grid.Column>
                                <span>13123</span>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </SFooter>
        )
    }
}

export default FooterBasic;