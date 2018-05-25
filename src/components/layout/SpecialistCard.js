import React, { Component } from "react";
import { connect } from "react-redux";
import StyledSpecialistCard from "../../styleComponents/StyledSpecialistCard";
import { Button, Popup } from "semantic-ui-react";
import { IMAGE_PORT } from "../../constans/constans";
import { assignSpecialistToTeam } from "../../actions/actions";

class SpecialistCard extends Component {
  render() {
    const {
      specialist: {
        id,
        avatar,
        first_name,
        last_name,
        industry_title,
        hourly_rate,
        skills,
        experience_level_id
      },
      assignSpecialistToTeam,
      projectWithId,
      experienceLevels
    } = this.props;

    return (
      <StyledSpecialistCard>
        <div className="row info">
          <img
            src={avatar.url ? IMAGE_PORT + avatar.url : "/images/uploadImg.png"}
            alt="member"
          />
          <div className="detailed">
            <p className="name">
              {first_name}&nbsp;{last_name}
            </p>
            <p className="title">
              {experienceLevels &&
                experienceLevels[experience_level_id - 1] &&
                experienceLevels[experience_level_id - 1].text}&nbsp;{
                industry_title
              }
            </p>
            <p>{hourly_rate || 0}$/ hr</p>
          </div>
        </div>
        <div className="row skills">
          <span>{skills.length > 0 ? "Skills" : "No skills"}</span>
          {skills.slice(0, 3).map((skill, key) => (
            <div key={key} className="skill">
              {skill.name}
            </div>
          ))}
          {skills.length > 3 && (
            <Popup
              trigger={<div className="skill all">+{skills.length - 3}</div>}
              position="bottom center"
              on="hover"
            >
              {skills.slice(3).map((skill, key) => (
                <div key={key} className="skill">
                  {skill.name}
                </div>
              ))}
            </Popup>
          )}
        </div>
        <div className="row buttons">
          <Button
            role="button"
            className="dv-blue"
            fluid
            // onClick={e =>
            //   assignSpecialistToTeam(
            //     projectWithId.id,
            //     projectWithId.team.id,
            //     id
            //   )
            // }
          >
            Add to team
          </Button>
          <Button role="button" className="dv-blue inverted" fluid>
            View profile
          </Button>
        </div>
        <div className="rating">
          <span>{Math.floor(Math.random() * (5 - 1) + 1)}</span>
          <i className="fa fa-star" />
        </div>
      </StyledSpecialistCard>
    );
  }
}

export default connect(
  ({ projectWithId, experienceLevels }) => ({
    projectWithId,
    experienceLevels
  }),
  {
    assignSpecialistToTeam
  }
)(SpecialistCard);
