import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { StyledBar } from '../../../styleComponents/layout/SideBar';
import { Accordion } from 'semantic-ui-react';

export default class SideBarLeft extends Component {

    render() {
        let { projects } = this.props;

        return(
            <StyledBar className="left" >
                <Accordion activeIndex={0}>
                    <Accordion.Title index={0}>
                        Projects
                    </Accordion.Title>
                    <Accordion.Content>
                        {this.props.projects && this.props.projects.map((project) => 
                            <NavLink className='projectLink' to={`/client/project/${project.id}/module/all`} key={project.id}>
                                {project.name}
                            </NavLink>
                        )}
                        <NavLink className='addProject' to='/client/dashboard/projects'><span></span> Add project</NavLink>
                    </Accordion.Content>
                </Accordion>
            </StyledBar>
        );
    }
}
