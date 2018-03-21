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
<<<<<<< e32ce54129c6540684de7c2698a8b31020a21e1e
import { projects, days, team } from '../../../helpers/sidebarDbEmulate';
=======
import ProjectsBoard from '../../ProjectsBoard';
>>>>>>> [feature] kanban project page

class SpecialistsDashboard extends Component {

    render() {
        const {match:{params}} = this.props;
        console.log(this.props);
        let page = params['page'];
        let sidebarCondition = page === 'about' || page === 'board' || page === 'test'
          || page === 'statement'
          || page === 'year_to_date'
          || page === 'account'
          || page === 'teams';

        return (
            <div>
                <HeaderBasic page={sidebarCondition} />
                <S_MainContainer>
                    {sidebarCondition && <SideBarLeft projects={projects}/>}
                        {this.renderPage(page)}
                    {sidebarCondition && <SideBarRight projects={projects} days={days}/>}
                </S_MainContainer>
            </div>
        );
    }

    renderPage = (page) => {
        switch (page) {
            case 'profile':
                return <SpecialistsProfile/>;
            case 'teams':
                return <SpecialistsMyTeams team={team}/>;
            case 'industry':
                return <SpecialistIndustry/>;
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
            default:
                return <SpecialistsAbout/>
        }
    };
}

export default SpecialistsDashboard;
