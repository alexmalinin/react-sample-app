import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';
import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';
import AddTaskModal from '../modals/AddTaskModal';
import StyledSubHeaderLink from '../../styleComponents/StyledSubHeaderLink';
import ProgressBars from './ProgressBar';
import { Transition } from 'semantic-ui-react';


class ProjectSubHeader extends Component {

  render() {
    const { epics, currentEpic, createEpicTask, completedTasksCount, allTasksCount } = this.props;

    const currentEpicId = epics && currentEpic != 'all' && epics[currentEpic - 1]["id"];
    const percents = completedTasksCount / allTasksCount * 100;

    return (
      <StyledSubHeader profile='true'>
        <div>
          <SubHeaderLinkWrap content='All' url={`/client/project/${this.props.project}/module/all`} className='rightLink'>
            
          </SubHeaderLinkWrap>
          {epics && epics.map((epic, key) =>
            <SubHeaderLinkWrap key={key} content={key + 1} url={`/client/project/${this.props.project}/module/${key + 1}`} className='rightLink'>
              
            </SubHeaderLinkWrap>
          )}
          <SubHeaderLinkWrap content='' url={`/client/project/${this.props.project}/module`} className='rightLink addButt'>
            Add module
          </SubHeaderLinkWrap>
        </div>
        {/* {currentEpic != 'all' &&
          <div className="boardProgressBars">
            <AddTaskModal epic={currentEpic} createEpicTask={createEpicTask} currentEpicId={currentEpicId}/>
            <SubHeaderLinkWrap content='15/20' url='#' className='rightLink'>
              Tasks
              <ProgressBars percents={10}/>
            </SubHeaderLinkWrap>
            <SubHeaderLinkWrap content='75%' url='#' className='rightLink'>
              Module progress
              <ProgressBars percents={10}/>
            </SubHeaderLinkWrap>
          </div>
        } */}
        <Transition
          animation="fade"
          duration={400}
          visible={currentEpic != 'all'}
          className="boardProgressBars"
          >
          <div className="boardProgressBars">
            <AddTaskModal epic={currentEpic} createEpicTask={createEpicTask} currentEpicId={currentEpicId}/>
            <SubHeaderLinkWrap content={`${completedTasksCount}/${allTasksCount}`} url='#' className='rightLink'>
              Tasks
              <ProgressBars percents={percents}/>
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

export default ProjectSubHeader;