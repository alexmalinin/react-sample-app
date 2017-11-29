import React from 'react';
import { Card } from 'semantic-ui-react'
import { StyledEducationCard } from '../../../styleComponents/StyledCard'
import DeletingEducationCard from "../../modals/DeletingEducationCard";
import EditingEducationCard from "../../modals/EditingEducationCard";

const RenderEducationCard = ({education}) => {

    return (
            <StyledEducationCard>
                { education &&
                    <Card.Content>
                        <EditingEducationCard education={education} id={education["id"]}/>
                        <DeletingEducationCard education={education} id={education["id"]}/>
                        {education.name &&
                            <Card.Header>{education.name}</Card.Header>
                        }
                        { (education.specialisation || education.degree) &&
                            <Card.Meta> { education.specialisation } { education.degree }</Card.Meta>
                        }
                        {
                            <Card.Description>
                                { education["started_at"] && education["finished_at"] &&
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
