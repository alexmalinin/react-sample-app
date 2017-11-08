import React, { Component } from 'react';
import {renderField} from '../../forms/renders/RenderField';
import { DvButton } from '../../../styleComponents/layout/DvButton'
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import RenderCustomSkills from '../renders/RenderCustomSkills';
import RenderChosenSpecialises from '../renders/RenderChosenSpecialises';
import { run } from '../../../helpers/scrollToElement';
import RenderEducationCard from './RenderEducationCard'
import RenderWorkCard from './RenderWorkCard'

class RenderCards extends Component {

    render() {
        const { educations, experiences } = this.props;
        return (
            <div className='flex-wrapper'>
                { educations
                    ? educations.map( (education, index) =>
                        <RenderEducationCard key={index} education={education}/>
                      )
                    : null
                }

                { experiences
                    ? experiences.map( (experiences, index) =>
                        <RenderWorkCard key={index} experiences={experiences}/>
                      )
                    : null
                }

            </div>
        )
    }

}


export default RenderCards
