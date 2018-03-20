import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Tab } from 'semantic-ui-react';

import { Container } from '../../../styleComponents/layout/Container';
import SpecialistAccountSubHeader from '../../layout/SpecialistAccountSubHeader';
import StyledAccountPages from '../../../styleComponents/StyledAccountPages';

class SpecialistYTD extends Component {
    render() {
        return (
            <StyledAccountPages className="sasas" >
                <SpecialistAccountSubHeader />
                <Container className="sample" >
                    <Grid>
                        <SectionHeader content='year to date'/>

                        <Grid.Row className="sectionTitle">
                            <Grid.Column computer={14}>
                                earnings/paid
                            </Grid.Column>
                            <Grid.Column computer={2}>
                                total pade
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className="sectionContent">
                            <Grid.Column computer={14}>
                                projectXYZ
                            </Grid.Column>
                            <Grid.Column computer={2}>
                                $200
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className="sectionContent">
                            <Grid.Column computer={14}>
                                projectABC
                            </Grid.Column>
                            <Grid.Column computer={2}>
                                $800
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className="sectionSummury">
                            <Grid.Column computer={14} textAlign='right'>
                                Total
                            </Grid.Column>
                            <Grid.Column computer={2}>
                                $1000
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </StyledAccountPages>
        )
    }
}

function SectionHeader({ content }) {
    return (
        <Grid.Row className='section-header' >
            <Grid.Column computer={6} textAlign='left' floated='left'>
                <span className='title'>{content}</span>
            </Grid.Column>
            <Grid.Column computer={2} textAlign='right' floated='right'>
            </Grid.Column>
        </Grid.Row>
    );
}

export default SpecialistYTD;