import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';
import StyledModuleLink from '../../styleComponents/StyledModuleLink';
import StyledSubHeaderLink from '../../styleComponents/StyledSubHeaderLink';


class ProjectSubHeader extends Component {

  render() {
    let form = this.props.module ? 'ClientModuleForm' : 'ClientProjectForm';

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
          <button onClick={() => this.props.dispatch(submit(form))} className='saveBtn'>
            <StyledSubHeaderLink className='rightLink arrow'>
              <span></span>
            </StyledSubHeaderLink>
            Save
          </button>

          <SubHeaderLinkWrap url='/client/dashboard/root' className='rightLink close'>
            Cancel
          </SubHeaderLinkWrap>
        </div>
      </StyledSubHeader>
    )
  }
}

export default connect()(ProjectSubHeader);
