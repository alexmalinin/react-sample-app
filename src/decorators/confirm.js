//HOC === Decorator
import React, { Component } from 'react'

export default (CustomComponent) => class DecoratedComponent extends Component {
    state = {
        confirm: false
    };

    confirmAccount = ev => {
        ev.preventDefault();
        this.setState({
            confirm: true,
        })
    };

    render() {
        return <CustomComponent {...this.props} {...this.state} confirmAccount={this.confirmAccount} />
    }
}