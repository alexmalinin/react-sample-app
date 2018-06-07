import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import HeaderBasic from "../../layout/HeaderBasic";
import SubHeader from "../../layout/SpecialistsSubHeader";
import SpecialistIndustryForm from "../forms/SpecialistIndustryForm";
import {
  getProjectTypes,
  getExperienceLevels,
  getIndustries,
  showSpecialistData,
  updateSpecStep1,
  getSkills
} from "../../../actions/actions";
import { Message } from "semantic-ui-react";
import { S_Message } from "../../../styleComponents/layout/S_Message";
import { run } from "../../../helpers/scrollToElement";
import { getAllUrlParams, compareObjects } from "../../../helpers/functions";

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../../modals/ConfirmationModal";

class SpecialistIndustry extends Component {
  constructor() {
    super();

    this.state = {
      renderMessage: false,
      renderErrorMessage: false,
      nextStep: false,
      isEditing: false,
      isEdited: false,
      nextLocation: false
    };
  }

  componentWillMount() {
    this.props.getIndustries();
    this.props.getProjectTypes();
    this.props.getExperienceLevels();
    this.props.showSpecialistData();

    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  componentWillUnmount() {
    this.props.showSpecialistData();
  }

  clearLocation = () => {
    this.setState({
      nextLocation: false
    });
  };

  render() {
    const {
      renderMessage,
      renderErrorMessage,
      isEditing,
      isEdited
    } = this.state;
    const {
      industries,
      projectTypes,
      experienceLevels,
      specialistData
    } = this.props;

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
        <SpecialistIndustryForm
          industries={industries}
          projectTypes={projectTypes}
          experienceLevels={experienceLevels}
          specialistData={specialistData}
          isEditing={isEditing}
          isEdited={isEdited}
          handleFormEdit={this.handleFormEdit}
          handleFormChange={this.handleFormChange}
          onChange={this.change}
          onSubmit={this.submit}
          getSkills={this.props.getSkills}
          skills={this.props.skills}
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
              formId="SpecialistIndustryForm"
              clearLocation={this.clearLocation}
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
          )}
        </NavigationPrompt>

        {this.state.nextStep ? (
          isEditing ? (
            <Redirect to="about" />
          ) : this.state.nextLocation === "/dashboard/profile" ? (
            <Redirect to="profile" />
          ) : (
            <Redirect to="company" />
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
      if (nextProps.specialistData.successIndustryId) {
        run(0)();
        this.showMessage("success");
      } else if (nextProps.specialistData.errorIndustryId) {
        run(0)();
        this.showMessage();
      }
    }
  }

  showMessage = status => {
    setTimeout(() => {
      return this.setState({
        renderMessage: false,
        renderErrorMessage: false
      });
    }, 1500);

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
    this.props.calculatePagePercent("industryPercent", values);
  };

  submit = values => {
    this.props.updateSpecStep1(values);
  };
}

export default connect(
  ({ industries, projectTypes, experienceLevels, specialistData, skills }) => ({
    industries,
    projectTypes,
    experienceLevels,
    specialistData,
    skills
  }),
  {
    updateSpecStep1,
    getIndustries,
    getProjectTypes,
    getExperienceLevels,
    showSpecialistData,
    getSkills
  }
)(SpecialistIndustry);
