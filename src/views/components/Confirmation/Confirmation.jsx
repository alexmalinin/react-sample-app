import React from "react";
import { Grid } from "semantic-ui-react";

import StyledFormHeader from "@styled/forms/FormHeader";

const Confirmation = () => {
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
            <div>
              {/* {signUpData
                ? signUpData.email
                : localStorage.getItem("user_email")} */}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Confirmation;
