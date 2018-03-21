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

class ClientDashboard extends Component {

    render() {

        console.log(this.props, '123132');

        const {match:{params}} = this.props;
        let page = params['page'];
        let sidebarCondition = page === 'projects';

        return (
            <div>
                <HeaderBasic props={this.props}/>
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
            case 'projects/ABC':
              return <ProjectsBoard/>;
            default:
              return <ClientProfile/>
        }
    };
}

export default ClientDashboard;
