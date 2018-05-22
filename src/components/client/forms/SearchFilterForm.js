import React, { Component } from "react";
import { reduxForm, change, reset } from "redux-form";
import { connect } from "react-redux";
import StyledSearchFilter from "../../../styleComponents/layout/StyledSearchFilter";
import {
  Grid,
  Form,
  Input,
  Button,
  Transition,
  Dropdown
} from "semantic-ui-react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { getIndustries, getExperienceLevels } from "../../../actions/actions";
import { Field } from "react-redux-form";
import RenderSelect from "../../forms/renders/RenderSelect";
import { renameObjPropNames } from "../../../helpers/functions";

class SearchFilterForm extends Component {
  state = {
    loading: false,
    opened: true,
    range: {
      min: 155,
      max: 400
    }
  };

  componentWillMount() {
    this.props.getIndustries();
    this.props.getExperienceLevels();
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
  };

  handleRange = value => {
    this.setState({ range: value });
    this.props.handleChange(null, { name: "hourly_rate", value });
  };

  render() {
    const { projects, industries, experienceLevels, handleChange } = this.props;
    const { loading, opened, range } = this.state;
    industries &&
      industries["industry"] &&
      industries["industry"].forEach(industry =>
        renameObjPropNames(industry, "label", "text")
      );

    experienceLevels &&
      experienceLevels.forEach(level =>
        renameObjPropNames(level, "label", "text")
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
            <Grid.Column computer={14}>
              <Form>
                <Input
                  className="search"
                  placeholder="Search by keywords"
                  loading={loading}
                  icon="search"
                  iconPosition="left"
                  action="Search"
                  fluid
                />
              </Form>
            </Grid.Column>

            <Grid.Column computer={2}>
              <Button
                onClick={this.clear}
                role="button"
                className="clear"
                fluid
              >
                Clear filter
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column className="width-one-thrid">
              <h4 className="filterTitle">Project</h4>
              <Dropdown
                placeholder="Project"
                fluid
                selection
                options={projects}
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
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3} className="advancedFilter">
            <Grid.Column>
              <h4 className="filterTitle">Industry area</h4>
              <Dropdown
                name="industry_title"
                placeholder="Any industry"
                fluid
                search
                multiple
                options={industries["industry"] || []}
                onChange={handleChange}
                selection
              />
            </Grid.Column>

            <Grid.Column>
              <h4 className="filterTitle">Speciality within that niche</h4>
              <Dropdown
                placeholder="Any speciality"
                name="specialities"
                fluid
                search
                multiple
                options={industries["industry"] || []}
                selection
                onChange={handleChange}
              />
            </Grid.Column>

            <Grid.Column>
              <h4 className="filterTitle">Experience Level</h4>
              <Dropdown
                placeholder="Any level"
                name="experience_level_id"
                fluid
                search
                multiple
                options={experienceLevels || []}
                onChange={handleChange}
                selection
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3} className="advancedFilter">
            <Grid.Column>
              <h4 className="filterTitle">Project interests</h4>
              <Dropdown
                placeholder="Any level"
                name="project_type"
                fluid
                search
                options={industries["industry"] || []}
                onChange={handleChange}
                selection
              />
            </Grid.Column>

            <Grid.Column>
              <h4 className="filterTitle">Rating</h4>
              <Checkboxes items={[5, 4, 3, 2, 1]} />
            </Grid.Column>

            <Grid.Column>
              <h4 className="filterTitle">Skills</h4>
            </Grid.Column>
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

export default connect(
  ({ specialistProjects, industries, experienceLevels }) => {
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
      experienceLevels
    };
  },
  {
    getIndustries,
    getExperienceLevels
  }
)(SearchFilterForm);
