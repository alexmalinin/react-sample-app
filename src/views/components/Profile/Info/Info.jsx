import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import InfoForm from "./InfoForm";
import { getAllUrlParams } from "@views/utils/functions";

class Info extends Component {
  state = {
    educations: [],
    experience: []
  };

  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    const { handleSubmit, history, updateUserProfile } = this.props;
    const isEditing = getAllUrlParams().edit || null;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={16}>
              <InfoForm
                {...this.props}
                isEditing={isEditing}
                handleSubmit={handleSubmit(values =>
                  updateUserProfile(values).then(() => {
                    if (isEditing) {
                      history.push("/dashboard/about");
                    } else {
                      history.push("/profile/industry");
                    }
                  })
                )}
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

export default Info;
