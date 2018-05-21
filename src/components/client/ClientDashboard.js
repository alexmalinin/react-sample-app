import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  showAllProjects,
  showProjectWithId,
  showAllEpics,
  showEpicTasks,
  showClientData,
  showProjectTeam
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
import SideBarLeft from "./renders/SideBarLeft";
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
  checkObjectPropertiesForValues,
  getUserRole
} from "../../helpers/functions";

const mapPageNameToFieldsCount = {
  profilePercent: 7,
  companyPercent: 11,
  billingPercent: null
};

const pagesToCalculate = ["profile", "industry", "company", "billings"];

class ClientDashboard extends Component {
  constructor() {
    super();
    this.state = {
      profilePercent: null,
      companyPercent: null,
      billingPercent: null,
      rightSidebarOpened: !!getCookie("rightSidebarOpened") || false,
      isEdited: false
    };
    this.calculatePagePercent = this.calculatePagePercent.bind(this);
  }

  componentWillMount() {
    const {
      match: { params },
      projectWithId,
      showAllProjects,
      showProjectWithId,
      showClientData
    } = this.props;
    showAllProjects();
    showClientData();
    localStorage.removeItem("user_email");

    let projectId = params["projectId"] || params["projectNewModule"];

    if (projectId && projectId !== "new" && !projectWithId) {
      showProjectWithId(projectId);
    }
  }

  collectPropfileData() {
    const {
      first_name,
      last_name,
      email,
      address,
      phone_number
    } = this.props.clientData;
    const { city, country } = address ? address : {};
    const data = {
      first_name,
      last_name,
      email,
      city,
      country,
      phone_number,
      additionalField: "additionalField"
    };
    return data;
  }

  collectCompanyData() {
    const { company } = this.props.clientData;
    const {
      name,
      city,
      abn_acn,
      tell_about,
      register_name,
      company_address,
      country,
      industry_area_id,
      number_of_employers,
      segment,
      website
    } = company ? company : {};

    const data = {
      abn_acn,
      name,
      company_address,
      city,
      country,
      industry_area_id,
      number_of_employers,
      register_name,
      segment,
      website,
      tell_about,
      ololo: {}
    };
    return data;
  }

  collectBillingData() {
    const { customer_billing } = this.props.clientData;
    const {
      billing_type,
      account_number,
      password,
      card_name,
      card_number,
      expiry_date,
      ccv,
      account_details
    } = customer_billing ? customer_billing : {};

    if (billing_type === 0) {
      const data = {
        account_number,
        password
      };
      return data;
    }

    if (billing_type === 1) {
      const data = {
        card_name,
        card_number,
        expiry_date,
        ccv
      };
      return data;
    }

    if (billing_type === 2) {
      const data = {
        account_details
      };
      return data;
    }
  }

  calculatePagePercent(percentName, data) {
    if (!data) {
      return 0;
    }

    if (percentName === "billingPercent") {
      let fieldsCount = data.count;
      let mydata = data.data;

      if (!mydata) {
        return 0;
      }

      const keys = Object.keys(mydata);
      const filledFields = keys.filter(key => mydata[key]).length;

      let percents = Math.round(filledFields / fieldsCount * 100);
      percents = percents > 100 ? 100 : percents;

      this.setState({
        [percentName]: percents
      });
      return;
    }

    let fieldsCount = mapPageNameToFieldsCount[percentName];

    const keys = Object.keys(data);
    const filledFields = keys.filter(key => data[key]).length;

    let percents = Math.round(filledFields / fieldsCount * 100);
    percents = percents > 100 ? 100 : percents;

    this.setState({
      [percentName]: percents
    });
  }

  calculatePercents() {
    if (this.props.clientData) {
      const profileData = this.collectPropfileData();
      const companyData = this.collectCompanyData();
      const billingData = this.collectBillingData();

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
      match: { params },
      allTeams,
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
        <HeaderBasic match={this.props.match} page={sidebarCondition} />
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
                teams={allTeams}
                projects={projects}
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
      </div>
    );
  }

  renderPage = page => {
    switch (page) {
      case "profile":
        document.title = "Profile | Digital Village";
        return (
          <ClientProfile calculatePagePercent={this.calculatePagePercent} />
        );
      case "company":
        document.title = "Company | Digital Village";
        return (
          <ClientCompany
            calculatePagePercent={this.calculatePagePercent}
            handleFormValueChange={this.handleFormValueChange}
          />
        );
      case "billing":
        document.title = "Billing | Digital Village";
        return (
          <ClientBilling
            calculatePagePercent={this.calculatePagePercent}
            handleFormValueChange={this.handleFormValueChange}
          />
        );
      case "about":
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
        return <Teams teams={this.props.allTeams} />;
      case "account":
        return <ClientAccount />;
      case "year_to_date":
        return <ClientYTD />;
      case "statement":
        return <ClientStatement />;
      case "the_village":
        document.title = "The Village | Digital Village";
        return <TheVillage />;
      case "root":
        document.title = "Dashboard | Digital Village";
        return <Dashboard projects={this.props.allProjects} />;
      default:
        document.title = "Digital Village";
        return <ClientProfile />;
    }
  };

  handleFormValueChange = obj => {
    if (checkObjectPropertiesForValues(obj)) {
      this.setState({ isEdited: false });
    } else {
      this.setState({ isEdited: true });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.clientData) {
      if (
        nextProps.specialistData.email &&
        pagesToCalculate.some(page => page === nextProps.match.params["page"])
      ) {
        this.calculatePercents();
      }
      if (getUserRole() !== nextProps.clientData.role) {
        localStorage.clear();
        window.location.reload();
      }
    }

    let projectId =
      nextProps.match.params["projectId"] ||
      nextProps.match.params["projectNewModule"];

    if (projectId && projectId !== "new" && nextProps.projectWithId) {
      if (nextProps.projectWithId.id !== +projectId) {
        nextProps.showProjectWithId(projectId);
        nextProps.showAllEpics(projectId);
        nextProps.showProjectTeam(projectId);
      }
    } else if (projectId && projectId !== "new") {
      nextProps.showProjectWithId(projectId);
    }
  }
}

export default connect(
  ({ allProjects, projectWithId, allEpics, allTeams, changeUserType }) => ({
    allProjects,
    projectWithId,
    allEpics,
    allTeams,
    changeUserType
  }),
  {
    showClientData,
    showAllProjects,
    showProjectWithId,
    showAllEpics,
    showEpicTasks,
    showProjectTeam
  }
)(ClientDashboard);
