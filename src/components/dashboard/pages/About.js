import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import {
  Container,
  ContainerLarge
} from "../../../styleComponents/layout/Container";
import StyledProfile from "../../../styleComponents/StyledProfile";
import AboutSubHeader from "../../layout/SpecialistAboutSubHeader";

import {
  showSpecialistData,
  getIndustries,
  showSpecialistWithId,
  getExperienceLevels
} from "../../../actions/actions";

import { IMAGE_PORT, BLANK_AVATAR } from "../../../constants/constants";

class About extends Component {
  componentDidMount() {
    const {
      specialistId,
      getIndustries,
      getExperienceLevels,
      showSpecialistData,
      showSpecialistWithId
    } = this.props;
  }

  render() {
    const {
      specialistWithId,
      experienceLevels,
      specialistData,
      industries,
      specialistId
    } = this.props;

    let specialist;
    let { avatar } = specialist || false;

    return (
      <ContainerLarge>
        <AboutSubHeader />
        <Container indentBot sidebarCondition transparent>
          <StyledProfile>
            <Grid centered>
              <Grid.Row>
                <Grid.Column computer={4}>
                  <div className="profile-aside">
                    <div className="profile-info">
                      <div className="profile-image">
                        <div className="image-wrapper">
                          <img
                            src={
                              avatar && avatar.url
                                ? IMAGE_PORT + avatar.url
                                : BLANK_AVATAR
                            }
                            alt="avatar"
                          />
                          {/* <img src='/images/undefUser.png' alt='avatar'/> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column computer={6}>
                  <div className="profile-main">
                    <div className="profile-info">
                      <div className="pfofile-title">title</div>
                      <div className="profile-content">content</div>
                    </div>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </StyledProfile>
        </Container>
      </ContainerLarge>
    );
  }
}

const mapStateToProps = state => {
  return {
    specialistWithId: state.specialistWithId,
    industries: state.industries,
    specialistData: state.specialistData,
    experienceLevels: state.experienceLevels
  };
};

export default connect(null, {
  showSpecialistData,
  getIndustries,
  showSpecialistWithId,
  getExperienceLevels
})(About);
