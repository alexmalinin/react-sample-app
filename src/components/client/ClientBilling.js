import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
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
      nextStep: false,
      isEditing: false,
      isEdited: false,
      nextLocation: false
    };
  }

  clearLocation = () => {
    this.setState({
      nextLocation: false
    });
  };

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
    const { isEditing, isEdited } = this.state;

    return (
      <div>
        <ClientBillingForm
          onChange={this.change}
          clientData={clientData}
          onSubmit={this.submit}
          isEditing={isEditing}
          isEdited={isEdited}
          handleFormEdit={this.handleFormEdit}
          handleFormChange={this.handleFormChange}
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
              formId="ClientBillingForm"
              clearLocation={this.clearLocation}
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
          )}
        </NavigationPrompt>

        {this.state.nextStep ? (
          isEditing ? (
            <Redirect to="about" />
          ) : this.state.nextLocation === "/dashboard/company" ? (
            <Redirect to="company" />
          ) : (
            <Redirect to="/dashboard/" />
          )
        ) : null}
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
      this.setState({
        nextStep: true
      });
      run(0)();
    }
  }

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
