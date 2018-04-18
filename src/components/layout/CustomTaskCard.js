import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Transition } from 'semantic-ui-react';
import { assignSpecialistToTask } from '../../actions/actions';

const options =  [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },]

class CustomCard extends React.Component {
    state = {
        showDropdown: false,
    }
    openDropdown = () => {
        this.setState({
            showDropdown: true,
        })
    }

    closeDropdown = () => {
        this.setState({
            showDropdown: false,
        })
    }

    assignSpeciaist = () => {

    }

    render() {
        const { title, description, id, specialists } = this.props;
        const { showDropdown } = this.state;

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
                    <a tabIndex="1" className="addPerson" onClick={this.openDropdown} onBlur={this.closeDropdown}>+</a>
                    <Dropdown className={showDropdown ? `visible` : ``} placeholder='Select Country' fluid search selection options={options}>
                    </Dropdown>
                </div>
                <span className="ddtw">DDTW-{id}</span>
            </div>
        );
    }
}

export default connect(
    ({assignSpeciaist}) => ({assignSpeciaist}),
    {assignSpecialistToTask}
)(CustomCard);
