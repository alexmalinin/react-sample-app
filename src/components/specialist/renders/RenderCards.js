import React, { Component } from 'react';
import RenderField from '../../forms/renders/RenderField';
import RenderEducationCard from './RenderEducationCard';
import RenderWorkCard from './RenderWorkCard';

class RenderCards extends Component {

    render() {
        const { educations, experiences } = this.props;
        // let normalizedEducations = educations ? educations : []
        // // normalizedEducations.sort( (a,b) => {
        // //     let f = a.id;
        // //     let s = b.id;
        // //
        // //     if(f > s) {
        // //         return 1
        // //     } else {
        // //         return -1
        // //     }
        // //
        // // });

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


export default RenderCards;
