import React, {Component, Fragment} from 'react';
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import SideBarLeft from '../renders/SideBarLeft';
import SideBarRight from '../renders/SideBarRight';
import SpecialistsProfile from "./SpecialistsProfile";
import SpecialistsMyTeams from "./SpecialistsMyTeams";
import SpecialistsCompany from "./SpecialistsCompany";
import SpecialistIndustry from "./SpecialistIndustry";
import SpecialistsAbout from "./SpecialistsAbout";
import StyledClientTeam from '../../../styleComponents/StyledClientTeam';
import SpecialistsTest from "./SpecialistsTest";
import SpecialistsMyBillings from './SpecialistsMyBillings';
import SpecialistAccount from './SpecialistAccount';
import SpecialistYTD from './SpecialistYTD';
import SpecialistStatement from './SpecialistStatement';
import TheVillage from '../../TheVillage';
import { projects, days, team } from '../../../helpers/sidebarDbEmulate';
import ProjectsBoard from '../../ProjectsBoard';
import Dashboard from '../../Dashboard';
import { Container } from '../../../styleComponents/layout/Container';

class SpecialistsDashboard extends Component {

    constructor() {
        super();
        this.state = {
            propfilePercent: null,
            industryPercent: null,
            companyPercent: null,
            billingPercent: null,
        }

        this.setPercentIntoSubheader = this.setPercentIntoSubheader.bind(this);
    }

    setPercentIntoSubheader(percents) {

        this.setState({
            propfilePercent: percents
        })
    }

    render() {

        const {match:{params}} = this.props;
        let page = params['page'];
        let sidebarCondition = 
             page === 'about' 
          || page === 'board' 
          || page === 'test'
          || page === 'statement'
          || page === 'year_to_date'
          || page === 'account'
          || page === 'teams'
          || page === 'the_village'
          || page === 'root';

        return (
            <div>
                <HeaderBasic page={sidebarCondition} userType="specialist"/>
                <S_MainContainer>
                    {sidebarCondition && <SideBarLeft projects={projects}/>}
                        {sidebarCondition 
                            ? this.renderPage(page)
                            : <Container>
                                <SubHeader percents={this.state}/>
                                {this.renderPage(page)}
                              </Container>
                        }
                    {sidebarCondition && <SideBarRight projects={projects} days={days}/>}
                </S_MainContainer>
            </div>
        );
    }

    renderPage = (page) => {
        switch (page) {
            case 'profile':
                return <SpecialistsProfile setPercentIntoSubheader={this.setPercentIntoSubheader}/>;
            case 'teams':
                return <SpecialistsMyTeams team={team}/>;
            case 'industry':
                return <SpecialistIndustry setPercentIntoSubheader={this.setPercentIntoSubheader}/>;
            case 'company':
              return <SpecialistsCompany/>;
            case 'billings':
              return <SpecialistsMyBillings/>;
            case 'about':
                return <SpecialistsAbout/>;
            case 'board':
                return <ProjectsBoard/>;
            case 'test':
                return <SpecialistsTest/>;
            case 'account': 
                return <SpecialistAccount/>;
            case 'year_to_date': 
                return <SpecialistYTD/>;
            case 'statement': 
                return <SpecialistStatement/>;
            case 'the_village':
                return <TheVillage/>;
            case 'root':
                return <Dashboard/>;
            default:
                return <SpecialistsAbout/>; 
        }
    };
}

export default SpecialistsDashboard;
