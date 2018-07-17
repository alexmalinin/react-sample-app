import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";
import { Grid } from "semantic-ui-react";
import HeaderBasic from "../layout/HeaderBasic";
import { DvTitle } from "../../styleComponents/layout/DvTitles";
import ClientWelcomeForm from "./forms/ClientWelcomeForm";
import { welcomeClient } from "../../actions/actions";
import { Container } from "../../styleComponents/layout/Container";
import StyledWelcome from "../../styleComponents/StyledWelcome";

class ClientWelcome extends Component {
  componentWillMount() {
    sessionStorage.setItem("client_step", true);
  }

  render() {
    const { signUpData } = this.props;
    let confirm = signUpData ? signUpData.welcomeClient : false;
    return (
      <StyledWelcome>
        <HeaderBasic />
        <Container indentBot>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <DvTitle mTop="80">
                  Welcome to The <br /> Digital Village!
                </DvTitle>
                <p>
                  Please complete your profile so we can better support <br />
                  and supply you with the most relevant requests.
                </p>
                <ClientWelcomeForm onSubmit={this.submit} />
                {confirm && <Redirect to="/profile/info" />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </StyledWelcome>
    );
  }

  submit = values => {
    this.props.welcomeClient(values);
  };
}

export default connect(({ signUpData }) => ({ signUpData }), { welcomeClient })(
  ClientWelcome
);
