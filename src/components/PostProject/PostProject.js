import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import HeaderIntro from '../layout/HeaderIntro';
import { DvTitleBig } from '../../styleComponents/layout/DvTitles';
import { Container } from '../../styleComponents/layout/Container';
import confirm from '../../decorators/confirm';
import PostProjectForm from './forms/PostProjectForm';

class PostProject extends Component {

    render() {
        const { confirm, confirmAccount } = this.props;

        return (
            <div>
                <HeaderIntro/>
                <Container indentBot indentTop>
                    <DvTitleBig mTop='137' fz='' sm>
                        post
                        <br/>
                        project /
                    </DvTitleBig>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                    <PostProjectForm onSubmit={this.submit}/>
                                    {/*<DvButton onClick={confirmAccount} primary content='Continue'/>*/}
                                    {/*{confirm && <Redirect to="/project_overview"/> }*/}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    submit = values => {
        console.log('----values:',values);
    };
}

export default confirm(PostProject);
