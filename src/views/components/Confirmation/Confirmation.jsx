import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import StyledFormHeader from "@styled/forms/FormHeader";

class Confirmation extends Component {
  componentWillUnmount() {
    localStorage.removeItem("user_email");
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column className="perspective">
            <StyledFormHeader borderBottom>
              <div className="form-title">Confirmation</div>
              <div className="form-subtitle">
                Please verify your email adress.
              </div>
            </StyledFormHeader>
            <div className="confirm-msg">
              <p>A confirmation email has been sent to the folowing email</p>
              <div>{localStorage.getItem("user_email")}</div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Confirmation;
