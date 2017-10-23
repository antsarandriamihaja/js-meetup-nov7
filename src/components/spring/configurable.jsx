import React from 'react';
import { Motion, spring } from 'react-motion';

export default class Configurable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stiffness: 120,
            damping: 17,
        };
    };

    handleChange(type, {target}) {
        let state = this.state;
        state[type] = parseInt(target.value);
        this.setState( state );
    };

    handleMouseDown = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    handleTouchStart = (event) => {
        event.preventDefault();
        this.handleMouseDown();
    };

    render() {
        let { open, stiffness, damping } = this.state;
        stiffness = parseInt(stiffness);
        damping = parseInt(damping);
        return (
            <div className="configureSpring">
                <h1>Spring configuration: </h1>
                <button 
                    className="toggleBtn"
                    onMouseDown = {this.handleMouseDown}
                    onTouchStart = {this.handleTouchStart}
                > Run </button>
                <div className="controls">
                    <div className="damping">
                        <label htmlFor="damping">Damping: {damping}</label>

                        <input 
                            type="range"
                            min={0}
                            max={40}
                            value={damping}
                            onChange = {this.handleChange.bind(this, 'damping')}
                        />
                    </div>
                    <div className="stiffness">
                        <label htmlFor="stiffness">Stiffness: {stiffness}</label>
                        <input 
                            type="range"
                            min={0}
                            max={300}
                            value={stiffness}
                            onChange = {this.handleChange.bind(this, 'stiffness')}
                        />
                    </div>
                </div>
                <Motion
                    style= {{x: spring(open ? 600 : 0, {stiffness, damping})}}
                >
                    {({x}) => 
                    <div className="box" style={Object.assign({},
                        {transform: `translateX(${x}px)`,} 
                    )}>

                    </div>
                }

                </Motion>
            </div>
        );
    };
}