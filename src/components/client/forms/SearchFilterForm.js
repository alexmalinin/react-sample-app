import React, { Component } from "react";
import { reduxForm, change, reset } from "redux-form";
import { connect } from "react-redux";
import StyledSearchFilter from "../../../styleComponents/layout/StyledSearchFilter";
import { Grid, Button, Dropdown, Popup } from "semantic-ui-react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import {
  getIndustries,
  getExperienceLevels,
  getProjectTypes,
  searchSpecialist,
  searchSpecialistForProject,
  showProjectWithId
} from "../../../actions/actions";
import SearchForm from "./SearchForm";
import { renameObjPropNames } from "../../../helpers/functions";

class SearchFilterForm extends Component {
  state = {
    loading: false,
    opened: true,
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
      project: undefined,
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
    this.setState({ project: data.value, projectError: false });
    this.props.searchSpecialistForProject(data.value);
    this.props.showProjectWithId(data.value);
    this.searchForm.handleClear();
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
      projectWithId,
      searchSpecialistForProject,
      filters: { industry_area_id, experience_level_id, project_type }
    } = this.props;
    const { opened, range, project, projectError } = this.state;
    industries &&
      industries["industry"] &&
      industries["industry"].forEach(industry =>
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
                value={project}
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
                // multiple
                selectOnBlur={false}
                options={industries["industry"] || []}
                onChange={handleChange}
                value={industry_area_id}
                selection
              />
            </Grid.Column>

            {/* <Grid.Column>
              <h4 className="filterTitle">Speciality within that niche</h4>
              <Dropdown
                placeholder="Any speciality"
                name="specialities"
                fluid
                search
                // multiple
                selectOnBlur={false}
                options={industries["industry"] || []}
                selection
                onChange={handleChange}
                value={specialities}
              />
            </Grid.Column> */}

            <Grid.Column>
              <h4 className="filterTitle">Experience Level</h4>
              <Dropdown
                placeholder="Any level"
                name="experience_level_id"
                fluid
                search
                // multiple
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
            <Grid.Column />
            <Grid.Column>
              <h4 className="filterTitle">Rating</h4>
              <Checkboxes items={[5, 4, 3, 2, 1]} />
            </Grid.Column>

            {project &&
              projectWithId &&
              projectWithId.id === project &&
              projectWithId["skills"] && (
                <Grid.Column>
                  <h4 className="filterTitle">Skills</h4>
                  <div className="skillsWrapper">
                    {projectWithId["skills"].slice(0, 4).map((skill, key) => (
                      <div key={key} className="skill">
                        {skill.name}
                      </div>
                    ))}
                    {projectWithId["skills"].length > 4 && (
                      <Dropdown basic item text="See all skills" icon>
                        <Dropdown.Menu>
                          {projectWithId["skills"]
                            .slice(4)
                            .map((skill, key) => (
                              <Dropdown.Item key={key}>
                                {skill.name}
                              </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                    {projectWithId["skills"].length === 0 && "No skills"}
                  </div>
                </Grid.Column>
              )}
          </Grid.Row>
        </Grid>
        <Button className="filterTrigger" onClick={this.toggleFilters}>
          {opened ? "Standart filter" : "Advanced filter"}
        </Button>
      </StyledSearchFilter>
    );
  }
}

const Checkboxes = ({ items }) => {
  return (
    <div className="checkboxWrapper">
      {items.map((item, key) => (
        <label key={key}>
          <input type="checkbox" name="rating" />
          <div className="checkbox">
            <i className="fa fa-check" />
          </div>
          <div className="label">
            <span>{item}</span>
            <i className="fa fa-star" />
          </div>
        </label>
      ))}
    </div>
  );
};

SearchFilterForm = reduxForm({
  form: "SearchFilterForm"
})(SearchFilterForm);

const mapStateToProps = ({
  specialistProjects,
  industries,
  experienceLevels,
  searchResult,
  projectTypes,
  projectWithId
}) => {
  let projects = [];
  specialistProjects &&
    specialistProjects.map(project =>
      projects.push({
        value: project.id,
        text: project.name
      })
    );
  return {
    projects,
    industries,
    experienceLevels,
    projectTypes,
    searchResult,
    projectWithId
  };
};

export default connect(mapStateToProps, {
  getIndustries,
  getExperienceLevels,
  getProjectTypes,
  searchSpecialist,
  searchSpecialistForProject,
  showProjectWithId
})(SearchFilterForm);
