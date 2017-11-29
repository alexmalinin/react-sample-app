import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import ReactDOM from 'react-dom';
import InfoForm from "./InfoForm";

class SpecialistWelcomeForm2 extends Component {

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <InfoForm signUp={true} {...this.props}/>
            </form>
        )
    }
}

const handleSubmitFail = (errors) => {
    console.log(errors);
    // if (!this.refs) {
    //     return;
    // }
    // const refsKeys = Object.keys(this.refs);
    // const keys = Object.keys(errors);
    // let key = null;
    // let matchfound = false;

    // refsKeys.filter(item => {
    //     if (keys.indexOf(item) > -1 && !matchfound) {
    //         key = item;
    //         matchfound = true;
    //         return false;
    //     } else { // eslint-disable-line no-else-return
    //         return true;
    //     }
    // });

    // this.targetNode = this.refs[key];

    // if (this.targetNode) {
    //     const node = ReactDOM.findDOMNode(this.targetNode);
    //     const parentNode = ReactDOM.findDOMNode(this);
    //     const xy = node.getBoundingClientRect();
    //     this.x = xy.right + window.scrollX;
    //     this.y = xy.top + window.scrollY - 60;
    //     parentNode && parentNode.scrollTo && parentNode.scrollTo(this.x, this.y) ||
    //     (parentNode && parentNode.scrollTop && (parentNode.scrollTop = this.y) ) ||
    //     window && window.scrollTo(this.x, this.y); // eslint-disable-line no-unused-expressions
    // }
}

export default reduxForm({
    form: 'SpecialistWelcomeForm2',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmitFail: handleSubmitFail,
})(
    connect(({educations, experiences, projectTypes}) => ({educations, experiences, projectTypes}))(SpecialistWelcomeForm2)
)
