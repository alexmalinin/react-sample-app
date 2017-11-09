import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';

class SlideTogle extends Component {

    state = {
        height: this.props.height,
    };

    render() {

        const { children } = this.props;
        let { height } = this.state;
        let [title, ...rest] = children;
        let childs = [...rest];

        return (
            <div>
                <div onClick={this.handleHeight}>{title}</div>
                <AnimateHeight
                    duration={500}
                    height={height}
                >
                    {childs}
                </AnimateHeight>
            </div>
        )
    }

    handleHeight = ev => {
        let { height } = this.state;

        height === 'auto'
            ? this.setState({
                 height: 0,
              })
            : this.setState({
                height: 'auto',
              });
    }
}

export default SlideTogle;