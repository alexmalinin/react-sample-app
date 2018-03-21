import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';


class ProjectSubHeader extends Component {

  render() {

    return (
      <StyledSubHeader profile>
        <div>
        </div>
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
