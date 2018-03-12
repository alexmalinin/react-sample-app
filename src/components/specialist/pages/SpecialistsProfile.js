import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Tab } from 'semantic-ui-react';
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import { DvTitle } from '../../../styleComponents/layout/DvTitles';
import RenderProfileForm from '../../forms/RenderProfileForm';
import RenderResetPasswordForm from '../../forms/RenderResetPasswordForm';
import { Container, ContainerLarge } from '../../../styleComponents/layout/Container';
import { DvTitleSmall } from '../../../styleComponents/layout/DvTitles';
import { showSpecialistData, updateSpecialistProfile } from '../../../actions/actions';
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import { S_Message } from '../../../styleComponents/layout/S_Message';
import { Message } from 'semantic-ui-react';
import { run } from '../../../helpers/scrollToElement';
import AsideLeft from "../renders/AsideLeft";
import AsideRight from "../renders/AsideRight";

class SpecialistsProfile extends Component {

    state = {
        renderMessage: false,
        renderErrorMessage: false,
    };

    componentWillMount() {
        run(0)(true);
        sessionStorage.removeItem('spec_step2');
        localStorage.removeItem('user_email');
        localStorage.removeItem('fillForm1');
        this.props.showSpecialistData();
    }

    render() {
        const { renderMessage, renderErrorMessage } = this.state;
        const { educations, experiences } = this.props;

        return (
            <Container indentTop indentBot className="relative">
                <SubHeader />
                {/*<ContainerLarge>*/}
                {/* <DvTitle mTop='80'>
                    Welcome to The Village!
                </DvTitle> */}
                {/*</ContainerLarge>*/}
                <S_Message positive data-show={renderMessage}>
                    <Message.Header>Success!</Message.Header>
                    <p>Form updated</p>
                </S_Message>
                <S_Message negative data-show={renderErrorMessage}>
                    <Message.Header>Error!</Message.Header>
                    <p>Something went wrong, please try again</p>
                </S_Message>
                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={12} computer={16}>
                            {/* <DvTitleSmall fz='28' xsCenter>Profile</DvTitleSmall> */}
                            <RenderProfileForm onSubmit={this.submit} educations={educations} experiences={experiences}/>
                          {/*educations={educations} experiences={experiences} specialistData={specialistData} */}
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={12} computer={8}>
                            <DvTitleSmall fz='28' mTop='60' xsCenter>Change Password</DvTitleSmall>
                            <RenderResetPasswordForm user="specialist"/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }

    componentWillReceiveProps(nextProps) {
        let client = nextProps.specialistData;
        let password = nextProps.confirmPassword;

        if (client.successProfileId) {
            this.showMessage('success');
            run(0)();
        } else if(client.errorProfileId) {
            this.showMessage();
            run(0)();
        } else if(password) {
            if (password.successPasswordId) {
                this.showMessage('success');
                run(0)();
            } else if (password.errorPasswordId) {
                this.showMessage();
                run(0)();
            }
        }
    }

    showMessage = status => {
        setTimeout( () => {
                return this.setState({
                    renderMessage: false,
                    renderErrorMessage: false,
                })
            }, 2000
        );

        status === 'success'
            ? this.setState({
                renderMessage: true,
            })
            : this.setState({
                renderErrorMessage: true,
            })
    };

    submit = values => {
        const { updateSpecialistProfile, educations, experiences } = this.props;
        console.log(values);
        updateSpecialistProfile(values, educations, experiences);
    };
}

export default connect(({specialistData, confirmPassword,  educations, experiences}) => ({specialistData, confirmPassword,  educations, experiences}),
  { showSpecialistData, updateSpecialistProfile } )(SpecialistsProfile);
