import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { reduxForm } from "redux-form";

import IndustryForm from "./IndustryForm";
import { getAllUrlParams } from "../../../utils/functions";

class Industry extends Component {
  componentDidMount() {
    this.props.getUserData();
    this.props.getIndustries();
    this.props.getExperienceLevels();
    this.props.getProjectTypes();
  }

  render() {
    const { handleSubmit, history, updateSpecialistIndustry } = this.props;
    const isEditing = getAllUrlParams().edit || null;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={16}>
              <IndustryForm
                {...this.props}
                isEditing={isEditing}
                handleSubmit={handleSubmit(values =>
                  updateSpecialistIndustry(values).then(() => {
                    history.push(
                      isEditing ? "/dashboard/about" : "/profile/company"
                    );
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
