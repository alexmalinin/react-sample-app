import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { reduxForm } from "redux-form";

import InfoForm from "./InfoForm";

class Info extends Component {
  state = {
    educations: [],
    experience: []
  };

  componentDidMount() {
    this.props.showUserData();
  }

  render() {
    const { handleSubmit, updateUserProfile } = this.props;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={16}>
              <InfoForm
                {...this.props}
                handleSubmit={handleSubmit(values => updateUserProfile(values))}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={16}>
              {/* <RenderResetPasswordForm user="specialist" /> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default reduxForm({
  form: "InfoForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
  onSubmitSuccess: (submitResult, dispatch, { history, isEditing }) => {
    console.log("submitResult", submitResult);
    // if (isEditing) {
    //   history.push("/dashboard/about");
    // } else {
    //   history.push("/profile/industry");
    // }
  },
  onSubmitFail: (error, dispatch, submitError, props) => {
    // props.showSubmitErrorModal();
  }
})(Info);
