import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  getIndustries,
  updateSpecStep2,
  showSpecialistData
} from "../../../actions/actions";
import { run } from "../../../helpers/scrollToElement";
import SpecialistCompanyForm from "../forms/SpecialistCompanyForm";
import { getAllUrlParams } from "../../../helpers/functions";

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

  render() {
    const { isEdited, isEditing, nextStep, nextLocation } = this.state;

    const { industries } = this.props;

    return (
      <div>
        <SpecialistCompanyForm
          industries={industries}
          isEditing={isEditing}
          handleFormEdit={this.handleFormEdit}
          onSubmit={this.submit}
          onChange={this.change}
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
              formId="SpecialistCompanyForm"
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
              <Redirect to="about" />
            )
          ) : nextLocation ? (
            <Redirect to={nextLocation} />
          ) : (
            <Redirect to="billings" />
          )
        ) : null}
      </div>
    );
  }

  handleFormEdit = value => {
    this.setState({ isEdited: value });
  };

  change = values => {
    this.props.calculatePagePercent("companyPercent", values);
  };

  submit = values => {
    this.props.updateSpecStep2(values, () => {
      this.setState({
        nextStep: true
      });

      run(0)();
    });
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
