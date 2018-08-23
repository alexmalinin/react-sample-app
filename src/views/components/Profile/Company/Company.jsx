import React, { Component, Fragment } from "react";
import { reduxForm } from "redux-form";

import SpecialistConpanyForm from "./SpecialistCompanyForm";
import ClientCompanyForm from "./ClientCompanyForm";
import ConfirmationPrompt from "../ConfirmationPrompt";

import { SPECIALIST } from "@utilities";
import { getAllUrlParams } from "../../../utils/functions";

class Company extends Component {
  state = {
    nextLocation: false
  };

  static defaultProps = {};

  componentDidMount() {
    this.props.getUserData();
    this.props.getIndustries();
  }

  handleChangeLocation = location => {
    this.setState({
      nextLocation: location
    });
  };

  render() {
    const { handleSubmit, history, usertype, updateCompany } = this.props;
    const isEditing = getAllUrlParams().edit || null;

    return (
      <Fragment>
        {usertype === SPECIALIST ? (
          <SpecialistConpanyForm
            {...this.props}
            isEditing={isEditing}
            handleSubmit={handleSubmit(values =>
              updateCompany(values).then(() => {
                if (isEditing) {
                  history.push("/dashboard/about");
                } else {
                  history.push("/profile/billings");
                }
              })
            )}
          />
        ) : (
          <ClientCompanyForm
            {...this.props}
            isEditing={isEditing}
            handleSubmit={handleSubmit(values =>
              updateCompany(values).then(() => {
                if (isEditing) {
                  history.push("/dashboard/about");
                } else {
                  history.push("/profile/billings");
                }
              })
            )}
          />
        )}
        {/* <ConfirmationPrompt
          formId="CompanyForm"
          shouldConfirm={this.props.dirty}
          handleChange={this.handleChangeLocation}
        /> */}
      </Fragment>
    );
  }
}

export default reduxForm({
  form: "CompanyForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
  onSubmitSuccess: (submitResult, dispatch, { history, isEditing }) => {},
  onSubmitFail: (error, dispatch, submitError, props) => {
    if (error) props.showSubmitErrorModal();
  }
})(Company);
