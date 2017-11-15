import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Tab } from 'semantic-ui-react'
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import { DvTitle } from '../../styleComponents/layout/DvTitles';
import RenderProfileForm from '../forms/RenderProfileForm';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import { showSpecialistData, updateSpecialistProfile } from '../../actions/actions';

class SpecialistsProfile extends Component {

    componentWillMount() {
        sessionStorage.removeItem('spec_step2');
        localStorage.removeItem('user_email');
        this.props.showSpecialistData();
    }

    render() {

        return (
            <div>
                <HeaderBasic/>

                <ContainerLarge>
                    <DvTitle mTop='80'>
                        Welcome to The Village!
                    </DvTitle>
                </ContainerLarge>

                <SubHeader/>

                <Container indentTop indentBot>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} computer={8}>
                                <DvTitleSmall>Basic details</DvTitleSmall>
                                <RenderProfileForm onSubmit={this.submit}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    submit = values => {
        this.props.updateSpecialistProfile(values);
    };
}

export default connect(null, { showSpecialistData, updateSpecialistProfile } )(SpecialistsProfile);
