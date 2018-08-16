import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Grid, Button, Dropdown, Popup } from "semantic-ui-react";
import InputRange from "react-input-range";

import StyledSearchFilter from "../StyledSearchFilter";

// import {
//   getIndustries,
//   getExperienceLevels,
//   getProjectTypes,
//   searchSpecialist,
//   searchSpecialistForProject,
//   showProjectWithId,
//   showSpecialistProjects
// } from "../../../actions/actions";

import { industryOperations } from "@ducks/industries";
import { experienceLevelOperations } from "@ducks/experienceLevels";
import { projectTypesOperations } from "@ducks/projectTypes";
import { searchOperations } from "@ducks/search";
import { projectsOperations } from "@ducks/projects";

import SearchForm from "./SearchForm";
import { renameObjPropNames } from "@views/utils/functions";

import "react-input-range/lib/css/index.css";

class SearchFilterForm extends Component {
  state = {
    loading: false,
    opened: false,
    projectError: false,
    range: {
      min: 0,
      max: 100
    }
  };

  componentWillMount() {
    this.props.getIndustries();
    this.props.getExperienceLevels();
    this.props.getProjectTypes();
    this.props.searchSpecialist();
    this.props.showAllProjects();
  }

  toggleFilters = () => {
    this.setState({
      opened: !this.state.opened
    });
  };

  toggleload = () => {
    this.setState({ loading: !this.state.loading });
  };

  clear = () => {
    this.setState({});
    this.props.clearFilters();
    this.setState({
      selectedProject: undefined,
      range: {
        min: 0,
        max: 100
      }
    });
  };

  handleRange = value => {
    this.setState({
      range: value
    });
  };

  changeProject = (e, data) => {
    this.setState({ selectedProject: data.value, projectError: false });
    this.props.searchSpecialistForProject(data.value);
    this.props.showProjectWithId(data.value);
    this.searchForm.handleClear();
    this.props.handleChangeProject(data.value);
  };

  toggleProjectError = () => {
    this.setState({ projectError: true });
  };

  render() {
    const {
      projects,
      industries,
      experienceLevels,
      projectTypes,
      handleChange,
      searchSpecialist,
      // projectWithId: { project, loaded },
      searchSpecialistForProject,
      filters: { industry_area_id, experience_level_id, project_type }
    } = this.props;

    const { opened, range, selectedProject, projectError } = this.state;

    industries &&
      industries.forEach(industry =>
        renameObjPropNames(industry, "label", "text")
      );

    experienceLevels &&
      experienceLevels.forEach(level =>
        renameObjPropNames(level, "label", "text")
      );

    projectTypes &&
      projectTypes.forEach(projectType =>
        renameObjPropNames(projectType, "label", "text")
      );

    return (
      <StyledSearchFilter className={opened ? "opened" : ""}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h1 className="pageTitle">Search</h1>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <SearchForm
              searchSpecialist={searchSpecialist}
              searchSpecialistForProject={searchSpecialistForProject}
              currentProject={this.state.project}
              toggleProjectError={this.toggleProjectError}
              clear={this.clear}
              ref={el => (this.searchForm = el)}
            />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column className="width-one-thrid">
              <h4 className="filterTitle">Project</h4>
              <Dropdown
                placeholder="Project"
                error={projectError}
                fluid
                selection
                options={projects}
                onChange={this.changeProject}
                onOpen={e => this.setState({ projectError: false })}
                selectOnBlur={false}
                value={selectedProject}
              />
            </Grid.Column>

            <Grid.Column className="width-two-thrids">
              <h4 className="filterTitle">
                Pay Rate / hr{" "}
                <span className="payRate">
                  ${range.min} - ${range.max}
                </span>
              </h4>
              <InputRange
                maxValue={500}
                minValue={0}
                value={range}
                onChange={this.handleRange}
                onChangeComplete={value =>
                  handleChange(null, {
                    name: "hourly_rate",
                    value
                  })
                }
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3} className="advancedFilter">
            <Grid.Column>
              <h4 className="filterTitle">Industry area</h4>
              <Dropdown
                name="industry_area_id"
                placeholder="Any industry"
                fluid
                search
                selectOnBlur={false}
                options={industries["industry"] || []}
                onChange={handleChange}
                value={industry_area_id}
                selection
              />
            </Grid.Column>

            <Grid.Column>
              <h4 className="filterTitle">Experience Level</h4>
              <Dropdown
                placeholder="Any level"
                name="experience_level_id"
                fluid
                search
                selectOnBlur={false}
                options={experienceLevels || []}
                onChange={handleChange}
                value={experience_level_id}
                selection
              />
            </Grid.Column>

            <Grid.Column>
              <h4 className="filterTitle">Project interests</h4>
              <Dropdown
                placeholder="Any interests"
                name="project_type"
                fluid
                search
                options={projectTypes || []}
                onChange={handleChange}
                value={project_type}
                selectOnBlur={false}
                selection
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3} className="advancedFilter">
            {/* {selectedProject &&
              loaded &&
              project.id === project &&
              project["skills"] && (
                <Grid.Column>
                  <h4 className="filterTitle">Skills</h4>
                  <div className="skillsWrapper">
                    {project["skills"].slice(0, 4).map((skill, key) => (
                      <div key={key} className="skill">
                        {skill.label}
                      </div>
                    ))}
                    {project["skills"].length === 0 && "No skills"}
                  </div>
                  {project["skills"].length > 4 && (
                    <Popup
                      on="click"
                      size="small"
                      trigger={<a className="allSkills">See all skills</a>}
                    >
                      <div className="skills">
                        {project["skills"]
                          // .slice(4)
                          .map((skill, key) => (
                            <span key={key}>{skill.label}&nbsp;</span>
                          ))}
                      </div>
                    </Popup>
                  )}
                </Grid.Column>
              )} */}
          </Grid.Row>
        </Grid>
        <Button className="filterTrigger" onClick={this.toggleFilters}>
          {opened ? "Standart filter" : "Advanced filter"}
        </Button>
      </StyledSearchFilter>
    );
  }
}

SearchFilterForm = reduxForm({
  form: "SearchFilterForm"
})(SearchFilterForm);

const mapStateToProps = ({
  projectsReducer: { projects },
  industriesReducer: { industries },
  experienceLevelsReducer: { experienceLevels },
  searchReducer: { search },
  projectTypesReducer: { projectTypes },
  projectWithId
}) => {
  let allProjects = [];
  projects &&
    Object.keys(projects).map(id =>
      allProjects.push({
        value: id,
        text: projects[id].name
      })
    );
  return {
    projects: allProjects,
    industries,
    experienceLevels,
    projectTypes,
    searchResult: search,
    projectWithId
  };
};

export default connect(mapStateToProps, {
  ...industryOperations,
  ...experienceLevelOperations,
  ...projectTypesOperations,
  ...searchOperations,
  showAllProjects: projectsOperations.showAllProjects
  // showProjectWithId,
})(SearchFilterForm);
