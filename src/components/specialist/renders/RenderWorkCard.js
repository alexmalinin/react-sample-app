import React from 'react';
import { Card } from 'semantic-ui-react'
import { StyledEducationCard } from '../../../styleComponents/StyledCard'


const RenderCard = () => (

    <StyledEducationCard>
        <Card.Content>
            <Card.Header>Digital Village Pty Ltd</Card.Header>
            <Card.Meta>Digital Designer / Hitachi Web design</Card.Meta>
            <Card.Description>
                <p className='location'>
                    <img src='/images/location.png' alt=''/> Sydney, Australia
                </p>

                <p className='period'>
                    <img src='/images/time.png' alt=''/> Jul 2009 - Jul 2012: 3 years
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </p>
            </Card.Description>
        </Card.Content>
    </StyledEducationCard>
);

export default RenderCard;
