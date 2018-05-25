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
import ClientBillingForm from "./forms/ClientBillingForm";
import {
  showClientData,
  getIndustries,
  updateClientBilling
} from "../../actions/actions";
import { NewTeamBtn } from "../../styleComponents/layout/DvButton";
import StyledClientTeam from "../../styleComponents/StyledClientTeam";
import Navbar from "../layout/Navbar";
import { Message } from "semantic-ui-react";
import { run } from "../../helpers/scrollToElement";
import { getAllUrlParams, compareObjects } from "../../helpers/functions";
import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../modals/ConfirmationModal";

class ClientBilling extends Component {
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

  collectData(values) {
    const {
      billing_type,
      account_number,
      account_details,
      card_name,
      card_number,
      expiry_date,
      ccv,
      password
    } = values;

    if (!billing_type || billing_type == "0") {
      let obj = { data: { account_number, password }, count: 2 };
      return obj;
    }

    if (billing_type == "1") {
      let obj = {
        data: { card_name, card_number, expiry_date, ccv },
        count: 4
      };
      return obj;
    }
    if (billing_type == "2") {
      let obj = { data: { account_details }, count: 1 };
      return obj;
    }
  }

  componentWillMount() {
    this.props.showClientData();
    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  render() {
    const { clientData } = this.props;
    const {
      renderErrorMessage,
      renderMessage,
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
        {/* <DvTitleSmall fz='28' xsCenter>My Billing</DvTitleSmall> */}
        <ClientBillingForm
          onChange={this.change}
          clientData={clientData}
          onSubmit={this.submit}
          isEditing={isEditing}
          isEdited={isEdited}
          handleFormEdit={this.handleFormEdit}
          handleFormChange={this.handleFormChange}
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
            <Redirect to="board" />
          )
        ) : null}
        {/* {this.state.nextStep && <Redirect to="board" />} */}
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

    if (client && client.successBillingId) {
      this.showMessage("success");
      run(0)();
    } else if (client && client.successBillingId) {
      this.showMessage();
      run(0)();
    }
  }

  showMessage = status => {
    setTimeout(
      () =>
        this.setState({
          renderMessage: false,
          renderErrorMessage: false,
          nextStep: true
        }),
      1500
    );

    status === "success"
      ? this.setState({
          renderMessage: true
        })
      : this.setState({
          renderErrorMessage: true
        });
  };

  change = values => {
    if (!values.hasOwnProperty("billing_type")) {
      values.billing_type = 0;
    }
    const data = this.collectData(values);
    this.props.calculatePagePercent("billingPercent", data);
  };

  submit = values => {
    this.props.updateClientBilling(values);
  };
}

export default connect(
  ({ industries, clientData }) => ({ industries, clientData }),
  { getIndustries, showClientData, updateClientBilling }
)(ClientBilling);
