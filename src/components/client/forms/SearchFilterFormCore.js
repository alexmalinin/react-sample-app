import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import StyledSearchFilter from "../../../styleComponents/layout/StyledSearchFilter";
import { Grid } from "semantic-ui-react";
import "react-input-range/lib/css/index.css";
import { searchSpecialist } from "../../../actions/actions";
import SearchForm from "./SearchForm";

class SearchFilterFormCore extends Component {
  componentWillMount() {
    this.props.searchSpecialist();
  }

  clear = () => {
    this.props.clearFilters();
  };

  render() {
    const { searchSpecialist } = this.props;

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

export default connect(({ searchResult }) => ({ searchResult }), {
  searchSpecialist
})(SearchFilterFormCore);
