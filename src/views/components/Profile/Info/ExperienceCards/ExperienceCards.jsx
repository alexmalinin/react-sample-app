import React, { Component } from "react";
import RenderEducationCard from "./RenderEducationCard";
// import RenderWorkCard from "./RenderWorkCard";
// import EdicationModal from "../../modals/EdicationModal";
// import WorkExperienceModal from "../../modals/WorkExperienceModal";

class ExperienceCards extends Component {
  state = {
    isEdited: false
  };

  componentDidUpdate() {
    this.addEventListener();
  }

  addEventListener() {
    let elements = document.querySelectorAll(".show-btn");

    for (var i = 0; i < elements.length; i++) {
      elements[i].onclick = function() {
        this.parentElement.classList.toggle("show");
        this.classList.toggle("rotate");
      };
    }
  }

  handleChangeState = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { educations, experiences } = this.props;

    return (
      <div className="cards-wrapper">
        {educations
          ? educations.map((education, index) => (
              <RenderEducationCard
                key={index}
                education={education}
                handleChangeState={this.handleChangeState}
              />
            ))
          : null}

        {/* {educations ? (
          <EdicationModal handleChangeState={this.handleChangeState} />
        ) : null} */}

        {/* {experiences
          ? experiences.map((experiences, index) => (
              <RenderWorkCard
                key={index}
                experiences={experiences}
                isEdited={this.state.isEdited}
                handleChangeState={this.handleChangeState}
              />
            ))
          : null}

        {experiences ? (
          <WorkExperienceModal handleChangeState={this.handleChangeState} />
        ) : null} */}
      </div>
    );
  }
}

export default ExperienceCards;
