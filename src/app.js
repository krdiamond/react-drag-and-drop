// There is function that will put the last clicked cell in the front (highest z-index) when dragging
// I took this out so I could understand more basic parts of the code.
// I will add this back in when I understand everything

import React, { Component } from 'react';
import './app.css';
import Cell from './Cell';

class App extends Component {

    state = {
      oldMouseX: 0,
      oldMouseY: 0,
      mouseX: 0,
      mouseY: 0,
      cells: [
        {x:100, y:100, idx:0, id:'cell0'},
        {x:150, y:150, idx:1, id:'cell1'},
        {x:200, y:200, idx:2, id:'cell2'}
      ],
      holdIndex: -1,
    };

//---------------------------------------------------------- WHEN BOX IS CLICKED
//this receives the onclick event and idx through props from the cell
//
  findTheMovingCellOnMouseDown = (e, idx) => {
    this.setState({
      oldMouseX: e.clientX,
      oldMouseY: e.clientY,
      holdIndex: idx,
    });
  }

//---------------------------------------------------------- WHEN BOX IS DRAGGED
  handleMouseMove = (e) => {
    //console.log('mouse move');
    let dx = e.clientX - this.state.mouseX;;
    let dy = e.clientY - this.state.mouseY;

    let newState = {
      mouseX: e.clientX,
      mouseY: e.clientY
    };
    let holdIndex = this.state.holdIndex;
    if(holdIndex >= 0) {
      newState.cells = this.state.cells.slice();
      let target = newState.cells[holdIndex];
      target.x += dx;
      target.y += dy;
    }
    this.setState(newState);
  }

//--------------------------------------------- WHEN BOX IS PLACED AND UNCLICKED
  handleMouseUp = (event) => {
    this.setState({holdIndex: -1});
  }

//----------------------------------------------------------------------- RENDER
  render() {
//----------------------------------------------- MAP THROUGH ALL BOXES IN STATE
    let cells = this.state.cells.map((cell) => {
        return (
          <Cell
            key={cell.idx}
            id={cell.id}
            idx={cell.idx}
            x={cell.x}
            y={cell.y}
            findTheMovingCell={this.findTheMovingCellOnMouseDown}
          />
        );
      }
    );

    return (
      <div
        id = "app"
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        >
        { cells }
      </div>
    );
  }
}


export default App;
