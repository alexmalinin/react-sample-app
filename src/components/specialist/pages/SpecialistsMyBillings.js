import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  updateSpecialistBillings,
  showSpecialistData
} from "../../../actions/actions";
import { Message } from "semantic-ui-react";
import { S_Message } from "../../../styleComponents/layout/S_Message";
import { run } from "../../../helpers/scrollToElement";
import SpecialistBillingForm from "../forms/SpecialistBillingForm";
import { getAllUrlParams, compareObjects } from "../../../helpers/functions";
import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../../modals/ConfirmationModal";

class SpecialistsMyBillings extends Component {
  constructor() {
    super();

    this.state = {
      renderMessage: false,
      renderErrorMessage: false,
      nextStep: false,
      isEditing: false,
      nextLocation: false
    };
  }

  clearLocation = () => {
    this.setState({
      nextLocation: false
    });
  };

  componentWillMount() {
    this.props.showSpecialistData();

    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  componentWillUnmount() {
    this.props.showSpecialistData();
  }

  collectData(values) {
    const {
      billing_type,
      company_name,
      manager,
      bank_account_details,
      swift_code
    } = values;

    if (billing_type == "1") {
      return { company_name, manager };
    }
    return { bank_account_details, swift_code };
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
        <S_Message positive data-show={renderMessage}>
          <Message.Header>Success!</Message.Header>
          <p>Form updated</p>
        </S_Message>
        <S_Message negative data-show={renderErrorMessage}>
          <Message.Header>Error!</Message.Header>
          <p>Something went wrong, please try again</p>
        </S_Message>
        {/* <DvTitleSmall>My Billings</DvTitleSmall> */}

        <SpecialistBillingForm
          swichTab={this.swichTab}
          data={this.props.specialistData}
          isEditing={isEditing}
          isEdited={isEdited}
          handleFormEdit={this.handleFormEdit}
          handleFormChange={this.handleFormChange}
          onChange={this.change}
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
              formId="SpecialistBillingForm"
              clearLocation={this.clearLocation}
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
          )}
        </NavigationPrompt>

        {this.state.nextStep ? (
          this.state.nextLocation === "/dashboard/company" ? (
            <Redirect to="company" />
          ) : (
            <Redirect to="about" />
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
    if (nextProps.specialistData) {
      if (nextProps.specialistData.successUpdateId) {
        run(0)();
        this.showMessage("success");
      } else if (nextProps.specialistData.errorUpdateId) {
        run(0)();
        this.showMessage();
      }
    }
  }

  showMessage = status => {
    setTimeout(() => {
      return this.setState({
        renderMessage: false,
        renderErrorMessage: false,
        nextStep: true
      });
    }, 1500);

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
    this.props.updateSpecialistBillings(values);
  };
}

export default connect(({ specialistData }) => ({ specialistData }), {
  updateSpecialistBillings,
  showSpecialistData
})(SpecialistsMyBillings);
