import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import HeaderBasic from "../layout/HeaderBasic";
import SubHeader from "../layout/ClientSubHeader";
import { Grid } from "semantic-ui-react";
import { DvTitle, DvTitleSmall } from "../../styleComponents/layout/DvTitles";
import RenderProfileForm from "../forms/RenderProfileForm";
import RenderResetPasswordForm from "../forms/RenderResetPasswordForm";
import {
  Container,
  ContainerLarge
} from "../../styleComponents/layout/Container";
import { showClientData, updateClientProfile } from "../../actions/actions";
import { S_Message } from "../../styleComponents/layout/S_Message";
import { Message } from "semantic-ui-react";
import { run } from "../../helpers/scrollToElement";
import { getAllUrlParams, compareObjects } from "../../helpers/functions";

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../modals/ConfirmationModal";

class ClientProfile extends Component {
  constructor() {
    super();

    this.state = {
      renderMessage: false,
      renderErrorMessage: false,
      nextStep: false,
      isEditing: false,
      isEdited: false
    };
  }

  componentWillMount() {
    sessionStorage.removeItem("client_step");
    localStorage.removeItem("user_email");
    this.props.showClientData();

    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  render() {
    const {
      renderMessage,
      renderErrorMessage,
      isEditing,
      isEdited
    } = this.state;

    return (
      <div>
        <S_Message positive profile="true" data-show={renderMessage}>
          <Message.Header>Success!</Message.Header>
          <p>Form updated</p>
        </S_Message>
        <S_Message negative profile="true" data-show={renderErrorMessage}>
          <Message.Header>Error!</Message.Header>
          <p>Something went wrong, please try again</p>
        </S_Message>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={16}>
              <RenderProfileForm
                onChange={this.change}
                onSubmit={this.submit}
                isEditing={isEditing}
                isEdited={isEdited}
                handleFormEdit={this.handleFormEdit}
                handleFormChange={this.handleFormChange}
              />

              <NavigationPrompt
                when={this.state.isEdited && !this.state.nextStep}
              >
                {({ onConfirm, onCancel }) => (
                  <ConfirmationModal
                    isOpen={true}
                    formId="RenderProfileForm"
                    clearLocation={this.clearLocation}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                  />
                )}
              </NavigationPrompt>

              {this.state.nextStep ? (
                isEditing ? (
                  <Redirect to="about" />
                ) : (
                  <Redirect to="company" />
                )
              ) : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={16}>
              <RenderResetPasswordForm user="customer" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  handleFormEdit = value => {
    this.setState({ isEdited: value });
  };

  handleFormChange = (a, b) => {
    if (compareObjects(a, b)) {
      this.setState({ isEdited: false });
    } else {
      this.setState({ isEdited: true });
    }
  };

  componentWillReceiveProps(nextProps) {
    let client = nextProps.clientData;
    let password = nextProps.confirmPassword;

    if (client.successProfileId) {
      this.showMessage("success");
      run(0)();
    } else if (client.errorProfileId) {
      this.showMessage();
      run(0)();
    } else if (password) {
      if (password.successPasswordId) {
        this.showMessage("success");
        run(0)();
      } else if (password.errorPasswordId) {
        this.showMessage();
        run(0)();
      }
    }
  }

  showMessage = status => {
    setTimeout(
      () =>
        this.setState({
          renderMessage: false,
          renderErrorMessage: false
        }),
      1500
    );

    status === "success"
      ? this.setState({
          renderMessage: true,
          nextStep: true
        })
      : this.setState({
          renderErrorMessage: true
        });
  };

  change = values => {
    this.props.calculatePagePercent("profilePercent", values);
  };

  submit = values => {
    this.props.updateClientProfile(values);
  };
}

export default connect(
  ({ clientData, confirmPassword }) => ({ clientData, confirmPassword }),
  { showClientData, updateClientProfile }
)(ClientProfile);
