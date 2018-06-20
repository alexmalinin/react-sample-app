import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Grid, Tab } from "semantic-ui-react";
import HeaderBasic from "../../layout/HeaderBasic";
import SubHeader from "../../layout/SpecialistsSubHeader";
import { DvTitle } from "../../../styleComponents/layout/DvTitles";
import RenderProfileForm from "../../forms/RenderProfileForm";
import RenderResetPasswordForm from "../../forms/RenderResetPasswordForm";
import {
  Container,
  ContainerLarge
} from "../../../styleComponents/layout/Container";
import {
  showSpecialistData,
  updateSpecialistProfile
} from "../../../actions/actions";
import { run } from "../../../helpers/scrollToElement";
import AsideLeft from "../renders/AsideLeft";
import AsideRight from "../renders/AsideRight";
import { getAllUrlParams, compareObjects } from "../../../helpers/functions";
import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../../modals/ConfirmationModal";

const PERCENTS_NAME = "propfilePercent";

class SpecialistsProfile extends Component {
  constructor() {
    super();

    this.state = {
      nextStep: false,
      isEditing: false,
      isEdited: false
    };

    this.data = {
      first_name: null,
      last_name: null,
      email: null,
      city: null,
      country: null,
      phone_number: null,
      professional_experience_info: null
    };

    this.handleFormField = this.handleFormField.bind(this);
  }

  clearLocation = () => {
    this.setState({
      nextLocation: false
    });
  };

  handleFormField(e) {
    let data = e.target.value;
    this.data[e.target.name] = data;

    this.props.calculatePagePercent("profilePercent", this.data);
  }

  setData() {
    const {
      first_name,
      last_name,
      email,
      address,
      phone_number,
      professional_experience_info
    } = this.props.specialistData;
    const { city, country } = address ? address : {};
    this.data = {
      first_name,
      last_name,
      email,
      city,
      country,
      phone_number,
      professional_experience_info
    };
  }

  componentWillMount() {
    run(0)(true);
    localStorage.removeItem("user_email");
    this.props.showSpecialistData();

    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  render() {
    const { isEditing, isEdited } = this.state;
    const { educations, experiences } = this.props;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={16}>
              <RenderProfileForm
                onChange={this.change}
                onSubmit={this.submit}
                educations={educations}
                experiences={experiences}
                isEditing={isEditing}
                isEdited={isEdited}
                handleFormEdit={this.handleFormEdit}
                handleFormChange={this.handleFormChange}
                specialistModal
              />

              <NavigationPrompt
                when={this.state.isEdited && !this.state.nextStep}
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

              {this.state.nextStep ? (
                isEditing ? (
                  <Redirect to="about" />
                ) : (
                  <Redirect to="industry" />
                )
              ) : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={16}>
              <RenderResetPasswordForm user="specialist" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    let client = nextProps.specialistData;
    let password = nextProps.confirmPassword;

    if (this.props.specialistData) {
      this.setData();
    }

    if (client.successProfileId) {
      this.setState({
        nextStep: true
      });
      run(0)();
    } else if (password) {
      if (password.successPasswordId) {
        this.setState({
          nextStep: true
        });
        run(0)();
      } else if (password.errorPasswordId) {
        run(0)();
      }
    }

    if (nextProps.formValues && this.props.isEditing) {
      if (this.state.fetchFormValues) {
        this.initialFormValues = nextProps.formValues;
        this.setState({ fetchFormValues: false });
      }
      this.setState({ formData: nextProps.formValues });
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
    this.props.calculatePagePercent("profilePercent", values);
  };

  submit = values => {
    const { updateSpecialistProfile, educations, experiences } = this.props;
    updateSpecialistProfile(values, educations, experiences);
  };
}

export default connect(
  ({ specialistData, confirmPassword, educations, experiences }) => ({
    specialistData,
    confirmPassword,
    educations,
    experiences
  }),
  { showSpecialistData, updateSpecialistProfile }
)(SpecialistsProfile);
