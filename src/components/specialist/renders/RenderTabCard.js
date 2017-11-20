import React, { Component } from 'react';
import testProfileInfo from '../../../helpers/testProfileInfo';
import { RenderWorkCard } from '../../../styleComponents/StyledTabCard';
import SlideTogle from '../../SlideTogle';

class RenderTabCard extends Component {

    state = {
        isOpen: false
    };

    render () {
        const { context, work, education } = this.props;
        const { isOpen } = this.state;

        console.log(education);
        let data = context === 'work' ? work : education;
        console.log('data', data);

        const color = {
            purple: '#8f1ae5',
            blue: '#1991fa',
        };

        return (
            <RenderWorkCard border={color.purple}>
                { data ? <div>
                    <div className='header-card'>
                        <h2>{ data['position'] || education['specialisation'] }</h2>
                        <span>{ data.name }</span>
                        <p>
                            <img src='/images/time.png' alt=''/>
                            { data['started_at'] } -  { data['finished_at'] }
                        </p>
                    </div>

                    <div className='content-card'>
                        <h4>KEY ACHIEVEMENTS:</h4>
                        <p>
                            Smth {context} KEY ACHIEVEMENTS
                        </p>
                    </div>

                    <div className='action-card'>
                        <SlideTogle height={'0'}>
                            <a onClick={ this.handleClick } className={ isOpen && 'active' }>
                                Show { isOpen ? 'less' : 'more' } details
                            </a>
                            <div>
                                <p>
                                    <br/>
                                    { data.description}
                                </p>
                            </div>
                        </SlideTogle>

                    </div>
                </div>
                    : <div className='header-card' style={{textAlign: 'center'}}>
                        <h2>There are no data yet</h2>
                    </div>
                }
            </RenderWorkCard>
        )
    }

    handleClick = ev => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }
}

export default RenderTabCard;
