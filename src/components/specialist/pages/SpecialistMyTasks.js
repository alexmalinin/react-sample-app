import React, { Component } from "react";
import {
  ContainerLarge,
  Container
} from "../../../styleComponents/layout/Container";
import { connect } from "react-redux";
import MyTasksSubHeader from "../../layout/MyTasksSubheader";
import { Grid, Accordion } from "semantic-ui-react";
import { showSpecialistTasks } from "../../../actions/actions";
import CustomCard from "../../layout/CustomTaskCard";

class SpecialistMyTasks extends Component {
  state = {
    activeIndex: 0
  };

  componentWillMount() {
    this.props.showSpecialistTasks();
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { specialistProjects, specialistTasks } = this.props;
    const { activeIndex } = this.state;
    console.log(specialistTasks);

    return (
      <ContainerLarge>
        <MyTasksSubHeader />
        <Container dashboardContainer sidebarCondition indentTopXs>
          {/* <Grid>
            <Grid.Row>
              <Grid.Column>
              </Grid.Column>
            </Grid.Row>
          </Grid> */}
          <Accordion>
            {specialistProjects &&
              specialistProjects.map((project, key) => (
                <React.Fragment key={key}>
                  <Accordion.Title
                    active={activeIndex === key}
                    index={key}
                    onClick={this.handleClick}
                  >
                    {project.name}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === key}>
                    {specialistTasks &&
                      project.epics
                        .filter(epic =>
                          specialistTasks.some(task => task.epic_id === epic.id)
                        )
                        .map((epic, key) => (
                          <div>
                            <h2>{epic.name}</h2>
                            {specialistTasks
                              .filter(task => task.epic_id === epic.id)
                              .map((epic, key) => <CustomCard />)}
                          </div>
                        ))}
                  </Accordion.Content>
                </React.Fragment>
              ))}
          </Accordion>
        </Container>
      </ContainerLarge>
    );
  }
}

export default connect(
  ({ specialistProjects, specialistTasks }) => ({
    specialistProjects,
    specialistTasks
  }),
  {
    showSpecialistTasks
  }
)(SpecialistMyTasks);
