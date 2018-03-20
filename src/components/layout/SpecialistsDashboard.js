import React, {Component, Fragment} from 'react';
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import AsideLeft from "../renders/AsideLeft";
import AsideRight from "../renders/AsideRight";
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
import { ContainerLarge } from '../../../styleComponents/layout/Container';

class SpecialistsDashboard extends Component {


    render() {
        const {match:{params}} = this.props;
        let page = params['page'];

        return (
            <div>
                <HeaderBasic/>
                {/* <SubHeader/> */}
                <ContainerLarge>
                    {/* <AsideLeft/> */}
                        {this.renderPage(page)}
                    {/* <AsideRight/> */}
                </ContainerLarge>
            </div>
        )
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
                return <SpecialistsProfile/>
        }
    };
}

export default SpecialistsDashboard;
