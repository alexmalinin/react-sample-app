import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';
import StyledModuleLink from '../../styleComponents/StyledModuleLink';


class ProjectSubHeader extends Component {

  render() {

    return (
      <StyledSubHeader projects>
        {this.props.module
          ? <div>
            <StyledModuleLink className="moduleBreadcrumb">
              <NavLink to="#">New module</NavLink>
            </StyledModuleLink>
            <StyledModuleLink className="moduleBreadcrumb">
              <NavLink to="board">Project XYZ</NavLink>
            </StyledModuleLink>
            <StyledModuleLink className="moduleBreadcrumb">
              <NavLink to="#">Root module</NavLink>
            </StyledModuleLink>
          </div>
          : <div></div>
        }
        <div>
          <SubHeaderLinkWrap url='#' className='rightLink arrow'>
            <span></span>
            Save
          </SubHeaderLinkWrap>

          <SubHeaderLinkWrap url='#' className='rightLink close'>
            Cancel
          </SubHeaderLinkWrap>
        </div>
      </StyledSubHeader>
    )
  }
}

export default ProjectSubHeader;
