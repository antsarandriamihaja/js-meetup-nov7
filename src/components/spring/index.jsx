import React, { Component } from 'react';
import { Motion, spring, presets } from 'react-motion';
import './index.css';
import Configurable from './configurable';

export default class SpringDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stiffness: 120,
            damping: 17
        };
    };

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    render() {
        const { open, stiffness, damping } = this.state;
        const box1Style = Object.assign({}, {
            transition: '0.5s linear',
            transform: `translateX(${open ? 600 : 0}px)`,
        });
        const box2Style = Object.assign({}, {
            transition: '0.5s ease-in',
            transform: `translateX(${open ? 600 : 0}px)`,
        });
        const box3Style = Object.assign({}, {
            transition: '0.5s ease-out',
            transform: `translateX(${open ? 600 : 0}px)`,
        });

        return (
        <div className="springDemo">
            <div className="comparison">
                <h1>Comparison:</h1>
                <button className="toggleBtn" onClick={this.handleToggle}>Toggle</button>
                <div className="box" style={box1Style}>1</div>
                <div className="box" style={box2Style}>2</div>
                <div className="box" style={box3Style}>3</div>
                <Motion
                    style = {{x: spring(open ? 600: 0, {stiffness, damping})}}
                >
                {({x}) => 
                <div className="box" style={
                    Object.assign({}, 
                    {transform: `translateX(${x}px)`})
                }>4</div>
                
            }
                </Motion>
            </div>
            <div className="spring">
                <Configurable/>
            </div>
        </div>
        )
    };
};