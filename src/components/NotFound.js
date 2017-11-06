import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideFooter } from '../actions/actions'

class NotFound extends Component {

    componentWillMount() {
        this.props.hideFooter()
    }

    render() {

        return(
            <div>
                Not Found
            </div>
            )

    }

    submit = values => {
        console.log('----values:',values);
    };
}

export default connect(null , { hideFooter })(NotFound)
