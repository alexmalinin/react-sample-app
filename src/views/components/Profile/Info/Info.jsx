import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import InfoForm from "./InfoForm";
import ResetPasswordForm from "./ResetPasswordForm";

import { getAllUrlParams } from "@views/utils/functions";

class Info extends Component {
  state = {
    isEditing: getAllUrlParams().edit || null
  };

  submit = values => {
    const { educations, work_experiences, updateUserProfile } = this.props;

    return updateUserProfile(values, educations, work_experiences);
  };

  render() {
    const { isEditing } = this.state;
    const { handleSubmit } = this.props;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={16}>
              <InfoForm
                {...this.props}
                isEditing={isEditing}
                handleSubmit={handleSubmit(this.submit)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={16}>
              <ResetPasswordForm />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Info;
