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
import SpecialistsBoard from "./SpecialistsBoard";
import StyledClientTeam from '../../../styleComponents/StyledClientTeam';
import SpecialistsTest from "./SpecialistsTest";
import SpecialistsMyBillings from './SpecialistsMyBillings';
import SpecialistAccount from './SpecialistAccount';
import { projects, days } from '../../../helpers/sidebarDbEmulate';

class SpecialistsDashboard extends Component {

    render() {
        const {match:{params}} = this.props;
        console.log(this.props);
        let page = params['page'];
        let sidebarCondition = page === 'about' || page === 'board' || page === 'test';

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
            case 'my_teams':
                return <StyledClientTeam><SpecialistsMyTeams/></StyledClientTeam>;
            case 'industry':
                return <SpecialistIndustry/>;
            case 'company':
              return <SpecialistsCompany/>;
            case 'billings':
              return <SpecialistsMyBillings/>;
            case 'about':
                return <SpecialistsAbout/>;
            case 'board':
                return <SpecialistsBoard/>;
            case 'test':
                return <SpecialistsTest/>;
            case 'account': 
                return <SpecialistAccount/>;
            default:
                return <SpecialistsAbout/>
        }
    };
}

export default SpecialistsDashboard;
