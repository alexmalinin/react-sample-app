import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { reduxForm } from "redux-form";

import IndustryForm from "./IndustryForm";

class Industry extends Component {
  componentDidMount() {
    this.props.showUserData();
    this.props.getIndustries();
    this.props.getExperienceLevels();
  }

  submit = values => {
    this.props.updateSpecialistIndustry(values);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={16}>
              <IndustryForm
                {...this.props}
                handleSubmit={handleSubmit(this.submit)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default reduxForm({
  form: "IndustryForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
  onSubmitSuccess: (submitResult, dispatch, { history, isEditing }) => {
    if (isEditing) {
      history.push("/dashboard/about");
    } else {
      history.push("/profile/company");
    }
  },
  onSubmitFail: (error, dispatch, submitError, props) => {
    props.showSubmitErrorModal();
  }
})(Industry);
