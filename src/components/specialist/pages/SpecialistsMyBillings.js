import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  updateSpecialistBillings,
  showSpecialistData
} from "../../../actions/actions";
import { run } from "../../../helpers/scrollToElement";
import SpecialistBillingForm from "../forms/SpecialistBillingForm";
import { getAllUrlParams, compareObjects } from "../../../helpers/functions";
import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../../modals/ConfirmationModal";

class SpecialistsMyBillings extends Component {
  constructor() {
    super();

    this.state = {
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
    const { isEditing, isEdited } = this.state;

    return (
      <div>
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
        this.setState({
          nextStep: true
        });

        run(0)();
      }
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
    this.props.updateSpecialistBillings(values);
  };
}

export default connect(({ specialistData }) => ({ specialistData }), {
  updateSpecialistBillings,
  showSpecialistData
})(SpecialistsMyBillings);
