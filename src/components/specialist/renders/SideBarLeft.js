import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

import { StyledBar } from '../../../styleComponents/layout/SideBar';

import { PORT } from '../../../constans/constans';

class SideBarLeft extends Component {

    render() {
        let { currentProject, currentEpic, allProjects, allEpics } = this.props;

        return(
            <StyledBar className="left" >
                <div className="innerWrapper">
                    <div className="title">
                        <h4>Projects</h4>
                    </div>
                    <div className={`projects${currentProject ? ' opened' : ''}`}>
                        {allProjects && allProjects.map((project, key) => 
                            <div className="projectWrapper" key={key}>
                                <NavLink className={`projectLink${currentProject == project.id ? ' active': ''}`} to={`/client/project/${project.id}/module/all`} key={project.id}>
                                    {project.logo.url
                                        ? <img src={PORT + project.logo.url} alt={project.name}/>
                                        : <span className="projectNoLogo">{project.name[0]}</span>
                                    }
                                    <p className="projectName">{project.name}</p>
                                </NavLink>
                                {currentProject == project.id && <div className="modules">
                                    {allEpics && allEpics.length ? 
                                        allEpics.map((epic, key) => 
                                            <NavLink key={key} to={`${key + 1}`} className={currentEpic == key + 1 ? 'active': ''}>Module {key + 1}</NavLink>
                                        ):
                                        <p>No modules</p>
                                    }
                                </div>}
                            </div>
                        )}
                        <NavLink className='projectLink' to='/client/dashboard/projects'><span className='addProject'></span></NavLink>
                    </div>
                </div>
            </StyledBar>
        );
    }
}

export default connect(
    ({allProjects, allEpics}) => ({allProjects, allEpics}),
    {}
)(SideBarLeft);
