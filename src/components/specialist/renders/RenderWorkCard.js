import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { StyledEducationCard } from "../../../styleComponents/StyledCard";
import EditingExperienceCard from "../../modals/EditingExperienceCard";
import DeletingExperienceCard from "../../modals/DeletingExperienceCard";

class RenderCard extends Component {
  state = {
    isExpanded: true
  };

  componentDidMount() {
    this.checkDescription(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkDescription(nextProps);
  }

  checkDescription(props) {
    const {
      experiences: { description }
    } = props;

    if (description) {
      if (description.length < 600) {
        this.setState({ isExpanded: false });
      } else {
        this.setState({ isExpanded: true });
      }
    } else {
      this.setState({ isExpanded: false });
    }
  }

  render() {
    const { experiences } = this.props;

    return (
      <StyledEducationCard expanded={this.state.isExpanded ? "true" : ""}>
        {experiences && (
          <Card.Content>
            <EditingExperienceCard
              experience={experiences}
              id={experiences["id"]}
            />
            <DeletingExperienceCard
              experience={experiences}
              id={experiences["id"]}
            />
            {experiences.name && <Card.Header>{experiences.name}</Card.Header>}
            {experiences.position && (
              <Card.Meta>{experiences.position}</Card.Meta>
            )}
            <Card.Description>
              {(experiences.country || experiences.city) && (
                <p className="location">
                  <img src="/images/location.png" alt="" />{" "}
                  {experiences.country}, {experiences.city}
                </p>
              )}
              {(experiences["started_at"] || experiences["finished_at"]) && (
                <p className="period">
                  <img src="/images/time.png" alt="" />{" "}
                  {experiences.started_at.value || experiences.started_at} -{" "}
                  {experiences.finished_at.value || experiences.finished_at}
                </p>
              )}

              {experiences.description && <p>{experiences.description}</p>}
            </Card.Description>
          </Card.Content>
        )}
        {this.state.isExpanded ? (
          <span className="show-btn fa fa-chevron-down" />
        ) : null}
      </StyledEducationCard>
    );
  }
}

export default RenderCard;
