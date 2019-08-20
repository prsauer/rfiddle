import React, { Component } from "react";

class Signal extends Component {
    render() {
        let {
            max, min, mean, sum, variance, corrWin, name
        } = this.props;
        return (
            <div style={{display: "flex", alignItems: 'center', justifyContent: "space-between"}}>
                <p>{name}</p>
                <div>
                    <p>max</p>
                    <p>{max.toFixed(1)}</p>
                </div>
                <div>
                    <p>min</p>
                    <p>{min.toFixed(1)}</p>
                </div>
                <div>
                    <p>µ</p>
                    <p>{mean.toFixed(1)}</p>
                </div>
                <div>
                    <p>Σ</p>
                    <p>{sum.toFixed(1)}</p>
                </div>
                <div>
                    <p>σ<sup>2</sup></p>
                    <p>{variance.toFixed(1)}</p>
                </div>
                <div>
                    <p>ρ<sub>win</sub></p>
                    <p>{corrWin.toFixed(1)}</p>
                </div>
            </div>   
        )
    }
}

export default Signal;
