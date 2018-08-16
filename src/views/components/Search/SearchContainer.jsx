import { connect } from "react-redux";

import Search from "./Search";
import { searchOperations } from "@ducks/search";

const mapStateToProps = () => {
  // const makeSpecialistId = getSpecialistId();

  return state => {
    const {
      searchReducer: { search }
    } = state;

    return {
      specialistId: state.user.id,
      searchResult: search
    };
  };
};

export default connect(mapStateToProps, {
  ...searchOperations
})(Search);
