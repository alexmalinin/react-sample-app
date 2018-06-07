import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  ContainerLarge,
  Container
} from "../../../styleComponents/layout/Container";
import DashboardSubHeader from "../../layout/DashboardSubHeader";
import SearchFilterForm from "../../client/forms/SearchFilterForm";
import SpecialistCard from "../../layout/SpecialistCard";
import {
  assignSpecialistToTeam,
  showCustomTeams
} from "../../../actions/actions";
import { Grid, Message } from "semantic-ui-react";
import { S_Message } from "../../../styleComponents/layout/S_Message";

class SearchSpecialist extends Component {
  state = {
    filters: {
      hourly_rate: {
        min: 0,
        max: 100
      }
    },
    selectedProject: null,
    renderMessage: false,
    renderErrorMessage: false
  };

  componentWillMount() {
    this.props.showCustomTeams();
    // this.props.showAllSpecialists("passive", "active", "core", "red_guy");
  }

  handleMessage = (name, value) => {
    this.setState({
      [name]: value
    });
  };

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
    const {
      filters,
      selectedProject,
      renderMessage,
      renderErrorMessage
    } = this.state;

    return (
      <Fragment>
        <ContainerLarge indentTop>
          {/* <DashboardSubHeader /> */}
          <Container fluid indentTopXs sidebarCondition>
            <SearchFilterForm
              handleChange={this.handleChange}
              handleChangeProject={this.handleChangeProject}
              clearFilters={this.clearFilters}
              filters={filters}
            />
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
          </Container>
        </ContainerLarge>
        <S_Message positive profile="true" data-show={renderMessage}>
          <Message.Header>Success!</Message.Header>
          <p>Specialist was invited</p>
        </S_Message>
        <S_Message negative profile="true" data-show={renderErrorMessage}>
          <Message.Header>Error!</Message.Header>
          <p>Something went wrong, please try again</p>
        </S_Message>
      </Fragment>
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
                handleMessage={handleMessage}
              />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
};

export default connect(({ searchResult }) => ({ searchResult }), {
  showCustomTeams
})(SearchSpecialist);
