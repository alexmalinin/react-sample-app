import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import HeaderBasic from '../components/layout/HeaderBasic';
import { S_MainContainer } from '../styleComponents/layout/S_MainContainer';
import { ContainerLarge, Container } from '../styleComponents/layout/Container';
import SideBarLeft from '../components/specialist/renders/SideBarLeft';
import SideBarRight from '../components/specialist/renders/SideBarRight';
import { projects, days, team } from '../helpers/sidebarDbEmulate';
import RenderDashboard from './layout/RenderDashboard';
import StyledDashBoard from '../styleComponents/StyledDashBoard';
import DashboardSubHeader from './layout/DashboardSubHeader';

class Dashboard extends Component {

    render() {

        let data = [
            {   
                title: 'add task',
                content: ''
            },
            {   
                title: 'add module',
                content: ''
            },
            {
                title: 'add project',
                content: ''
            }
        ]

        return (
            <ContainerLarge>
                    <DashboardSubHeader dashboard data={data}/>
                    <Container dashboardContainer>
                        <RenderDashboard/>
                    </Container>
            </ContainerLarge>
        )
    }
}

export default Dashboard;
