import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Grid } from "semantic-ui-react";
import RenderProfileForm from "../forms/RenderProfileForm";
import RenderResetPasswordForm from "../forms/RenderResetPasswordForm";
import { showClientData, updateClientProfile } from "../../actions/actions";
import { run } from "../../helpers/scrollToElement";
import { getAllUrlParams } from "../../helpers/functions";
import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../modals/ConfirmationModal";

class ClientProfile extends Component {
  state = {
    nextStep: false,
    isEditing: false,
    isEdited: false,
    nextLocation: false
  };

  componentWillMount() {
    sessionStorage.removeItem("client_step");
    localStorage.removeItem("user_email");
    this.props.showClientData();

    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  clearLocation = () => {
    this.setState({
      nextLocation: false
    });
  };

  render() {
    const { isEditing, isEdited, nextStep, nextLocation } = this.state;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={16}>
              <RenderProfileForm
                onChange={this.change}
                onSubmit={this.submit}
                isEditing={isEditing}
                isEdited={isEdited}
                handleFormEdit={this.handleFormEdit}
              />

              <NavigationPrompt
                when={(crntLocation, nextLocation) => {
                  this.setState({
                    nextLocation: nextLocation.pathname + nextLocation.search
                  });
                  return isEdited && !nextStep;
                }}
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

              {nextStep ? (
                isEditing ? (
                  nextLocation ? (
                    <Redirect to={nextLocation} />
                  ) : (
                    <Redirect to="/dashboard/about" />
                  )
                ) : nextLocation ? (
                  <Redirect to={nextLocation} />
                ) : (
                  <Redirect to="/profile/company" />
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

  componentWillReceiveProps(nextProps) {
    let password = nextProps.confirmPassword;

    if (password) {
      if (password.successPasswordId) {
        run(0)();
      } else if (password.errorPasswordId) {
        run(0)();
      }
    }
  }

  change = values => {
    const data = this.props.collectPropfileData(values);
    this.props.calculatePagePercent("profilePercent", data);
  };

  submit = values => {
    this.props.updateClientProfile(values, () => {
      this.setState({
        nextStep: true
      });

      run(0)();
    });
  };
}

export default connect(
  ({ clientData, confirmPassword }) => ({ clientData, confirmPassword }),
  { showClientData, updateClientProfile }
)(ClientProfile);
