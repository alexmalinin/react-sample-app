import React, {Component, Fragment} from 'react';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import { S_MainContainer } from '../../styleComponents/layout/S_MainContainer';
import { Container } from '../../styleComponents/layout/Container';
import ClientProfile from './ClientProfile';
import ClientCompany from './ClientCompany';
import ClientBilling from './ClientBilling';
import ProjectsBoard from '../ProjectsBoard';
import SideBarLeft from './renders/SideBarLeft';
import SideBarRight from './renders/SideBarRight';
import { projects, days } from '../../helpers/sidebarDbEmulate';
import ClientProjects from './ClientProjects';
import ClientModule from './ClientModule';
import Dashboard from '../Dashboard';
import TheVillage from '../TheVillage'

class ClientDashboard extends Component {

    render() {

        console.log(this.props, '123132');

        const {match:{params}} = this.props;
        let page = params['page'];
        let sidebarCondition = page === 'projects' || page === 'board' || page === 'module' || page === 'root' || page === 'the_village';

        return (
            <div>
                <HeaderBasic props={this.props} page={sidebarCondition} userType='client'/>
                <S_MainContainer>
                    {sidebarCondition && <SideBarLeft projects={projects}/>}
                        {this.renderPage(page)}
                    {sidebarCondition && <SideBarRight projects={projects} days={days}/>}
                </S_MainContainer>
            </div>
        )
    }

    renderPage = (page) => {
        switch (page) {
            case 'profile':
              return <ClientProfile/>;
            case 'company':
              return <ClientCompany/>;
            case 'billing':
              return <ClientBilling/>;
            case 'projects':
              return <ClientProjects/>;
            case 'module':
              return <ClientModule/>;
            case 'board':
              return <ProjectsBoard/>;
            case 'the_village':
              return <TheVillage/>;
            case 'root':
              return <Dashboard/>;
            default:
              return <ClientProfile/>
        }
    };
}

export default ClientDashboard;
