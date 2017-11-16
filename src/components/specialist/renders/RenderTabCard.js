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

        console.log('education', education)
        console.log('work', work)
        // let obj = context === 'work' ? testProfileInfo[0] : testProfileInfo[1];
        let data = context === 'work' ? work : education;

        const color = {
            purple: '#8f1ae5',
            blue: '#1991fa',
        };

        return (
            <RenderWorkCard border={color.purple}>
                <div className='header-card'>
                    <h2>{ work ? work[0].position : education ? education[0].specialisation : null }</h2>
                    <span>{ data ? data[0].name : null }</span>
                    <p>
                        <img src='/images/time.png' alt=''/>
                        { data ? data.startet_at : null } -  { data ? data.finished_at : null }
                    </p>
                </div>

                <div className='content-card'>
                    <h4>KEY ACHIEVEMENTS:</h4>
                    <p>
                        {/*{obj.achievement}*/}
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
                                { data ? data[0].description : null }
                            </p>
                        </div>
                    </SlideTogle>

                </div>
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
