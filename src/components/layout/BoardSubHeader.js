import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';


class ProjectSubHeader extends Component {

  render() {
    const { epics } = this.props;
    // console.log('epics', epics);

    return (
      <StyledSubHeader profile='true'>
        <div>
          <SubHeaderLinkWrap content='All' url='#' className='rightLink'>
            
          </SubHeaderLinkWrap>
          {epics && epics.map((epic, key) =>
            <SubHeaderLinkWrap key={key} content={key + 1} url='#' className='rightLink'>
            
            </SubHeaderLinkWrap>
          )}
          <SubHeaderLinkWrap content='' url={`/client/project/${this.props.project}/module`} className='rightLink addButt'>
            Add module
          </SubHeaderLinkWrap>
        </div>
        <div>
          <SubHeaderLinkWrap content='' url='#' className='rightLink addButt'>
            Add new task
          </SubHeaderLinkWrap>
          <SubHeaderLinkWrap content='15/20' url='#' className='rightLink'>
            Tasks
          </SubHeaderLinkWrap>
          <SubHeaderLinkWrap content='75%' url='#' className='rightLink'>
            Module progress
          </SubHeaderLinkWrap>
        </div>
      </StyledSubHeader>
    )
  }
}

export default ProjectSubHeader;