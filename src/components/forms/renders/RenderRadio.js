import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Popup} from 'semantic-ui-react'

class RenderRadio extends Component {

    state = {
        valuePerson: 'Individual'
    };

    render() {
        const {valuePerson} = this.state;
        const {input, label} = this.props;

        return (
            <div className="radio-group">
                {label === 'Agency' ?
                    <Popup
                        trigger={
                            <label>

                                <input className="ownInput"
                                       type="radio"
                                       {...input}
                                       name='person'
                                       value={valuePerson}

                                />
                                <span onClick={this.handleClick} className={`ownRadio`}>{label}</span>
                            </label>
                        }
                        position='right center'
                        on='change'
                    >
                        Will coming soon
                    </Popup> :
                    <label>

                        <input className="ownInput"
                               type="radio"
                               {...input}
                               name='person'
                               value={valuePerson}
                               ref={this.initRef(valuePerson)}

                        />
                        <span onClick={this.handleClick} className={`ownRadio`}>{label}</span>
                    </label>
                }

            </div>
        )
    }

    initRef = person => ref => {
        this.container = ref ? ref : null;
    };

    componentDidMount() {
        this.container ? this.container.click() : null;

    }

    handleClick = ev => {
        this.setState({
            valuePerson: ev.target.innerText
        })
    }
}

export default connect(({form}) => ({form}))(RenderRadio)
