import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { StyledBar } from '../../../styleComponents/layout/SideBar';
import { PORT } from '../../../constans/constans';
import { Accordion } from 'semantic-ui-react';

class SideBarLeft extends Component {

    render() {
        let { allProjects } = this.props;
        console.log(allProjects)

        return(
            <StyledBar className="left" >
                <div className="title">
                    <h4>Projects</h4>
                </div>
                <div className="projects">
                    {allProjects && allProjects.map((project) => 
                        <NavLink className='projectLink' to={`/client/project/${project.id}/module/all`} key={project.id}>
                            {project.logo.url
                                ? <img src={PORT + project.logo.url} alt={project.name}/>
                                : <span className="projectUnLogo">{project.name[0]}</span>
                            }
                            <span className="projectName">{project.name}</span>
                        </NavLink>
                    )}
                    <NavLink className='addProject' to='/client/dashboard/projects'><span></span> Add project</NavLink>
                </div>
            </StyledBar>
        );
    }
}

export default connect(
    ({allProjects}) => ({allProjects}),
    {}
)(SideBarLeft);
