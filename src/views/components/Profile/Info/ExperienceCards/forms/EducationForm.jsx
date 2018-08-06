import React from "react";
import { Form, Field } from "redux-form";
import { Grid } from "semantic-ui-react";

import InputField from "@UI/inputs/InputField";
import SelectField from "@UI/inputs/SelectField";
import RenderTextArea from "@UI/inputs/TextArea";
import { CancelBtn, SaveBtn } from "@styled/DVButton";

import { required } from "@views/utils/validate";

const EducationForm = ({ handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={8}>
            <Field
              name="name"
              label="School"
              component={InputField}
              validate={[required]}
              isRequired
            />
            <Grid>
              <Grid.Row>
                <Grid.Column computer={8}>
                  <Field
                    name="started_at"
                    label="From"
                    component={SelectField}
                    onChange={this.handleSelectChange}
                    // options={getYearsForSelect()}
                    validate={[required]}
                    isRequired
                  />
                </Grid.Column>
                <Grid.Column computer={8}>
                  <Field
                    name="finished_at"
                    label="To"
                    component={SelectField}
                    // disabled={this.state.disabled}
                    // options={getYearsForSelect(this.state.started, true)}
                    validate={[required]}
                    isRequired
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/* </StyledWelcomeForm> */}
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            <Field
              name="specialisation"
              label="Area of study"
              component={InputField}
              validate={[required]}
              isRequired
            />
            <Field
              name="degree"
              label="Degree"
              component={InputField}
              validate={[required]}
              isRequired
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            {/* <StyledLabelArea> */}
            <Field
              name="description"
              label="Description"
              component={RenderTextArea}
              // validate={[required]}
            />
            {/* </StyledLabelArea> */}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column mobile={16} textAlign="right">
            <CancelBtn
              onClick={this.closeModal}
              // disabled={submitting}
              primary
              static="true"
            >
              <span>Cancel</span>
            </CancelBtn>
            <SaveBtn
              type="submit"
              // disabled={submitting}
              onClick={this.handleSubmitError}
              primary
              updatebtn="true"
              static="true"
            >
              <span>Save</span>
            </SaveBtn>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default EducationForm;
