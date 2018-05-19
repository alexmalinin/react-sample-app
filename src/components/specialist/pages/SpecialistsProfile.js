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
import { DvTitleSmall } from "../../../styleComponents/layout/DvTitles";
import {
  showSpecialistData,
  updateSpecialistProfile
} from "../../../actions/actions";
import { S_MainContainer } from "../../../styleComponents/layout/S_MainContainer";
import { S_Message } from "../../../styleComponents/layout/S_Message";
import { Message } from "semantic-ui-react";
import { run } from "../../../helpers/scrollToElement";
import AsideLeft from "../renders/AsideLeft";
import AsideRight from "../renders/AsideRight";
import { getAllUrlParams } from "../../../helpers/functions";

const PERCENTS_NAME = "propfilePercent";

class SpecialistsProfile extends Component {
  constructor() {
    super();

    this.state = {
      renderMessage: false,
      renderErrorMessage: false,
      nextStep: false,
      isEditing: false
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
    const { renderMessage, renderErrorMessage, isEditing } = this.state;
    const { educations, experiences, handleFormValueChange } = this.props;

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
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={16}>
              <RenderProfileForm
                onChange={this.change}
                onSubmit={this.submit}
                educations={educations}
                experiences={experiences}
                isEditing={isEditing}
                handleFormValueChange={handleFormValueChange}
                specialistModal
              />
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
      this.showMessage("success");
      run(0)();
    } else if (client.errorProfileId) {
      this.showMessage();
      run(0)();
    } else if (password) {
      if (password.successPasswordId) {
        this.showMessage("success");
        run(0)();
      } else if (password.errorPasswordId) {
        this.showMessage();
        run(0)();
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
