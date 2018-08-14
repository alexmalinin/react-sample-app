import { connect } from "react-redux";
import { teamsOperations } from "@ducks/teams";

import Teams from "./Teams";

const mapStateToProps = state => {
  return {
    user: state.user,
    teams: state.teamsReducer.teams,
    loaded: state.teamsReducer.loaded
  };
};

const mapDispatchToProps = {
  ...teamsOperations
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
