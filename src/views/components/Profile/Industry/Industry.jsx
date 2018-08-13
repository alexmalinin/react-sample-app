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

  render() {
    const {
      handleSubmit,
      history,
      isEditing,
      updateSpecialistIndustry
    } = this.props;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={16}>
              <IndustryForm
                {...this.props}
                handleSubmit={handleSubmit(values =>
                  updateSpecialistIndustry(values).then(() => {
                    if (isEditing) {
                      history.push("/dashboard/about");
                    } else {
                      history.push("/profile/company");
                    }
                  })
                )}
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
  onSubmitSuccess: (submitResult, dispatch, { history, isEditing }) => {},
  onSubmitFail: (error, dispatch, submitError, props) => {
    if (error) props.showSubmitErrorModal();
  }
})(Industry);
