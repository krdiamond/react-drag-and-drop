import React, { Component } from 'react';
import { colors } from './Constants';

export default class Cell extends Component {

 render() {
   return (
     <div className="cell"
          key={this.props.idx}
          id ={this.props.id}

          style={{left: this.props.x,
                  top: this.props.y}}

          onMouseDown={(e)=>this.props.findTheMovingCell(e,this.props.idx)}>

        <div>idx: {this.props.idx}</div>
        <div>position: {`(${this.props.x}, ${this.props.y})`} </div>

      </div>
    );
  }
}

//onMouseDown
//When a cell is clicked, it passes it's event to the findTheMovingCell method
//along with it's id
