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

  render() {
    const { handleSubmit, history, updateBillings } = this.props;

    return (
      <BillingsForm
        {...this.props}
        handleChange={this.handleChange}
        activeTab={this.state.activeTab}
        handleSubmit={handleSubmit(values =>
          updateBillings(values).then(() => history.push("/dashboard/about"))
        )}
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
  onSubmitSuccess: (submitResult, dispatch, { history }) => {},
  onSubmitFail: (error, dispatch, submitError, props) => {
    if (error) props.showSubmitErrorModal();
  }
})(Billings);
