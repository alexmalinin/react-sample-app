import React, { Component } from "react";
import RenderEducationCard from "./RenderEducationCard";
import RenderWorkCard from "./RenderWorkCard";
import EdicationModal from "../../modals/EdicationModal";
import WorkExperienceModal from "../../modals/WorkExperienceModal";

class RenderCards extends Component {
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

  render() {
    const { educations, experiences } = this.props;
    // let normalizedEducations = educations ? educations : []
    // // normalizedEducations.sort( (a,b) => {
    // //     let f = a.id;
    // //     let s = b.id;
    // //
    // //     if(f > s) {
    // //         return 1
    // //     } else {
    // //         return -1
    // //     }
    // //
    // // });

    return (
      <div className="cards-wrapper">
        {educations
          ? educations.map((education, index) => (
              <RenderEducationCard key={index} education={education} />
            ))
          : null}

        {educations ? <EdicationModal /> : null}

        {experiences
          ? experiences.map((experiences, index) => (
              <RenderWorkCard key={index} experiences={experiences} />
            ))
          : null}

        {experiences ? <WorkExperienceModal /> : null}
      </div>
    );
  }
}

export default RenderCards;
