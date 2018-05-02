import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';
import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';
import AddTaskModal from '../modals/AddTaskModal';
import StyledSubHeaderLink from '../../styleComponents/StyledSubHeaderLink';
import ProgressBars from './ProgressBar';
import { Transition } from 'semantic-ui-react';
import { CLIENT } from '../../constans/constans';


class ProjectSubHeader extends Component {

  render() {
    const { epics, currentEpic, createEpicTask, epicTasks, epicId, changeUserType } = this.props;

    const allTasksCount = epicTasks && epicTasks.length;
    let completedTasksCount = 0;
    epicTasks && epicTasks.forEach(task =>
      task.state === 'done' && completedTasksCount++
    );
    const percents = Math.round(completedTasksCount / allTasksCount * 100) || 0;

    return (
      <StyledSubHeader sidebarCondition profile='true'>
        <div>
          <SubHeaderLinkWrap 
            content='All' 
            url={`/dashboard/project/${this.props.project}`} 
            className='allModules'/>

          {epics && epics.map((epic, key) => {
            let subheaderCompletedTasks = 0;
            epic.tasks.forEach(task => task.state === 'done' && subheaderCompletedTasks++);
            return (
              <SubHeaderLinkWrap 
                key={key} 
                content={key + 1} 
                url={`/dashboard/project/${this.props.project}/module/${key + 1}`} 
                className='module'>
                <ProgressBars percents={subheaderCompletedTasks / epic.tasks.length * 100}/>
              </SubHeaderLinkWrap>
            )
          })}
          {changeUserType === CLIENT && 
          <SubHeaderLinkWrap 
            content='' 
            url={`/dashboard/project/${this.props.project}/module/new`} 
            className='addButt'>
            Add module
          </SubHeaderLinkWrap>}
        </div>
        <Transition
          animation="fade"
          duration={400}
          visible={currentEpic != 'all'}
          className="boardProgressBars">
          <div className="boardProgressBars">
            {changeUserType === CLIENT && 
            <AddTaskModal 
              epic={currentEpic} 
              createEpicTask={createEpicTask} 
              currentEpicId={epicId}/>}
            <SubHeaderLinkWrap 
              content={`${completedTasksCount}/${allTasksCount}`} 
              url='#' 
              className='rightLink'>
              Tasks
            </SubHeaderLinkWrap>
            <SubHeaderLinkWrap content={`${percents}%`} url='#' className='rightLink'>
              Module progress
              <ProgressBars percents={percents}/>
            </SubHeaderLinkWrap>
          </div>
        </Transition>
      </StyledSubHeader>
    )
  }
}

export default connect(
  ({updateTask, changeUserType}) => ({updateTask, changeUserType}),
  null
)(ProjectSubHeader);
