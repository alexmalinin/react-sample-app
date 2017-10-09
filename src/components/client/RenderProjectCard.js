import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import StyledProjectCard from '../../styleComponents/StyledProjectCard';

class RenderProjectCard extends Component {

    render() {
        return (
            <StyledProjectCard>
                <div className='card-content'>
                    <h2>Project Name</h2>

                    <span className='sub-category'>
                        Sub-Category, Sub-Category, Sub-Category, Sub-Category, Sub-Category,
                    </span>

                    <p className='card-description'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dicta dolorum esse eum
                        laudantium
                        natus nobis! Ab aspernatur aut consectetur dolorem exercitationem facere maiores optio quasi
                        quibusdam rem, sequi vel.
                    </p>

                    <div className='estimate'>
                        <span><img src="/images/location.png" alt=""/><b>Remote</b></span>
                        <span><img src="/images/time.png" alt=""/><b>24/02/2017</b></span>
                    </div>
                    <p>
                        Budget: <b>$20,000</b>
                    </p>

                    <p>
                        Estimated length of contract: <b>7 weeks</b>
                    </p>
                </div>
                <Button.Group attached='bottom'>
                    <Button className='blue'>Edit</Button>
                    <Button>Delete</Button>
                </Button.Group>
            </StyledProjectCard>
        )
    }
}

export default RenderProjectCard;
