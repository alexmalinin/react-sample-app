import React from 'react';
import { Card } from 'semantic-ui-react'
import { StyledEducationCard } from '../../../styleComponents/StyledCard'


const RenderEducationCard = ({education}) => {

    return (
            <StyledEducationCard>
                { education &&
                    <Card.Content>
                        {education.name &&
                            <Card.Header>{education.name}</Card.Header>
                        }
                        { (education.specialisation || education.degree) &&
                            <Card.Meta> { education.specialisation } { education.degree }</Card.Meta>
                        }
                        {(education.from || education.to || education.description) &&

                            <Card.Description>
                                {education["started_at"] && education["finished_at"] &&
                                    <p className='period'>
                                        <img src='/images/time.png' alt=''/> {education.started_at} - {education["finished_at"]}
                                    </p>
                                }
                                { education.description &&
                                    <p>
                                        {education.description}
                                    </p>
                                }
                            </Card.Description>
                        }
                    </Card.Content>
                }
            </StyledEducationCard>
    )
};

export default RenderEducationCard;
