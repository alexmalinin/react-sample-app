import React, { Component } from 'react';
import StyledDashboardCard from '../../styleComponents/StyledDashboardCard'

class RenderCard extends Component {
    render () {
        
        let {title, subtitle, days, progress, content, team, subtitleColor, background, size, backgroundImg, titleColor, type } = this.props.data;

        return (
            <StyledDashboardCard    subtitleColor={subtitleColor} 
                                    background={background} 
                                    size={size} 
                                    backgroundImg={backgroundImg} 
                                    titleColor={titleColor}
                                    type={type}
                                    village={this.props.village}
            >
                <p className='title'>{ title }</p>
                <p className='subTitle'>{ subtitle }</p>
                { days &&
                    <div className='days'>
                    {   days.map((item, index) => {
                            return ( <RenderDays days={item} key={index} /> )
                        })
                    }
                    </div>
                }

                { content &&
                    <div className='content'>
                    {   content.map((item, index) => {
                            return (
                                <div key={index}>
                                    <p>{item.count}</p>
                                    <p>{item.description}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                }

                <div className='projectContainer'>
                    { team ? 
                        <div className='team'>
                        {   team.map((item, index) => {
                                return (
                                    <div className='user' key={index}>
                                        
                                    </div>
                                )
                            })
                        }
                        </div> : <div></div>
                    }

                    { progress &&
                        <div className='progress'>
                        {   progress.map((item, index) => {
                                return (
                                    <div className='progressItem' key={index}>
                                        <p className='progressCount'>{item.count}</p>
                                        <p className='progressDescription'>{item.description}</p>
                                    </div>
                                )
                            })
                        }
                        </div>
                    }
                </div>

            </StyledDashboardCard>
        )
    }
}

const RenderDays = ({ days }) => {
    console.log(days, 'day card')
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
    console.log(day, 'day tasks')
    return (
        <p className='taskDescription'>
            { day }
        </p>
    )
}

export default RenderCard;