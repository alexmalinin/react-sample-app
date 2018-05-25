import React, { Component, Fragment } from "react";
import { Form, Input, Grid, Button } from "semantic-ui-react";

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
      toggleProjectError
    } = this.props;
    const { search } = this.state;

    !!search ? searchSpecialist(search) : searchSpecialist();
  };

  clearForm = () => {
    const {
      currentProject,
      searchSpecialistForProject,
      clear,
      searchSpecialist
    } = this.props;
    clear();
    this.handleClear();
    searchSpecialist();
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
          <Button
            onClick={this.clearForm}
            role="button"
            className="clear dv-blue inverted"
            fluid
          >
            Clear filter
          </Button>
        </Grid.Column>
      </Fragment>
    );
  }
}
