import React, { Component, Fragment } from "react";
import { Form, Input, Grid, Button } from "semantic-ui-react";
import { DvBlueButton } from "../../../styleComponents/layout/DvButton";
import { getUserRole } from "../../../helpers/functions";
import { S_REDGUY } from "../../../constans/constans";

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
      toggleProjectError,
      specialistId
    } = this.props;

    const { search } = this.state;
    let roleController;

    if (getUserRole() === S_REDGUY) roleController = specialistId;

    if (!!search) searchSpecialist(search, roleController);
    else this.clearForm();
  };

  clearForm = () => {
    const {
      currentProject,
      searchSpecialistForProject,
      clear,
      searchSpecialist,
      specialistId
    } = this.props;
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
            fluid
          >
            Clear filter
          </DvBlueButton>
        </Grid.Column>
      </Fragment>
    );
  }
}
