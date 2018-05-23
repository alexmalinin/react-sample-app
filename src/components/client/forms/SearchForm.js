import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";

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

  handleSubmitSearch = () => {
    const { search } = this.state;
    search && this.props.searchSpecialist(search);
  };

  render() {
    const { search, loading } = this.state;

    return (
      <Form onSubmit={this.handleSubmitSearch}>
        <Input
          className="search"
          placeholder="Search by keywords"
          loading={loading}
          icon="search"
          iconPosition="left"
          action="Search"
          onChange={this.handleSearch}
          value={search}
          fluid
        />
      </Form>
    );
  }
}
