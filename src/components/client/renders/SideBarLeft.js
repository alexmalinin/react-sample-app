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

                        <NavLink className='projectLink' to='board'>ABC</NavLink>
                        <NavLink className='projectLink' to='board'>XYZ</NavLink>
                        <NavLink className='addProject' to='projects'><span></span> Add project</NavLink>
                        
                        {/* <Accordion>
                            <Accordion.Title index={0}>
                                ABC
                            </Accordion.Title>
                            <Accordion.Content>
                                <ul>
                                    <li><a href="#">ABC content 1</a></li>
                                    <li><a href="#">ABC content 2</a></li>
                                    <li><a href="#">ABC content 3</a></li>
                                </ul>
                            </Accordion.Content>
                            <Accordion.Title index={1}>
                                XYZ
                            </Accordion.Title>
                            <Accordion.Content>
                                <ul>
                                    <li><a href="#">XYZ content 1</a></li>
                                    <li><a href="#">XYZ content 2</a></li>
                                    <li><a href="#">XYZ content 3</a></li>
                                </ul>
                            </Accordion.Content>
                        </Accordion> */}

                        {/* <Accordion>
                            {projects.map((project, index) => 
                                <div>
                                    <Accordion.Title index={index}>
                                        {project.name}
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <ul>
                                            {project.subpoints.map((value, index) => <li key={index}><a href='#'>{value}</a></li>)}
                                        </ul>
                                    </Accordion.Content>
                                </div>
                            )}
                        </Accordion> */}

                    </Accordion.Content>
                </Accordion>
            </StyledBar>
        );
    }
}
