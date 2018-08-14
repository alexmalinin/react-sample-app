import React, { Component } from "react";
import Team from "./Team";

class Teams extends Component {
  componentWillMount() {
    if (!this.props.teams.loaded) {
    }
  }

  // removeTeam = team => {
  //   const { id, name, specialist_id } = team;

  //   this.props.showConfirmationModal({
  //     type: "delete",
  //     message: `Are you sure you want to delete ${
  //       name ? `${name} team?` : "this team?"
  //     }`,
  //     callback: () => {
  //       axios({
  //         method: "DELETE",
  //         url: `${PORT}/api/v1/teams/${id}/remove_team/${specialist_id}`,
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
  //         }
  //       })
  //         .then(res => {
  //           let name = res.data.name;

  //           createNotification({
  //             type: "success",
  //             text: `${name ? `${name} team ` : "Team"} was deleted`
  //           });

  //           this.showTeams();
  //         })
  //         .catch(error => {
  //           createNotification({
  //             type: "error"
  //           });

  //           console.error(error);
  //         });
  //     }
  //   });
  // };

  render() {
    const { teams } = this.props;
    if (teams.length === 0) {
      return (
        <div className="teams-placeholder">
          <p>No teams for now</p>
        </div>
      );
    }

    return Object.keys(teams).map(id => <Team key={id} team={teams[id]} />);
  }
}

export default Teams;
