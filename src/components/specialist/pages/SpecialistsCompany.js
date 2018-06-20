import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  getIndustries,
  updateSpecStep2,
  showSpecialistData
} from "../../../actions/actions";
import {
  Container,
  ContainerLarge
} from "../../../styleComponents/layout/Container";
import { S_MainContainer } from "../../../styleComponents/layout/S_MainContainer";
import { run } from "../../../helpers/scrollToElement";
import SpecialistCompanyForm from "../forms/SpecialistCompanyForm";
import { getAllUrlParams, compareObjects } from "../../../helpers/functions";

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../../modals/ConfirmationModal";

class SpecialistCompany extends Component {
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

  componentWillMount() {
    this.props.getIndustries();
    this.props.showSpecialistData();

    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  componentWillUnmount() {
    this.props.showSpecialistData();
  }

  render() {
    const { isEditing, isEdited } = this.state;

    const { industries } = this.props;

    return (
      <div>
        <SpecialistCompanyForm
          industries={industries}
          isEditing={isEditing}
          isEdited={isEdited}
          handleFormEdit={this.handleFormEdit}
          handleFormChange={this.handleFormChange}
          onSubmit={this.submit}
          onChange={this.change}
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
              formId="SpecialistCompanyForm"
              clearLocation={this.clearLocation}
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
          )}
        </NavigationPrompt>

        {this.state.nextStep ? (
          this.state.isEditing ? (
            <Redirect to="about" />
          ) : this.state.nextLocation === "/dashboard/industry" ? (
            <Redirect to="industry" />
          ) : (
            <Redirect to="billings" />
          )
        ) : null}
      </div>
    );
  }

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

  change = values => {
    this.props.calculatePagePercent("companyPercent", values);
  };

  submit = values => {
    this.props.updateSpecStep2(values);
  };
}

export default connect(
  ({ industries, company, specialistData }) => ({
    industries,
    company,
    specialistData
  }),
  { getIndustries, updateSpecStep2, showSpecialistData }
)(SpecialistCompany);
