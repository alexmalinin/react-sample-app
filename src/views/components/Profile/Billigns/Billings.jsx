import React, { Component } from "react";
import { reduxForm } from "redux-form";

import BillingsForm from "./BillingsForm";

class Billings extends Component {
  state = {
    activeTab: this.props.defaultTab
  };

  static defaultProps = {
    defaultTab: 0
  };

  componentDidMount() {
    this.props.showUserData();
  }

  handleChange = event => {
    this.setState({
      activeTab: event.target.value
    });
  };

  submit = values => {
    console.log("values", values);
    this.props.updateBillings(values);
  };

  render() {
    console.log("Billings", this.props.initialValues);
    const { handleSubmit } = this.props;

    return (
      <BillingsForm
        {...this.props}
        handleChange={this.handleChange}
        activeTab={this.state.activeTab}
        handleSubmit={handleSubmit(this.submit)}
      />
    );
  }
}

export default reduxForm({
  form: "BillingsForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
  onSubmitSuccess: (submitResult, dispatch, { history }) => {
    history.push("/dashboard/about");
  },
  onSubmitFail: (error, dispatch, submitError, props) => {
    props.showSubmitErrorModal();
  }
})(Billings);
