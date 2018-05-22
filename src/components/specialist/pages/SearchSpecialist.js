import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ContainerLarge,
  Container
} from "../../../styleComponents/layout/Container";
import DashboardSubHeader from "../../layout/DashboardSubHeader";
import SearchFilterForm from "../../client/forms/SearchFilterForm";
import { showAllSpecialists } from "../../../actions/actions";

class SearchSpecialist extends Component {
  state = {
    filters: {}
  };

  componentWillMount() {
    this.props.showAllSpecialists("passive", "active", "core", "red_guy");
  }

  handleChange = (event, data) => {
    this.setState({
      filters: {
        [data.name]: data.value
      }
    });
  };

  clearFilters = () => {
    this.setState({
      filters: {}
    });
  };

  render() {
    const { allSpecialists } = this.props;
    const { filters } = this.state;
    console.log(filters);

    return (
      <ContainerLarge indentTop>
        <DashboardSubHeader />
        <Container fluid indentTopXs sidebarCondition>
          <SearchFilterForm
            handleChange={this.handleChange}
            clearFilters={this.clearFilters}
          />
        </Container>
        <Container sidebarCondition dashboardContainer>
          {allSpecialists &&
            allSpecialists
              .filter(specialist => {
                Object.keys(filters).forEach(filter => {
                  console.log(specialist[filter], filters[filter]);
                });
                return true;
              })
              .map(
                specialist =>
                  specialist.first_name + " " + specialist.last_name + "  "
              )}
        </Container>
      </ContainerLarge>
    );
  }
}

export default connect(({ allSpecialists }) => ({ allSpecialists }), {
  showAllSpecialists
})(SearchSpecialist);
