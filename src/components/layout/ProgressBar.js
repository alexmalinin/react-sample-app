import React, { Component } from 'react';
import ProgressBar from 'progressbar.js';

class ProgressBars extends Component {

    renderBar () {
        this.bar = new ProgressBar.Circle(this.container, {
            strokeWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            color: '#fff',
            trailColor: '#eee',
            trailWidth: 1,
            svgStyle: {width: '100%', height: '100%'},
        });
    }

    setContainer = (container) => {
        this.container = container
    }

    componentDidMount() {
        this.renderBar()
    }

    componentWillReceiveProps(nextProps) {
        this.bar.animate(nextProps.percents / 100);
        if (nextProps.percents === 100) {
            this.bar.path.setAttribute('stroke', '#00ffc0')
        } else {
            this.bar.path.setAttribute('stroke', '#fff')
        }
    }

    render () {
        return (
            <div class="container" ref={this.setContainer}></div>
        )
    }
}

export default ProgressBars