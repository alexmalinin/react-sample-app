import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
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

const PERCENTS_NAME = 'propfilePercent'

class SpecialistsProfile extends Component {

    constructor() {
        super();

        this.state = {
            renderMessage: false,
            renderErrorMessage: false,
            nextStep: false,
            allFields: 7,
            filedFields: 0,
        };

        this.data = {};

        this.handleFormField = this.handleFormField.bind(this);
    }

    handleFormField(e) {
        console.log('iv alive')
        let data = e.target.value;
        this.data[e.target.name] = data;
        this.calculatePercent(this.data);
    }

    handleInit() {

        if (this.props.specialistData) {
            if(this.props.specialistData.first_name){
                const {first_name, last_name, email, phone_number, address: {city, country}, professional_experience_info,} = this.props.specialistData;
                this.data = {
                    first_name,
                    last_name,
                    email,
                    city,
                    country,
                    phone_number,
                    professional_experience_info,
                }
                this.calculatePercent(this.data);
            }   
        }     
        
    }

    calculatePercent(data) {
        let arr = [];
        for (let key in data) {
            if (data[key]) {
                arr.push(data[key]) 
            }   
        }
        let countFields = arr.length;
        this.setState({
            filedFields: countFields,
        })
        let percents = Math.round((countFields / this.state.allFields) * 100);
        this.setState({
            percents
        });
    }

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

        this.props.setPercentIntoSubheader(PERCENTS_NAME, this.state.percents);

        return (
            // <Container indentBot className="relative">
            //     <SubHeader percents={this.state.percents}/>
            <div>
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
                            <RenderProfileForm 
                                handleFormField={this.handleFormField}
                                onSubmit={this.submit} 
                                educations={educations} 
                                experiences={experiences} 
                                specialistModal/>
                            {this.state.nextStep && <Redirect to="industry"/>}
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={12} computer={16}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column computer={3}>
                                    </Grid.Column>
                                    <Grid.Column computer={13}>
                                        <DvTitleSmall fz='18' mTop='60' xsCenter>Change Password</DvTitleSmall>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column computer={16}>
                                        <RenderResetPasswordForm user="specialist"/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        let client = nextProps.specialistData;
        let password = nextProps.confirmPassword;

        if (client) {
            this.handleInit()
        }

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
            }, 1500
        );

        status === 'success'
            ? this.setState({
                renderMessage: true,
                nextStep: true,
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

export default connect(
    ({specialistData, confirmPassword,  educations, experiences}) => ({specialistData, confirmPassword,  educations, experiences}),
    { showSpecialistData, updateSpecialistProfile }
)(SpecialistsProfile);
