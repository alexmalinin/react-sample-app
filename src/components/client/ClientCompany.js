import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  Container,
  ContainerLarge
} from "../../styleComponents/layout/Container";
import RenderProjectCard from "./renders/RenderProjectCard";
import ClientCompanyForm from "./forms/ClientCompanyForm";
import {
  showClientData,
  getIndustries,
  updateClientCompany
} from "../../actions/actions";
import { NewTeamBtn } from "../../styleComponents/layout/DvButton";
import StyledClientTeam from "../../styleComponents/StyledClientTeam";
import Navbar from "../layout/Navbar";
import { run } from "../../helpers/scrollToElement";
import { getAllUrlParams, compareObjects } from "../../helpers/functions";

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../modals/ConfirmationModal";

class ClientCompany extends Component {
  constructor() {
    super();

    this.state = {
      nextStep: false,
      isEditing: false,
      isEdited: false,
      nextLocation: false
    };
  }

  componentWillMount() {
    this.props.getIndustries();
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
    const { isEditing, isEdited } = this.state;
    const { clientData, industries } = this.props;

    return (
      <div>
        <ClientCompanyForm
          onChange={this.change}
          industries={industries}
          clientData={clientData}
          isEditing={isEditing}
          isEdited={isEdited}
          handleFormEdit={this.handleFormEdit}
          onSubmit={this.submit}
        />

        <NavigationPrompt
          when={(crntLocation, nextLocation) => {
            this.setState({ nextLocation: nextLocation.pathname });
            return this.state.isEdited && !this.state.nextStep;
          }}
        >
          {({ onConfirm, onCancel }) => (
            <ConfirmationModal
              isOpen={true}
              formId="ClientCompanyForm"
              clearLocation={this.clearLocation}
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
          )}
        </NavigationPrompt>

        {this.state.nextStep ? (
          isEditing ? (
            <Redirect to="about" />
          ) : this.state.nextLocation === "/profile/info" ? (
            <Redirect to="profile" />
          ) : (
            <Redirect to="billing" />
          )
        ) : null}
      </div>
    );
  }

  handleFormEdit = value => {
    this.setState({ isEdited: value });
  };

  componentWillReceiveProps(nextProps) {
    let client = nextProps.clientData;

    if (client && client.successCompanyId) {
      this.setState({
        nextStep: true
      });
      run(0)();
    }
  }

  change = values => {
    const data = this.props.collectCompanyData(values);
    this.props.calculatePagePercent("companyPercent", data);
  };

  submit = values => {
    this.props.updateClientCompany(values);
  };
}

export default connect(
  ({ industries, clientData }) => ({ industries, clientData }),
  { getIndustries, showClientData, updateClientCompany }
)(ClientCompany);
