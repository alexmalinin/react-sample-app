import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import HeaderIntro from './layout/HeaderIntro';
import DvGrid from '../styleComponents/layout/DvGrid';
import {DvTitleSmall, DvTitleBig} from '../styleComponents/layout/DvTitles';
import {DropdownAvailability} from '../styleComponents/StyledDropdown';
import { Container } from '../styleComponents/layout/Container';
import { DvButton } from '../styleComponents/layout/DvButton';
import AnimateHeight from 'react-animate-height';
import SlideTogle from './SlideTogle';
import Services from './Services';
import confirm from '../decorators/confirm';

class PostProject extends Component {

    // state = {
    //     activeTab: 'Specialist',
    // };

    render() {
        const { confirm, confirmAccount } = this.props;
        window.state = this.state;

        return (
            <div>
                <HeaderIntro/>
                <Container indentBot indentTop>
                    <DvTitleBig mTop="137" fz="">
                        post
                        <br/>
                        project /
                    </DvTitleBig>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                    <DvTitleSmall>
                                        What services do
                                        <br/>
                                        you need?
                                    </DvTitleSmall>
                                        <Services/>
                                    <DvTitleSmall>
                                        Project Details
                                    </DvTitleSmall>
                                <DvButton onClick={confirmAccount} primary content='Continue'/>
                                {confirm && <Redirect to="/project_overview"/> }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    handleHeight = ev => {
        console.log('click');
    }
}

export default confirm(PostProject);