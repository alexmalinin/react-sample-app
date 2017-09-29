// import React, {Component} from 'react';
// import {connect} from 'react-redux'
// import { Form, Radio } from 'semantic-ui-react'
//
// class RenderRadio extends Component {
//
//     state = {
//         person: ''
//     };
//
//     render() {
//         let {person} = this.state;
//         const { input, type, name, renderRadio, meta: { touched, error, warning }} = this.props;
//         let {onChange, onBlur, onFocus, onDragStart, onDrop} = input;
//
//         window.state = this.state;
//
//
//         return(
//             <div className="radio-group">
//                 {console.log(onBlur)}
//                 {console.log(input)}
//                     {renderRadio ? renderRadio.map((item, index) => <div key={index}><label onClick={this.handleClick} key={index} style={{width: '100%', display: 'block'}}><Radio
//                         key={index}
//                         // onChange={onChange}
//                         onBlur={onBlur}
//                         onDragStart={onDragStart}
//                         onDrop={onDrop}
//                         onFocus={onFocus}
//                         value={item.value}
//                         label={item.label}
//                         type={type}
//                         defaultChecked={index===0}
//                         name={item.name}
//                         // checked={item.value == person}
//                     /></label></div>) : null }
//
//                     {touched &&
//                     ((error &&
//                     <span>
//                     {error}
//                     </span>) ||
//                     (warning &&
//                     <span>
//                     {warning}
//                     </span>))}
//             </div>
//         )
//     }
//
//     handleClick = ev => {
//         // let userPerson;
//         // if (ev.target.querySelector('label')) {
//         //     console.log('init click');
//         //     userPerson = ev.target.querySelector('label').innerText;
//         //     console.log(userPerson);
//         //     console.log('/|>', this.state);
//         // }
//
//         // this.setState = ({
//         //     person: 'userPerson',
//         // })
//         let newValue
//         return newValue = 'lol'
//     }
// }
//
// export default connect(({form}) => ({form}))(RenderRadio)

// import React, {Component} from 'react';
// import {connect} from 'react-redux'
// import { Form, Radio } from 'semantic-ui-react'
//
// class RenderRadio extends Component {
//
//     state = {
//         value: "Specialist",
//     };
//     handleChange = (e, { value }) => {
//             this.props.input.onBlur(e);
//             this.setState({ value })
//     }
//
//     render() {
//         let {person} = this.state;
//         const { input, type, name, renderRadio, meta: { touched, error, warning }} = this.props;
//         let {onChange, onBlur, onFocus, onDragStart, onDrop} = input;
//
//         window.state = this.state;
//
//
//         return(
//             <div className="radio-group">
//                     <div>
//                         <Radio
//                             label='Specialist'
//                             name='radioGroup'
//                             value='Specialist'
//                             checked={this.state.value === 'Specialist'}
//                             onChange={this.handleChange}
//                             onBlur={onBlur}
//                         />
//                     </div>
//                     <div>
//                         <Radio
//                             label='Agency'
//                             name='radioGroup'
//                             value='Agency'
//                             checked={this.state.value === 'Agency'}
//                             onChange={this.handleChange}
//                             onBlur={onBlur}
//
//                         />
//                     </div>
//
//                     {touched &&
//                     ((error &&
//                     <span>
//                     {error}
//                     </span>) ||
//                     (warning &&
//                     <span>
//                     {warning}
//                     </span>))}
//             </div>
//         )
//     }
// }
//
// export default connect(({form}) => ({form}))(RenderRadio)

import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Popup} from 'semantic-ui-react'

class RenderRadio extends Component {

    state = {
        valuePerson: 'Individual'
    };

    render() {

        const {valuePerson} = this.state;

        const {input, type, label, checked, name, fieldValue, hasPerson, renderRadio, meta: {touched, error, warning}} = this.props;
        let {onChange, onBlur, onFocus, onDragStart, onDrop} = input;

        window.state = this.state;

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
