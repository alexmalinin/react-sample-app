import React, { Component } from 'react';
import {renderField} from '../../forms/renders/RenderField';
import RenderEducationCard from './RenderEducationCard'
import RenderWorkCard from './RenderWorkCard'

class RenderCards extends Component {

    render() {
        const { educations, experiences } = this.props;
        console.log('experiences', experiences);
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
