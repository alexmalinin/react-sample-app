import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react'
import {SFooter} from '../../styleComponents/layout/StyledFooter'
import Logotype from './Logotype'
import NavigationLinks from '../NavigationLinks'
import { ContainerLarge } from '../../styleComponents/layout/Container';

class FooterBasic extends Component {
    render() {
        return (
            <SFooter>
                <ContainerLarge>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                <Logotype/>
                                <p>
                                    DV is a platform that brings specialist digital contractors together <br/>
                                    to create temporary or long-term teams, businesses & groups.
                                </p>
                                <span>
                                    ©Copyright 2017 by Digital Village Pty Ltd. All rights reserved.
                                </span>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                <NavigationLinks footer/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </ContainerLarge>
            </SFooter>
        )
    }
}

export default FooterBasic;
