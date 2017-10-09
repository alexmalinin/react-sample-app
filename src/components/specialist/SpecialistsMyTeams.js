import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import { DvTitle } from '../../styleComponents/DvTitles'
import { Grid } from 'semantic-ui-react'
import { DvButton } from '../../styleComponents/DvButton'
import { Container, ContainerLarge } from '../../styleComponents/Container'

class SpecialistsMyTeams extends Component {

    render() {

        return (
            <div>
                <HeaderBasic/>
                <ContainerLarge>
                    <DvTitle mTop="80">
                        Welcome to The Village!
                    </DvTitle>
                </ContainerLarge>
                <SubHeader/>
                <Container>

                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6}>
                            </Grid.Column>

                            <Grid.Column width={12}>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <DvButton primary content='SAVE & UPDATE'/>
                </Container>
            </div>
        )
    }
}

export default SpecialistsMyTeams;
