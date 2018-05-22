import React, { Component } from "react";
import { reduxForm, change, reset } from "redux-form";
import { connect } from "react-redux";
import StyledSearchFilter from "../../../styleComponents/layout/StyledSearchFilter";
import { Grid } from "semantic-ui-react";
import { Field } from "react-redux-form";
import RenderSelect from "../../forms/renders/RenderSelect";

class SearchFilterForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <StyledSearchFilter>
          <Grid columns={15}>
            <Grid.Row>
              <Grid.Column>
                <h1 className="pageTitle">Search</h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="project"
                  component={RenderSelect}
                  label="status"
                  small
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </StyledSearchFilter>
      </form>
    );
  }
}

SearchFilterForm = reduxForm({
  form: "SearchFilterForm"
})(SearchFilterForm);

export default connect()(SearchFilterForm);
