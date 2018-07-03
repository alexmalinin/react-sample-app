import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ContainerLarge,
  Container
} from "../../../styleComponents/layout/Container";
import SearchFilterForm from "../../client/forms/SearchFilterForm";
import SearchFilterFormCore from "../../client/forms/SearchFilterFormCore";
import SpecialistCard from "../../layout/SpecialistCard";
import { showSpecialistCustomTeams } from "../../../actions/actions";
import { Grid } from "semantic-ui-react";
import { getUserRole } from "../../../helpers/functions";
import { S_REDGUY } from "../../../constants/user";
import { getSpecialistId } from "../../../helpers/selectors";

class SearchSpecialist extends Component {
  state = {
    filters: {
      hourly_rate: {
        min: 0,
        max: 100
      }
    },
    selectedProject: null
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.specialistCustomTeams && nextProps.specialistId) {
      this.props.showSpecialistCustomTeams(nextProps.specialistId);
    }
  }

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

    return (
      <ContainerLarge indentTop>
        <Container fluid indentTopXs sidebarCondition>
          {getUserRole() === S_REDGUY ? (
            <SearchFilterForm
              handleChange={this.handleChange}
              handleChangeProject={this.handleChangeProject}
              clearFilters={this.clearFilters}
              filters={filters}
            />
          ) : (
            <SearchFilterFormCore
              clearFilters={this.clearFilters}
              filters={filters}
            />
          )}
        </Container>
        <Container sidebarCondition dashboardContainer>
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
      </ContainerLarge>
    );
  }
}

const FilteredList = ({ filters, specialists, projectId, handleMessage }) => {
  const industry_area_id = specialist =>
    filters.industry_area_id
      ? specialist.industry_area_id === filters.industry_area_id
      : true;

  const hourly_rate = specialist =>
    specialist.hourly_rate >= filters.hourly_rate.min &&
    specialist.hourly_rate <= filters.hourly_rate.max;

  const experience_level_id = specialist =>
    filters.experience_level_id
      ? specialist.experience_level_id === filters.experience_level_id
      : true;

  const project_type = specialist =>
    filters.project_type
      ? filters.project_type === specialist.project_type_id
      : true;

  return (
    <Grid>
      <Grid.Row columns={3}>
        {specialists
          .filter(hourly_rate)
          .filter(industry_area_id)
          .filter(experience_level_id)
          .filter(project_type)
          .map((specialist, key) => (
            <Grid.Column key={key}>
              <SpecialistCard
                key={key}
                specialist={specialist}
                projectId={projectId}
              />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = () => {
  const makeSpecialistId = getSpecialistId();

  return state => {
    const { searchResult, specialistData } = state;

    return {
      specialistId: makeSpecialistId(specialistData),
      searchResult
    };
  };
};

export default connect(mapStateToProps, {
  showSpecialistCustomTeams
})(SearchSpecialist);
