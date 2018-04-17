import React from 'react';
import { Dropdown, Transition } from 'semantic-ui-react';

class CustomCard extends React.Component {

    render() {
        const { title, description, id, specialists } = this.props;

        return (
            <div className="dragItem" style={{backgroundColor: '#fff'}}>
                <h4 className="title">{title}</h4>
                <h4 className="platform">{description}&nbsp;</h4>
                <div className="bell-line">
                    <span className="bell"></span>
                </div>
                <div className="persons">
                    {specialists.map(()=>
                        <span className="person">
    
                        </span>
                    )}
                    <span className="addPerson">+
                        
                    </span>
                </div>
                <span className="ddtw">DDTW-{id}</span>
            </div>
        );
    }
}

export default CustomCard;
