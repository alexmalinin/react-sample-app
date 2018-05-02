import React, { Component } from "react";
import { connect } from "react-redux";
import { DvButton } from "../../../styleComponents/layout/DvButton";
import RenderCustomSkills from "./RenderCustomSkills";
import RenderChosenSpecialises from "./RenderChosenSpecialises";
import { run } from "../../../helpers/scrollToElement";
import { showChosenSkills } from "../../../actions/actions";

class SpecialistWelcomeResult1 extends Component {
  componentWillMount() {
    this.props.showChosenSkills();
  }

  render() {
    let { chosenSkills = [] } = this.props;
    console.log(chosenSkills);
    let allSkills = chosenSkills.skills || [];
    let allSpecialities = chosenSkills.specialities;
    let { industry_title } = chosenSkills;
    let { specialities = [] } = chosenSkills;
    let industry_area = specialities[0]
      ? specialities[0]["industry_area"]["name"]
      : null;

    return (
      <div>
        <RenderChosenSpecialises
          specialities={allSpecialities}
          title={industry_title}
          area={industry_area}
        />
        {allSkills.length > 0 && <RenderCustomSkills skills={allSkills} />}

        <DvButton content="CONTINUE" primary onClick={this.scroll} />
      </div>
    );
  }

  scroll = ev => {
    run(ev.target, false, "bottom")();
  };
}

export default connect(({ chosenSkills }) => ({ chosenSkills }), {
  showChosenSkills
})(SpecialistWelcomeResult1);
