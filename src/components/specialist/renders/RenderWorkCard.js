import React from 'react';
import { Card } from 'semantic-ui-react'
import { StyledEducationCard } from '../../../styleComponents/StyledCard'


const RenderCard = ({experiences}) => {
    console.log(experiences);
    return(
        <StyledEducationCard>
            { experiences &&
                <Card.Content>
                    {experiences.name && <Card.Header>{experiences.name}</Card.Header> }
                    {experiences.position && <Card.Meta>{experiences.position}</Card.Meta> }
                    <Card.Description>
                        {(experiences.country || experiences.city) &&
                            <p className='location'>
                                <img src='/images/location.png' alt=''/> {experiences.country}, {experiences.city}
                            </p>
                        }
                        {(experiences["started_at"] || experiences["finished_at"]) &&
                            <p className='period'>
                                <img src='/images/time.png' alt=''/> {experiences["started_at"]} - {experiences["finished_at"]}
                            </p>
                        }

                        {experiences.description &&
                            <p>
                                {experiences.description}
                            </p>
                        }
                    </Card.Description>
                </Card.Content>
            }
        </StyledEducationCard>
    )
};

export default RenderCard;
