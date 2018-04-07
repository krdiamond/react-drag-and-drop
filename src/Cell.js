import React, { Component } from 'react';

export default class Cell extends Component {

 render() {

   return (
     <div className="cell"
          key={this.props.idx}
          id ={this.props.id}

          style={{left: this.props.x,
                  top: this.props.y}}

          onMouseDown={(e)=>this.props.findTheMovingCell(e,this.props.idx)}>
        <div id="clearbox"></div>
        <img className="moon" src={this.props.img} alt="full moon" />
    </div>
    );
  }
}

//onMouseDown
//When a cell is clicked, it passes it's event to the findTheMovingCell method
//along with it's id

        //<div>idx: {this.props.idx}</div>
        // <div>position: {`(${this.props.x}, ${this.props.y})`} </div>
