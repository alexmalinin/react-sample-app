import React, { Component, Fragment } from "react";

import { Container } from "@styled/Containers";

import SearchFilterForm from "./forms/SearchFilterForm";
import FilteredList from "./FilteredList";

class Search extends Component {
  state = {
    filters: {
      hourly_rate: {
        min: 0,
        max: 100
      }
    },
    selectedProject: null
  };

  // componentWillReceiveProps(nextProps) {
  //   if (!this.props.specialistCustomTeams && nextProps.specialistId) {
  //     this.props.showSpecialistCustomTeams(nextProps.specialistId);
  //   }
  // }

  handleChange = (event, data) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [data.name]: data.value
      }
    });
  };

  clearFilters = () => {
    this.setState({
      filters: {
        hourly_rate: {
          min: 0,
          max: 100
        }
      }
    });
  };

  handleChangeProject = value => {
    this.setState({ selectedProject: value });
  };

  render() {
    const { searchResult } = this.props;
    const { filters, selectedProject } = this.state;

    console.log("searchResult", searchResult);

    return (
      <Fragment>
        <Container fluid indentTopXs sidebarCondition>
          <SearchFilterForm
            handleChange={this.handleChange}
            handleChangeProject={this.handleChangeProject}
            clearFilters={this.clearFilters}
            filters={filters}
          />
        </Container>

        <Container sidebarCondition dashboardContainer transparent>
          {searchResult && (
            <FilteredList
              filters={filters}
              specialists={searchResult}
              projectId={selectedProject}
              handleMessage={this.handleMessage}
            />
          )}

          {searchResult &&
            searchResult.length === 0 && (
              <div className="default">There are no results</div>
            )}
        </Container>
      </Fragment>
    );
  }
}

export default Search;
