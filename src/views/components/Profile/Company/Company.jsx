import React, { Component, Fragment } from "react";
import Loadable from "react-loadable";
import { reduxForm } from "redux-form";

// import CompanyForm from "./CompanyForm";
import ConfirmationPrompt from "../ConfirmationPrompt";

function Loading({ pastDelay }) {
  return pastDelay ? <h3>Loading...</h3> : null;
}

const SomeComponent = Loadable({
  loader: () => import("./SpecialistCompanyForm"),
  loading: Loading
});

class Company extends Component {
  state = {
    nextLocation: false
  };

  static defaultProps = {};

  componentDidMount() {
    this.props.showUserData();
    this.props.getIndustries();
  }

  handleChangeLocation = location => {
    this.setState({
      nextLocation: location
    });
  };

  submit = values => {
    this.props.updateCompany(values);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <SomeComponent
          {...this.props}
          handleSubmit={handleSubmit(this.submit)}
        />
        <ConfirmationPrompt
          formId="CompanyForm"
          shouldConfirm={this.props.dirty}
          handleChange={this.handleChangeLocation}
        />
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
  onSubmitSuccess: (submitResult, dispatch, { history, isEditing }) => {
    if (isEditing) {
      history.push("/dashboard/about");
    } else {
      history.push("/profile/billings");
    }
  },
  onSubmitFail: (error, dispatch, submitError, props) => {
    props.showSubmitErrorModal();
  }
})(Company);
