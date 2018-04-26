import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PORT } from '../../constans/constans';
import StyledDashboardCard from '../../styleComponents/StyledDashboardCard'
import ProgressBars from './ProgressBar';
import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

class RenderCard extends Component {

    renderProjectProgress = () => {
        const { data: { id, epics } } = this.props;

        let completedTasksCount = 0;
        epics && epics.forEach(epic =>
            epic.state === 'done' && completedTasksCount++
        );
        const percents = Math.round(completedTasksCount / epics.length * 100) || 0;

        return (
            <div className='progress'>
                <SubHeaderLinkWrap className='progressItem addModule' url={`/client/project/${id}/module`}>
                    <span className='progressDescription'>Add module</span>
                </SubHeaderLinkWrap>
                <div className='progressItem'>
                    <p className='progressCount'>0/{epics.length}</p>
                    <p className='progressDescription'>Modules</p>
                </div>
                <div className='progressItem'>
                    <p className='progressCount'>50/70</p>
                    <p className='progressDescription'>Tasks</p>
                </div>
                <div className='progressItem'>
                    <ProgressBars percents={25}/>
                    <p className='progressCount'>75%</p>
                    <p className='progressDescription'>Project progress</p>
                </div>
            </div>
        )
    }

    render () {
        const {
            type,
            village,
            data: {
                name,
                epics,
                team,
                projects,
                logo,
                //from mockup
                title,
                content,
                days,
                progress,
                subtitle,
            }
        } = this.props;

        let size, subtitleColor;
        
        switch(type) {
            case "project":
                size = {
                    col: 2,
                    row: 2,
                };
                break;
            default:
                size = this.props.data.size;
                break;
        }

        return (
            <StyledDashboardCard    
                size={size}
                type={type}
                village={village}>

                <div className="titleWrapper">
                    {type === 'project' && <img src={PORT + logo.url} alt={name}/>}
                    <div>
                        <p className='title'>{ title || name }</p>
                        {type !== 'tasks' && type !=='tasks_due' && <p className='subTitle'>{subtitle ? subtitle : `Module ${ epics.length }`}</p>}
                    </div>
                </div>
                { days &&
                    <div className='days'>
                    {days.map((item, index) => 
                        <RenderDays days={item} key={index}/>
                    )}
                    </div>
                }
                
                <div className='content'>
                    {content && content.map((item, index) =>
                        <div key={index}>
                            <p>{item.count}</p>
                            <p>{item.description}</p>
                        </div>
                    )}
                    {type === 'overview' && projects.map((project, key) => 
                        <div key={key}>
                            <p>{project.name}</p>
                            <progress value={(key + 1) * 20} max="100"/>
                        </div>
                    )}
                </div>

                <div className={`projectContainer ${type}`}>
                    <div className='team'>
                        {team && team.specialists && team.specialists.map((specialist, key) =>
                                <div className='person' key={key}>
                                    
                                </div>
                            )
                        }
                    </div>

                    {type === "project" && <div></div>}
                    {type === "project" && this.renderProjectProgress()}

                    {progress &&
                        <div className='progress'>
                        {progress.map((item, key) =>
                            <div className='progressItem' key={key}>
                                <p className='progressCount'>{item.count}</p>
                                <p className='progressDescription'>{item.description}</p>
                            </div>
                        )}
                        </div>
                    }
                </div>

            </StyledDashboardCard>
        )
    }
}

const RenderDays = ({ days }) => {
    return (
        <div className='day'>
            <p className='dayTitle'>{ days.day }</p>
            <div className='tasksContainer'>{ days.data.map((item, index) => {
                    return ( <RenderDayTasks day={item} key={index} /> )
                    })
                }
            </div>
        </div>
    )
}

const RenderDayTasks = ({ day }) => {
    return (
        <p className='taskDescription'>
            { day }
        </p>
    )
}

export default connect(
    ({}) => ({}),
    {}
)(RenderCard);
