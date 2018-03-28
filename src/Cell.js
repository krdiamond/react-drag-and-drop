import React, { Component } from 'react';
import { colors } from './Constants';

export default class Cell extends Component {

 render() {
   return (
     <div className="cell"
          key={this.props.id}
          style={{left: this.props.x,
                  top: this.props.y,
                  background: colors[this.props.id % colors.length]}}
          onMouseDown={ (e)=>this.props.onMouseDown(e,this.props.id)}>
        <div>id: {this.props.id}</div>
        <div>position: {`(${this.props.x}, ${this.props.y})`} </div>
      </div>
    );
  }
}
