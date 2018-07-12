import React, { Component, Fragment } from "react";
import { Form, Input, Grid } from "semantic-ui-react";
import { DvBlueButton } from "../../../styleComponents/layout/DvButton";
import { getUserRole } from "../../../helpers/functions";
import { S_REDGUY } from "../../../constants/user";

export default class SearchForm extends Component {
  state = {
    search: "",
    loading: false
  };

  handleSearch = (e, { name, value }) => {
    this.setState({
      search: value
    });
  };

  handleClear = () => {
    this.setState({ search: "" });
  };

  handleSubmitSearch = () => {
    const {
      currentProject,
      searchSpecialist,
      searchSpecialistForProject,
      specialistId
    } = this.props;

    const { search } = this.state;
    let roleController;

    if (getUserRole() === S_REDGUY) {
      roleController = specialistId;
    }

    if (!!search || !currentProject) {
      searchSpecialist(search, roleController);
    } else if (currentProject) {
      searchSpecialistForProject(currentProject);
    }
  };

  clearForm = () => {
    const { clear, searchSpecialist, specialistId } = this.props;
    clear();
    this.handleClear();

    if (getUserRole() === S_REDGUY) {
      searchSpecialist();
    } else {
      searchSpecialist(null, specialistId);
    }
  };

  render() {
    const { search, loading } = this.state;

    return (
      <Fragment>
        <Grid.Column computer={14}>
          <Form onSubmit={this.handleSubmitSearch}>
            <Input
              className="search"
              placeholder="Search by keywords"
              loading={loading}
              icon="search"
              iconPosition="left"
              action="Search"
              onChange={this.handleSearch}
              onKeyUp={e => e.keyCode === 13 && e.target.blur()}
              value={search}
              fluid
            />
          </Form>
        </Grid.Column>
        <Grid.Column computer={2}>
          <DvBlueButton
            onClick={this.clearForm}
            role="button"
            className="clear dv-blue inverted"
            uppercase="true"
            fontSize={14}
            fluid
          >
            Clear filter
          </DvBlueButton>
        </Grid.Column>
      </Fragment>
    );
  }
}
