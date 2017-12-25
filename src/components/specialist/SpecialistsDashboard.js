import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Grid, Tab } from 'semantic-ui-react';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import { DvTitle } from '../../styleComponents/layout/DvTitles';
import RenderProfileForm from '../forms/RenderProfileForm';
import RenderResetPasswordForm from '../forms/RenderResetPasswordForm';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import { showSpecialistData, updateSpecialistProfile } from '../../actions/actions';
import { S_MainContainer } from '../../styleComponents/layout/S_MainContainer';
import { S_Message } from '../../styleComponents/layout/S_Message';
import { Message } from 'semantic-ui-react';
import { run } from '../../helpers/scrollToElement';
import AsideLeft from "./renders/AsideLeft";
import AsideRight from "./renders/AsideRight";
import SpecialistsProfile from "./SpecialistsProfile";
import SpecialistsAvailability from "./SpecialistsAvailability";

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
                        {page === 'profile' ? <SpecialistsProfile/> : <SpecialistsAvailability/>}
                    <AsideRight/>
                </S_MainContainer>
            </div>
        )
    }


}

export default SpecialistsDashboard;
