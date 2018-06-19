import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import StyledSearchFilter from "../../../styleComponents/layout/StyledSearchFilter";
import { Grid } from "semantic-ui-react";
import "react-input-range/lib/css/index.css";
import { searchSpecialist } from "../../../actions/actions";
import SearchForm from "./SearchForm";

class SearchFilterFormCore extends Component {
  state = {
    fetch: true
  };

  componentWillMount() {
    if (this.props.specialistData && this.state.fetch) {
      this.props.searchSpecialist(null, this.props.specialistData.id);
      this.setState({ fetch: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.specialistData && this.state.fetch) {
      this.props.searchSpecialist(null, nextProps.specialistData.id);
      this.setState({ fetch: false });
    }
  }

  clear = () => {
    this.props.clearFilters();
  };

  render() {
    const { searchSpecialist, specialistData } = this.props;

    return (
      <StyledSearchFilter>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h1 className="pageTitle">Search</h1>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <SearchForm
              searchSpecialist={searchSpecialist}
              specialistId={specialistData && specialistData.id}
              clear={this.clear}
              ref={el => (this.searchForm = el)}
            />
          </Grid.Row>
        </Grid>
      </StyledSearchFilter>
    );
  }
}

SearchFilterFormCore = reduxForm({
  form: "SearchFilterFormCore"
})(SearchFilterFormCore);

export default connect(
  ({ searchResult, specialistData }) => ({ searchResult, specialistData }),
  {
    searchSpecialist
  }
)(SearchFilterFormCore);
