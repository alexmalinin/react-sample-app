import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, GridRow, Divider } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { showAllTeams } from '../actions/actions';
import HeaderBasic from './layout/HeaderBasic';
import SubHeader from './layout/SpecialistsSubHeader';
import { DvTitle, DvTitleSmall } from '../styleComponents/layout/DvTitles'
import { DvButton } from '../styleComponents/layout/DvButton'
import { Container, ContainerLarge } from '../styleComponents/layout/Container'
import TeamSubHeader from './layout/TeamSubHeader';
import StyledTeamPage from '../styleComponents/StyledTeamPage';
import Team from './layout/Team';

class Teams extends Component {
    componentWillMount() {
        this.props.showAllTeams();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.createChannel){
            if(this.props.createChannel){
                if(this.props.createChannel !== nextProps.createChannel){
                    nextProps.showAllTeams();
                }
            } else nextProps.showAllTeams();
        }
    }

    render() {
        const { allTeams, createChannel } = this.props;
        console.log(this.props)

        return (
            <ContainerLarge>
                <StyledTeamPage>
                    <TeamSubHeader />
                    <Container>
                        {allTeams && allTeams.length !== 0 
                            ? allTeams.map((team, key) => 
                                <Team key={key} team={team}/>
                              )
                            : <div className="teamsPlaceholder">
                                <p>No teams for now</p>
                              </div>
                        }
                    </Container>
                </StyledTeamPage>
            </ContainerLarge>
        )
    }
}

export default connect(
    ({allTeams, createChannel}) => ({allTeams, createChannel}),
    {showAllTeams}
)(Teams);