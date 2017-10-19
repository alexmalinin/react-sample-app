import React, { Component } from 'react';
import testProfileInfo from '../../../helpers/testProfileInfo';
import { RenderWorkCard } from '../../../styleComponents/StyledTabCard'

class RenderTabCard extends Component {

    state = {
        isOpen: false
    };

    render () {
        const { context } = this.props;
        const { isOpen } = this.state;

        let obj = context === 'work' ? testProfileInfo[0] : testProfileInfo[1];

        const color = {
            purple: '#8f1ae5',
            blue: '#1991fa',
        };

        return (
            <RenderWorkCard border={color.purple}>
                <div className='header-card'>
                    <h2>{ obj.position }</h2>
                    <span>{ obj.company }</span>
                    <p>
                        <img src='/images/time.png' alt=''/>
                        { obj.from } - { obj.to }: { obj.summary }
                    </p>
                </div>

                <div className='content-card'>
                    <h4>KEY ACHIEVEMENTS:</h4>
                    <p>
                        {obj.achievement}
                    </p>
                </div>

                <div className='action-card'>
                    <a onClick={ this.handleClick } className={ isOpen && 'active' }>
                        Show { isOpen ? 'less' : 'more' } details
                    </a>
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
