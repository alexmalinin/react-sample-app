import React from 'react';

const CustomCard = props => {
    return (
        <div className="dragItem" style={{backgroundColor: '#fff'}}>
            <h4 className="title">{props.title}</h4>
            <h4 className="platform" style={{color: `${props.descriptionColor}`}} >{props.description}&nbsp;</h4>
            <div className="bell-line">
                <span className="bell"></span>
            </div>
            <div className="persons">
                <span className="person"></span>
                <span className="person"></span>
                <span className="person"></span>
                <span className="addPerson">+</span>
            </div>
            <span className="ddtw">DDTW-{props.DDTW}</span>
        </div>
    );
}

export default CustomCard;
