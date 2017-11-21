import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';

class SlideTogle extends Component {

    state = {
        height: this.props.height,
    };

    render() {

        const { children, rerender } = this.props;
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

    componentWillReceiveProps(nextProps) {
        if(nextProps.rerender) {
            this.hideHeight()
        }
    };

    hideHeight = () => {
        this.setState({
            height: 0,
        })
    };

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