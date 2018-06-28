import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import {
  showSortedProjects,
  showAllProjects,
  showProjectWithId,
  showAllEpics,
  showEpicTasks,
  showClientData,
  showProjectTeam,
  showClientTeams,
  logOut
} from "../../actions/actions";
import HeaderBasic from "../layout/HeaderBasic";
import SubHeader from "../layout/ClientSubHeader";
import { S_MainContainer } from "../../styleComponents/layout/S_MainContainer";
import { Container } from "../../styleComponents/layout/Container";
import Dashboard from "../Dashboard";
import ClientProfile from "./ClientProfile";
import ClientCompany from "./ClientCompany";
import ClientBilling from "./ClientBilling";
import ClientAbout from "./pages/ClientAbout";
import ProjectsBoard from "../ProjectsBoard";
import SideBarLeft from "./../layout/SideBarLeft";
import SideBarRight from "../layout/SideBarRight";
import { projects, days } from "../../helpers/sidebarDbEmulate";
import ClientProjects from "./ClientProjects";
import ClientModule from "./ClientModule";
import Teams from "../Teams";
import ClientAccount from "./pages/ClientAccount";
import ClientYTD from "./pages/ClientYTD";
import ClientStatement from "./pages/ClientStatement";
import TheVillage from "../TheVillage";
import {
  getCookie,
  setCookie,
  getUserRole,
  createNotification
} from "../../helpers/functions";
import { PORT } from "../../constants/constants";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import EditProfile from "../profile/EditProfile";

const pagesToCalculate = ["profile", "company", "billing"];

class ClientDashboard extends Component {
  state = {
    profilePercent: null,
    companyPercent: null,
    billingPercent: null,
    rightSidebarOpened: !!getCookie("rightSidebarOpened") || false,
    isEdited: false,
    showRelog: true
  };

  componentDidMount() {
    this.props.showSortedProjects("customers");
    this.props.showClientData();
    this.props.showClientTeams();
    localStorage.removeItem("user_email");

    if (!this.props.specialistData) {
      let token = localStorage.getItem("jwt_token"),
        id = jwtDecode(token).id;

      if (id) {
        axios
          .get(`${PORT}/api/v1/customers/${id}`)
          .catch(error => this.props.history.push("/sign_in"));
      }
    }
  }

  collectPropfileData(data) {
    const {
      first_name,
      last_name,
      email,
      address,
      city,
      country,
      phone_number,
      description
    } = data;

    return {
      first_name,
      last_name,
      email,
      city: city || (address && address.city),
      country: country || (address && address.country),
      phone_number,
      description
    };
  }

  collectCompanyData(data) {
    const {
      name,
      city,
      abn_acn,
      tell_about,
      company_address,
      country,
      industry_area_id,
      industry,
      number_of_employers,
      segment,
      website,
      registered_name
    } = data ? data : {};

    return {
      abn_acn,
      name,
      company_address,
      city,
      country,
      industry: industry || industry_area_id,
      number_of_employers,
      segment,
      website,
      tell_about,
      registered_name
    };
  }

  collectBillingData(data) {
    const {
      billing_type,
      card_name,
      card_number,
      correspondent_bank,
      beneficiary_bank,
      beneficiary_name,
      iban,
      swift_code,
      purpose_of_payment,
      beneficiary_account
    } = data ? data : {};

    if (+billing_type === 1) {
      return {
        correspondent_bank,
        beneficiary_bank,
        beneficiary_name,
        iban,
        swift_code,
        purpose_of_payment,
        beneficiary_account
      };
    } else {
      return {
        card_name,
        card_number
      };
    }
  }

  calculatePagePercent = (percentName, data) => {
    if (!data) {
      return 0;
    }

    let fieldsCount = data && Object.keys(data).length;

    if (percentName && Object.keys(data).length > 0) {
      let filledFields = 0;

      for (let key in data) {
        if (data[key]) {
          switch (typeof data[key]) {
            case "number":
              filledFields++;
              break;
            case "object":
              Object.values(data[key]).length > 0 &&
                Object.values(data[key]).some(x => !!x) &&
                filledFields++;
              break;
            default:
              data[key].length > 0 && filledFields++;
          }
        }
      }

      let percents = Math.round(filledFields / fieldsCount * 100);
      percents = percents > 100 ? 100 : percents;

      this.setState({
        [percentName]: percents
      });
    } else {
      this.setState({
        [percentName]: null
      });
    }
  };

  calculatePercents() {
    const { clientData } = this.props;

    if (clientData) {
      const profileData = this.collectPropfileData(clientData);
      const companyData = this.collectCompanyData(clientData.company);
      const billingData = this.collectBillingData(clientData.billing);

      this.calculatePagePercent("profilePercent", profileData);
      this.calculatePagePercent("companyPercent", companyData);
      this.calculatePagePercent("billingPercent", billingData);
    }
  }

  toggleRightSidebar = e => {
    this.setState({
      rightSidebarOpened: !this.state.rightSidebarOpened
    });
    setCookie(
      "rightSidebarOpened",
      this.state.rightSidebarOpened ? "" : "open",
      1460
    );
  };

  render() {
    const {
      match,
      match: { params },
      clientTeams,
      changeUserType
    } = this.props;
    const { rightSidebarOpened, isEdited } = this.state;
    let page;

    if (params["page"] && params["page"] !== "projects") {
      page = params["page"];
    } else if (params["projectId"] && params["moduleId"] !== "new") {
      if (params["projectId"] === "new") {
        page = "projects";
      } else page = "board";
    } else if (params["projectNewModule"]) {
      page = "module";
    } else page = "root";

    let sidebarCondition =
      page !== "profile" && page !== "company" && page !== "billing";

    return (
      <div>
        <HeaderBasic match={match} page={sidebarCondition} />
        <S_MainContainer
          sidebarOpened={rightSidebarOpened}
          sidebarCondition={sidebarCondition}
        >
          {sidebarCondition ? (
            <Fragment>
              <SideBarLeft
                currentProject={
                  params["projectId"] || params["projectNewModule"]
                }
                currentEpic={params["moduleId"]}
              />
              {this.renderPage(page)}
              <SideBarRight
                teams={clientTeams}
                days={days}
                opened={rightSidebarOpened}
                toggle={this.toggleRightSidebar}
              />
            </Fragment>
          ) : (
            <Container
              sidebarCondition={sidebarCondition}
              transparentBackground={page === "root" ? true : false}
            >
              <SubHeader
                percents={this.state}
                sidebarCondition={sidebarCondition}
                isEdited={isEdited}
                user={changeUserType}
                page={page}
              />
              {this.renderPage(page)}
            </Container>
          )}
        </S_MainContainer>

        <NotificationContainer />
      </div>
    );
  }

  renderPage = page => {
    const { clientTeams } = this.props;

    switch (page) {
      case "profile":
        document.title = "Profile | Digital Village";
        return (
          <ClientProfile
            calculatePagePercent={this.calculatePagePercent}
            collectPropfileData={this.collectPropfileData}
          />
        );
      case "company":
        document.title = "Company | Digital Village";
        return (
          <ClientCompany
            calculatePagePercent={this.calculatePagePercent}
            collectCompanyData={this.collectCompanyData}
          />
        );
      case "billing":
        document.title = "Billing | Digital Village";
        return (
          <ClientBilling
            calculatePagePercent={this.calculatePagePercent}
            collectBillingData={this.collectBillingData}
          />
        );
      case "edit":
        document.title = "Edit profile | Digital Village";
        return <EditProfile />;
      case "about":
        document.title = "Your profile | Digital Village";
        return <ClientAbout />;
      case "projects":
        document.title = "Add Project | Digital Village";
        return <ClientProjects />;
      case "module":
        document.title = "Add Module | Digital Village";
        return (
          <ClientModule
            projectId={this.props.match.params["projectNewModule"]}
          />
        );
      case "board":
        return (
          <ProjectsBoard
            projectId={this.props.match.params["projectId"]}
            currentEpic={this.props.match.params["moduleId"] || "all"}
            history={this.props.history}
          />
        );
      case "teams":
        document.title = "Teams | Digital Village";
        return <Teams teams={clientTeams} />;
      case "account":
        document.title = "Billings | Digital Village";
        return <ClientAccount />;
      case "year_to_date":
        document.title = "YTD | Digital Village";
        return <ClientYTD />;
      case "statement":
        document.title = "Statement | Digital Village";
        return <ClientStatement />;
      case "the_village":
        document.title = "The Village | Digital Village";
        return <TheVillage />;
      case "root":
        document.title = "Dashboard | Digital Village";
        return (
          <Dashboard
            projects={this.props.allProjects}
            history={this.props.history}
          />
        );
      default:
        document.title = "Dashboard | Digital Village";
        return <Redirect to="/404" />;
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.clientData) {
      if (
        nextProps.clientData.email &&
        pagesToCalculate.some(page => page === nextProps.match.params["page"])
      ) {
        this.calculatePercents();
      }

      // if (this.state.showRelog && getUserRole() !== nextProps.clientData.role) {
      //   createNotification({
      //     type: "info",
      //     text: "Your role has been changed. Please relog"
      //   });
      //   this.setState({ showRelog: false });
      // }
    }

    let projectId =
      nextProps.match.params["projectId"] ||
      nextProps.match.params["projectNewModule"];

    if (projectId && projectId !== "new" && nextProps.projectWithId) {
      if (nextProps.projectWithId.id !== +projectId) {
        console.log("dsw");

        nextProps.showProjectWithId(projectId);
        nextProps.showAllEpics(projectId);
        nextProps.showProjectTeam(projectId);
      }
    } else if (projectId && projectId !== "new") {
      console.log("dsw2");
      nextProps.showProjectWithId(projectId);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allProjects: state.allProjects,
    projectWithId: state.projectWithId,
    clientTeams: state.clientTeams,
    changeUserType: state.changeUserType,
    signInReduce: state.signInReducer
  };
};

export default connect(mapStateToProps, {
  showClientData,
  showSortedProjects,
  showAllProjects,
  showProjectWithId,
  showAllEpics,
  showEpicTasks,
  showProjectTeam,
  showClientTeams,
  logOut
})(ClientDashboard);
