import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import HeaderBasic from "../layout/HeaderBasic";
import { NavLink } from "react-router-dom";
import SubHeader from "../layout/ClientSubHeader";
import { Grid } from "semantic-ui-react";
import { DvTitle, DvTitleSmall } from "../../styleComponents/layout/DvTitles";
import {
  Container,
  ContainerLarge
} from "../../styleComponents/layout/Container";
import { S_Message } from "../../styleComponents/layout/S_Message";
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
import { Message } from "semantic-ui-react";
import { run } from "../../helpers/scrollToElement";
import { getAllUrlParams, compareObjects } from "../../helpers/functions";

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../modals/ConfirmationModal";

class ClientCompany extends Component {
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
    this.props.getIndustries();
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
    const { clientData, industries } = this.props;

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
        {/* <DvTitleSmall fz='28' xsCenter>My Company</DvTitleSmall> */}
        <ClientCompanyForm
          onChange={this.change}
          industries={industries}
          clientData={clientData}
          isEditing={isEditing}
          isEdited={isEdited}
          handleFormEdit={this.handleFormEdit}
          handleFormChange={this.handleFormChange}
          onSubmit={this.submit}
        />

        <NavigationPrompt when={this.state.isEdited}>
          {({ onConfirm, onCancel }) => (
            <ConfirmationModal
              isSubmitted={this.state.nextStep}
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
          )}
        </NavigationPrompt>

        {this.state.nextStep ? (
          isEditing ? (
            <Redirect to="about" />
          ) : (
            <Redirect to="billing" />
          )
        ) : null}
        {/* {this.state.nextStep && <Redirect to="billing" />} */}
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

    if (client && client.successCompanyId) {
      this.showMessage("success");
      run(0)();
    } else if (client && client.successCompanyId) {
      this.showMessage();
      run(0)();
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
    this.props.calculatePagePercent("companyPercent", values);
  };

  submit = values => {
    this.props.updateClientCompany(values);
  };
}

export default connect(
  ({ industries, clientData }) => ({ industries, clientData }),
  { getIndustries, showClientData, updateClientCompany }
)(ClientCompany);
