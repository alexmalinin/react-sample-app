import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import {DvTitle} from '../../styleComponents/layout/DvTitles';
import RenderProfileForm from '../forms/RenderProfileForm';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container'
import { DvTitleSmall } from '../../styleComponents/layout/DvTitles'

class SpecialistsProfile extends Component {

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

                <Container indentTop indentBot>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} computer={8}>
                                <DvTitleSmall>Basic details</DvTitleSmall>
                                <RenderProfileForm onSubmit={this.submit}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    submit = values => {
        console.log('----values:', values);
    };
}

export default SpecialistsProfile;
