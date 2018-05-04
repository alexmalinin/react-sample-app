import React, { Component } from "react";
import { Field, reduxForm, change } from "redux-form";
import { required } from "../../helpers/validate";
import RenderField from "../forms/renders/RenderField";
import { DvButton, SubmitBtn } from "../../styleComponents/layout/DvButton";
import InputField from "../forms/renders/InputField";
import { Grid } from "semantic-ui-react";
import StyledWelcomeForm from "../../styleComponents/StyledWelcomeForm";
import RenderTextArea from "../forms/renders/RenderTextArea";
import { StyledLabelArea } from "../../styleComponents/forms/StyledTextArea";
import RenderSelect from "../forms/renders/RenderSelect";
import RenderFile from "../forms/renders/RenderFile";

let renderError = true;

class AddTeamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetch: true
    };
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={13}>
              <InputField
                name="name"
                label="Team name"
                validate={[required]}
                padded
              />
            </Grid.Column>

            <Grid.Column verticalAlign="bottom" computer={3} floated="right">
              <SubmitBtn type="submit" disabled={submitting} primary>
                <span>Save</span>
              </SubmitBtn>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    );
  }

  componentWillReceiveProps(nextProps) {}

  closeModal = ev => {
    ev.preventDefault();
    let close = document.querySelector("i.close.icon");
    close.click();
  };

  componentWillUnmount() {
    renderError = true;
  }
}

export default reduxForm({
  form: "CreateTaskForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(AddTeamForm);
