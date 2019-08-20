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
                    <p>mean</p>
                    <p>{mean.toFixed(1)}</p>
                </div>
                <div>
                    <p>sum</p>
                    <p>{sum.toFixed(1)}</p>
                </div>
                <div>
                    <p>variance</p>
                    <p>{variance.toFixed(1)}</p>
                </div>
                <div>
                    <p>corrWin</p>
                    <p>{corrWin.toFixed(1)}</p>
                </div>
            </div>   
        )
    }
}

export default Signal;
