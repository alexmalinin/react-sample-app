import React, {Component, Fragment} from 'react';
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import AsideLeft from "../renders/AsideLeft";
import AsideRight from "../renders/AsideRight";
import SpecialistsProfile from "./SpecialistsProfile";
import SpecialistsMyTeams from "./SpecialistsMyTeams";
import SpecialistsAvailability from "./SpecialistsAvailability";
import SpecialistIndustry from "./SpecialistIndustry";
import SpecialistInfo from "./SpecialistInfo";
import SpecialistsAbout from "./SpecialistsAbout";
import StyledClientTeam from '../../../styleComponents/StyledClientTeam';

class SpecialistsDashboard extends Component {


    render() {
        const {match:{params}} = this.props;
        let page = params['page'];

        return (
            <div>
                <HeaderBasic/>
                <SubHeader/>
                <S_MainContainer>
                    <AsideLeft/>
                        {this.renderPage(page)}
                    <AsideRight/>
                </S_MainContainer>
            </div>
        )
    }

    renderPage = (page) => {
        switch (page) {
            case 'profile':
                return <SpecialistsProfile/>;
            case 'my_teams':
                return <StyledClientTeam><SpecialistsMyTeams/></StyledClientTeam>;
            case 'availability':
                return <SpecialistsAvailability/>;
            case 'industry':
                return <SpecialistIndustry/>;
            case 'info':
                return <SpecialistInfo/>;
            case 'about':
                return <SpecialistsAbout/>;
            default:
                return <SpecialistsProfile/>
        }
    };
}

export default SpecialistsDashboard;
