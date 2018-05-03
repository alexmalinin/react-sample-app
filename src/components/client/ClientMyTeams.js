import React, { Component } from "react";
import HeaderBasic from "../layout/HeaderBasic";
import SubHeader from "../layout/ClientSubHeader";
import { DvTitleSmall } from "../../styleComponents/layout/DvTitles";
import { Container } from "../../styleComponents/layout/Container";
import RenderProjectCard from "./renders/RenderProjectCard";
import StyledClientTeam from "../../styleComponents/StyledClientTeam";

class ClientProfile extends Component {
  render() {
    return (
      <StyledClientTeam>
        <HeaderBasic />
        <SubHeader />
        <Container indentTop indentBot relative>
          <div className="gag">
            <h4>
              Thank you for showing your<br /> interest, our Teams platform{" "}
              <br />will be coming soon.
            </h4>
          </div>
          <DvTitleSmall fz="28" indentNull xsCenter>
            My Teams
          </DvTitleSmall>
          <div className="flex-wrapper">
            <RenderProjectCard />
            <RenderProjectCard />
            <RenderProjectCard />
          </div>
        </Container>
      </StyledClientTeam>
    );
  }
}

export default ClientProfile;
