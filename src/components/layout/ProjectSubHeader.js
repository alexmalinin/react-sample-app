import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';


<<<<<<< e32ce54129c6540684de7c2698a8b31020a21e1e
class ProjectSubHeader extends Component {

  render() {

    return (
      <StyledSubHeader project>
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
=======
class AboutSubHeader extends Component {

    render() {

        return (
            <StyledSubHeader profile>
                <div>
                    <SubHeaderLinkWrap content='All' url='#' className='rightLink'>
                        &nbsp;
                    </SubHeaderLinkWrap>
                    <SubHeaderLinkWrap content='1' url='#' className='rightLink'>
                        &nbsp;
                    </SubHeaderLinkWrap>
                    <SubHeaderLinkWrap content='2' url='#' className='rightLink'>
                        &nbsp;
                    </SubHeaderLinkWrap>
                    <SubHeaderLinkWrap content='3' url='#' className='rightLink'>
                        &nbsp;
                    </SubHeaderLinkWrap>
                    <SubHeaderLinkWrap content='4' url='#' className='rightLink'>
                        &nbsp;
                    </SubHeaderLinkWrap>
                    <SubHeaderLinkWrap content='+' url='#' className='rightLink addButton'>
                        &nbsp;
                    </SubHeaderLinkWrap>
                </div>
                <div>
                    <SubHeaderLinkWrap content='+' url='#' className='rightLink addButton'>
                        Add new task
                    </SubHeaderLinkWrap>

                    <SubHeaderLinkWrap content='3/9' url='#' className='rightLink'>
                        Tasks
                    </SubHeaderLinkWrap> 

                    <SubHeaderLinkWrap content='5%' url='#' className='rightLink'>
                        Module progress
                    </SubHeaderLinkWrap>   
                </div>
            </StyledSubHeader>
        )
    }
}

export default AboutSubHeader;
>>>>>>> [feature] kanban project page
