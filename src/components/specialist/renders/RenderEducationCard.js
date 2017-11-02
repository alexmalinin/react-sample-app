import React from 'react';
import { Card } from 'semantic-ui-react'
import { StyledEducationCard } from '../../../styleComponents/StyledCard'


const RenderEducationCard = ({education}) => {

    return (
            <StyledEducationCard>
                { education &&
                    <Card.Content>
                        {education.school &&
                            <Card.Header>{education.school}</Card.Header>
                        }
                        { (education["area_of_study"] || education.degree) &&
                            <Card.Meta> { education["area_of_study"]} {education.degree}</Card.Meta>
                        }
                        {(education.from || education.to || education.description) &&

                            <Card.Description>
                                {education.from && education.to &&
                                    <p className='period'>
                                        <img src='/images/time.png' alt=''/> {education.from} - {education.to}
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
