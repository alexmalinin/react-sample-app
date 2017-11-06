import React, { Component } from 'react';

class NotFound extends Component {

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

export default NotFound
