import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Tab } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import HeaderBasic from "../../layout/HeaderBasic";
import SubHeader from "../../layout/SpecialistsSubHeader";
import {
  Container,
  ContainerLarge
} from "../../../styleComponents/layout/Container";
import { S_MainContainer } from "../../../styleComponents/layout/S_MainContainer";
import {
  DvTitle,
  DvTitleSmall
} from "../../../styleComponents/layout/DvTitles";
import { StyledTabs } from "../../../styleComponents/StyledTabCard";
import SubscribeForm from "../../forms/SubscribeForm";
import StyledCheckbox from "../../../styleComponents/forms/StyledCheckbox";
import StyledProfile from "../../../styleComponents/StyledProfile";
import RenderTabCard from "../renders/RenderTabCard";
import {
  showSpecialistData,
  getExperienceLevels
} from "../../../actions/actions";
import { IMAGE_PORT } from "../../../constans/constans";
import AboutSubHeader from "../../layout/SpecialistAboutSubHeader";

class SpecialistsAbout extends Component {
  // state = {
  //     rerender: false,
  // };

  componentWillMount() {
    this.props.getExperienceLevels();
    this.props.showSpecialistData();
  }

  renderText = value => (value ? value : `Select`);

  hoursPerWeek = availability => {
    switch (availability) {
      case "Full Time":
        return "(40HRS/WK)";
      case "Part Time":
        return "(20HRS/WK)";
      case "Not available":
        return "";
    }
  };

  render() {
    const { specialistData, experienceLevels } = this.props;

    let allSkills = specialistData ? specialistData["skills"] : [];
    let educations_experience = specialistData
      ? specialistData["educations"]
      : [];
    let work_experience = specialistData
      ? specialistData["work_experiences"]
      : [];
    let { avatar } = specialistData || false;

    return (
      <ContainerLarge>
        <AboutSubHeader />
        <Container indentBot sidebarCondition>
          <StyledProfile>
            <Grid>
              <SectionHeader page="profile" />
              <Grid.Row className="main-info">
                <Grid.Column computer={8} textAlign="right">
                  <div className="profile-image">
                    <div className="image-wrapper">
                      <img
                        src={
                          avatar && avatar.url
                            ? IMAGE_PORT + avatar.url
                            : "/images/undefUser.png"
                        }
                        alt="avatar"
                      />
                      {/* <img src='/images/undefUser.png' alt='avatar'/> */}
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column computer="8" textAlign="left">
                  <div className="profile-info">
                    <h3>
                      {specialistData
                        ? specialistData["first_name"] || "No name"
                        : null}{" "}
                      &nbsp;
                      {specialistData
                        ? specialistData["last_name"] || "No last name"
                        : null}
                    </h3>
                    <span>
                      {specialistData
                        ? specialistData["industry_title"] || "No title"
                        : null}
                    </span>
                    <span>
                      {specialistData
                        ? specialistData["email"] || "No email"
                        : null}
                    </span>
                    <span>
                      {specialistData
                        ? specialistData["phone_code"] +
                            " " +
                            specialistData["phone_number"] || "No phone number"
                        : null}
                    </span>
                  </div>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader content="Services" page="industry" />
              <Grid.Row className="services">
                <Grid.Column computer={16}>
                  <h3>
                    {specialistData
                      ? specialistData["job_title"] || "No job title"
                      : null}
                  </h3>
                </Grid.Column>
                <Grid.Column computer={8} verticalAlign="middle">
                  <span>
                    ${specialistData
                      ? specialistData["hourly_rate"] || "0"
                      : null}/hr
                  </span>
                  <br />
                  <span>
                    {specialistData
                      ? specialistData["available"] || "Availability"
                      : null}&nbsp;
                    {specialistData
                      ? this.hoursPerWeek(specialistData["available"])
                      : null}
                  </span>
                  <br />
                  <span>
                    <img src="../../../../images/location.png" alt="marker" />
                    {specialistData
                      ? specialistData["address"]
                        ? specialistData["address"]["city"]
                        : "No city"
                      : null}, &nbsp;
                    {specialistData
                      ? specialistData["address"]
                        ? specialistData["address"]["country"]
                        : "No country"
                      : null}
                  </span>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>Industry area</span>
                  <h3>
                    {specialistData
                      ? specialistData["specialities"][0]
                        ? specialistData["specialities"][0]["industry_area"][
                            "name"
                          ]
                        : "No industry"
                      : null}
                  </h3>
                  <span>Experience level</span>
                  <h3>
                    {experienceLevels && specialistData
                      ? experienceLevels[specialistData.experience_level_id - 1]
                        ? experienceLevels[
                            specialistData.experience_level_id - 1
                          ]["label"]
                        : "No  exp lvl"
                      : null}
                  </h3>
                </Grid.Column>
                <Grid.Column computer={4}>
                  <span>Project interests</span>
                  <h3>
                    {specialistData
                      ? this.renderText(specialistData["project_interest"])
                      : null}
                  </h3>
                  <span>Speciality within that niche</span>
                  <h3 className="niche">
                    {specialistData
                      ? specialistData["specialities"].map((item, key) => (
                          <span key={key}>{item.name}</span>
                        ))
                      : null}
                  </h3>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader content="Skills" page="industry" />
              <Grid.Row className="skills">
                <Grid.Column computer={16}>
                  <div className="flex-wrapper">
                    {allSkills === []
                      ? allSkills.map(item => (
                          <StyledCheckbox key={item.name}>
                            <div>{item.name}</div>
                          </StyledCheckbox>
                        ))
                      : "No skills"}
                  </div>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader
                content="Work / Proffesional experience"
                page="profile"
              />
              <Grid.Row>
                <Grid.Column computer={8}>
                  {work_experience.length
                    ? work_experience.map((work, index) => (
                        <div key={index} className="card">
                          <p>
                            {work.started_at} - {work.finished_at}
                          </p>
                          <h3>{work.position}</h3>
                          <p>{work.name}</p>
                        </div>
                      ))
                    : "No work experience"}
                </Grid.Column>
                <Grid.Column computer={8}>
                  <p className="prof-exp">
                    {specialistData
                      ? specialistData["professional_experience_info"]
                        ? specialistData["professional_experience_info"]
                        : "No prof experience"
                      : null}
                  </p>
                </Grid.Column>
              </Grid.Row>

              <SectionHeader content="Education" page="profile" />
              <Grid.Row className="educations">
                <Grid.Column computer={16}>
                  {educations_experience.length
                    ? educations_experience.map((educations, index) => (
                        <div key={index} className="card">
                          <p>
                            {educations.started_at} - {educations.finished_at}
                          </p>
                          <h3>{educations.degree}</h3>
                          <p>{educations.name}</p>
                        </div>
                      ))
                    : "No educations"}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </StyledProfile>
        </Container>
      </ContainerLarge>
    );
  }

  // shouldComponentUpdate() {
  //     return true
  // }

  // componentWillReceiveProps(nextProps) {
  //     if (nextProps.specialistData) {
  //         console.log('----update')
  //         // this.showMessage()
  //     }
  // }
  //
  // showMessage = () => {
  //     this.setState({
  //         rerender: !this.state.rerender,
  //     });
  // };
}

function SectionHeader({ content, page }) {
  return (
    <Grid.Row className="section-header">
      <Grid.Column computer={6} textAlign="left" floated="left">
        <span className="title">{content}</span>
      </Grid.Column>
      <Grid.Column computer={2} textAlign="right" floated="right">
        <NavLink to={`/dashboard/${page}?edit`}>
          <Dots />
        </NavLink>
      </Grid.Column>
    </Grid.Row>
  );
}

function Dots() {
  return (
    <div className="dv-btn">
      <i className="fas fa-user-edit" />
    </div>
  );
}

export default connect(
  ({ specialistData, experienceLevels }) => ({
    specialistData,
    experienceLevels
  }),
  { showSpecialistData, getExperienceLevels }
)(SpecialistsAbout);
