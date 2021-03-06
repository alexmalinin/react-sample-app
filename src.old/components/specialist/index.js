import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { NotificationContainer } from "react-notifications";

import "react-notifications/lib/notifications.css";

import HeaderBasic from "../layout/HeaderBasic";
import SubHeader from "../layout/SpecialistsSubHeader";
import { S_MainContainer } from "../../styleComponents/layout/S_MainContainer";
import SideBarLeft from "../layout/SideBarLeft";
import SideBarRight from "../layout/SideBarRight";
import SpecialistsProfile from "./pages/SpecialistsProfile";
import SpecialistsCompany from "./pages/SpecialistsCompany";
import SpecialistIndustry from "./pages/SpecialistIndustry";
import EditProfile from "../profile/EditProfile";
import SpecialistsAbout from "../dashboard/pages/About";
import SpecialistsTest from "./pages/SpecialistsTest";
import SpecialistsMyBillings from "./pages/SpecialistsMyBillings";
import SpecialistAccount from "./pages/SpecialistAccount";
import SpecialistYTD from "./pages/SpecialistYTD";
import ClientProjects from "../client/ClientProjects";
import SpecialistStatement from "./pages/SpecialistStatement";
import TheVillage from "../TheVillage";
import { projects, days } from "../../helpers/sidebarDbEmulate";
import ProjectsBoard from "../ProjectsBoard";
import Dashboard from "../Dashboard";
import { Container } from "../../styleComponents/layout/Container";
import Teams from "../Teams";
import ClientModule from "../client/ClientModule";
import SearchSpecialist from "./pages/SearchSpecialist";
import NotFound from "../NotFound";
import SavingConfirmationModal from "../modals/SavingConfirmationModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import SubmitFormErrorModal from "../modals/SubmitFormErrorModal";

import {
  showSpecialistData,
  showSortedProjects,
  showProjectWithId,
  showProjectTeam,
  showAllEpics,
  showSpecialistTeams,
  showSpecialistProjects
} from "../../actions/actions";

import {
  getCookie,
  setCookie,
  getUserRole,
  oneOfRoles,
  createNotification
} from "../../helpers/functions";

import { PORT } from "../../constants/constants";
import { S_REDGUY, S_CORE, S_PASSIVE } from "../../constants/user";

const pagesToCalculate = ["info", "industry", "company", "billings"];

class SpecialistsDashboard extends Component {
  state = {
    profilePercent: null,
    industryPercent: null,
    companyPercent: null,
    billingPercent: null,
    rightSidebarOpened: !!getCookie("rightSidebarOpened") || false,
    showRelog: true
  };

  componentDidMount() {
    this.props.showSortedProjects("specialists");
    this.props.showSpecialistTeams();
    this.props.showSpecialistData();
    this.props.showSpecialistProjects();
    localStorage.removeItem("user_email");

    const {
      history: { location }
    } = this.props;

    let error = null;

    if (location.state && location.state.errors) {
      error = location.state && location.state.errors;
    }

    if (
      location.from &&
      location.from.state &&
      location.from.state.from &&
      location.from.state.from.state &&
      location.from.state.from.state.errors
    ) {
      error = location.from.state.from.state.errors;
    }

    if (error) {
      createNotification({
        type: "warning",
        text: error
      });
    }

    if (!this.props.specialistData) {
      const token = localStorage.getItem("jwt_token");
      let user_id;

      if (token) {
        user_id = jwtDecode(token).user_id;
      }

      if (user_id) {
        axios({
          method: "GET",
          url: `${PORT}/api/v1/specialists/${user_id}`,

          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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
      professional_experience_info
    } = data;

    return {
      first_name,
      last_name,
      email,
      city: city || (address && address.city),
      country: country || (address && address.country),
      phone_number,
      professional_experience_info
    };
  }

  collectIndustryData(data) {
    const {
      job_title,
      position,
      industry_title,
      communication_type,
      contact_number,
      hourly_rate,
      available,
      experience_level_id,
      industry_area_id,
      project_type,
      skills
    } = data;

    return {
      job_title,
      position,
      industry_title,
      experience_level_id,
      industry_area_id,
      contact_number,
      project_type,
      hourly_rate,
      available,
      skills,
      communication_type
    };
  }

  collectCompanyData(data) {
    const {
      name,
      city,
      company_address,
      country,
      industry_area_id,
      number_of_employers,
      segment,
      website
    } =
      data || {};

    return {
      name,
      city,
      company_address,
      country,
      industry_area_id,
      number_of_employers,
      segment,
      website
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
    } =
      data || {};

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
    }
    return {
      card_name,
      card_number
    };
  }

  calculatePagePercent = (percentName, data) => {
    const fieldsCount = data && Object.keys(data).length;

    if (percentName && Object.keys(data).length > 0) {
      let filledFields = 0;

      for (const key in data) {
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
    const { specialistData } = this.props;

    if (specialistData) {
      const profileData = this.collectPropfileData(specialistData);
      const industryData = this.collectIndustryData(specialistData);
      const companyData = this.collectCompanyData(specialistData.company);
      const billingData = this.collectBillingData(specialistData.billing);

      this.calculatePagePercent("profilePercent", profileData);
      this.calculatePagePercent("industryPercent", industryData);
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
      match: { params },
      specialistProjects,
      specialistTeams,
      confirmationModal
    } = this.props;

    const { rightSidebarOpened } = this.state;
    let page;

    const passive = getUserRole() === S_PASSIVE;
    const allowedPages = ["about"];

    if (passive) {
      if (params.page) {
        if (allowedPages.some(page => params.page === page)) {
          page = params.page;
        } else page = "forbidden";
      } else if (params.profilePage) {
        page = params.profilePage;
      } else page = "forbidden";
    } else if (params.page) {
      if (params.page === "search") {
        if (oneOfRoles(S_CORE, S_REDGUY)) {
          page = params.page;
        } else page = "forbidden";
      } else page = params.page;
    } else if (params.profilePage) {
      page = params.profilePage;
    } else if (params.projectId && params.projectId !== "info") {
      if (params.projectId === "new") {
        page = "projects";
      } else page = "board";
    } else if (params.projectNewModule && getUserRole() === S_REDGUY) {
      page = "module";
    } else if (params.specialistId) {
      page = "specialist";
    } else page = "dashboard";

    const sidebarCondition =
      page !== "info" &&
      page !== "industry" &&
      page !== "company" &&
      page !== "billings";

    return (
      <div>
        <HeaderBasic
          passive={passive}
          match={this.props.match}
          page={sidebarCondition}
        />
        <S_MainContainer
          sidebarOpened={rightSidebarOpened}
          sidebarCondition={sidebarCondition}
          passive={passive}
        >
          {sidebarCondition ? (
            <Fragment>
              {!passive && (
                <SideBarLeft
                  currentProject={params.projectId}
                  currentEpic={params.moduleId}
                  projects={specialistProjects}
                />
              )}
              {this.renderPage(page)}
              {!passive && (
                <SideBarRight
                  teams={specialistTeams}
                  projects={projects}
                  days={days}
                  opened={rightSidebarOpened}
                  toggle={this.toggleRightSidebar}
                />
              )}
            </Fragment>
          ) : (
            <Container sidebarCondition={sidebarCondition}>
              <SubHeader percents={this.state} page={page} />
              {this.renderPage(page)}
            </Container>
          )}
        </S_MainContainer>
        <NotificationContainer />

        {confirmationModal &&
          confirmationModal.type === "save" && (
            <SavingConfirmationModal isOpen formId={confirmationModal.formId} />
          )}

        {confirmationModal &&
          confirmationModal.type === "delete" && (
            <DeleteConfirmationModal
              isOpen
              message={confirmationModal.message}
              callback={confirmationModal.callback}
            />
          )}

        {this.props.submitErrorModal && <SubmitFormErrorModal isOpen />}
      </div>
    );
  }

  renderPage = page => {
    const {
      match: { params },
      specialistTeams,
      specialistProjects
    } = this.props;

    switch (page) {
      case "info":
        document.title = "Profile | Digital Village";
        return (
          <SpecialistsProfile
            calculatePagePercent={this.calculatePagePercent}
            collectPropfileData={this.collectPropfileData}
          />
        );
      case "industry":
        document.title = "Industry | Digital Village";
        return (
          <SpecialistIndustry
            calculatePagePercent={this.calculatePagePercent}
            collectIndustryData={this.collectIndustryData}
          />
        );
      case "company":
        document.title = "Company | Digital Village";
        return (
          <SpecialistsCompany
            calculatePagePercent={this.calculatePagePercent}
            collectCompanyData={this.collectCompanyData}
          />
        );
      case "billings":
        document.title = "Billings | Digital Village";
        return (
          <SpecialistsMyBillings
            calculatePagePercent={this.calculatePagePercent}
            collectBillingData={this.collectBillingData}
          />
        );
      case "projects":
        document.title = "Add Project | Digital Village";
        return <ClientProjects />;
      case "about":
        document.title = "Your profile | Digital Village";
        return <SpecialistsAbout />;
      case "board":
        return <ProjectsBoard />;
      case "teams":
        document.title = "Teams | Digital Village";
        return <Teams teams={specialistTeams} />;
      case "test":
        document.title = "Test | Digital Village";
        return <SpecialistsTest />;
      case "module":
        document.title = "Add module | Digital Village";
        return <ClientModule projectId={params.projectNewModule} />;
      case "account":
        document.title = "Billings | Digital Village";
        return <SpecialistAccount />;
      case "year_to_date":
        document.title = "YTD | Digital Village";
        return <SpecialistYTD />;
      case "statement":
        document.title = "Statement | Digital Village";
        return <SpecialistStatement />;
      case "the_village":
        document.title = "The village | Digital Village";
        return <TheVillage />;
      case "forbidden":
        return <NotFound />;
      case "search":
        if (oneOfRoles(S_CORE, S_REDGUY)) {
          document.title = "Search Specialist | Digital Village";
          return <SearchSpecialist />;
        }
        return <Redirect to="/404" />;
      case "specialist":
        return <SpecialistsAbout specialistId={params.specialistId} />;
      case "dashboard":
        document.title = "Dashboard | Digital Village";
        return <Dashboard projects={specialistProjects} />;
      default:
        return <Redirect to="/404" />;
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.specialistData) {
      if (
        nextProps.specialistData.email &&
        pagesToCalculate.some(page => page === nextProps.match.params.page)
      ) {
        this.calculatePercents();
      }

      if (
        this.state.showRelog &&
        getUserRole() !== nextProps.specialistData.role
      ) {
        createNotification({
          type: "info",
          text: "Your role has been changed. Please relog"
        });

        this.setState({ showRelog: false });
      }
    }

    const prevProjectId = this.props.match.params.projectId;
    const projectId = nextProps.match.params.projectId;

    if (projectId && projectId !== "new" && prevProjectId) {
      if (projectId !== prevProjectId) {
        nextProps.showProjectWithId(projectId);
        nextProps.showProjectTeam(projectId);
        nextProps.showAllEpics(projectId);
      }
    }
  }
}

const mapStateToProps = state => ({
  changeUserType: state.changeUserType,
  specialistData: state.specialistData,
  specialistProjects: state.specialistProjects,
  specialistTeams: state.specialistTeams,
  confirmationModal: state.confirmationModal,
  submitErrorModal: state.submitErrorModal
});

export default connect(mapStateToProps, {
  showSpecialistData,
  showSortedProjects,
  showProjectWithId,
  showProjectTeam,
  showAllEpics,
  showSpecialistTeams,
  showSpecialistProjects
})(SpecialistsDashboard);
