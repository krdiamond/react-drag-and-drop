// There is function that will put the last clicked cell in the front (highest z-index) when dragging
// I took this out so I could understand more basic parts of the code.
// I will add this back in when I understand everything

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import Cell from './Cell';
import DropZone from './drop_zone'
import moon from './moon.png'


class App extends Component {


  findDropZone = () => {
    let dropZone = ReactDOM.findDOMNode(this.refs['DropZone']).getBoundingClientRect()
    return dropZone
  }

    state = {
      oldMouseX: 0,
      oldMouseY: 0,
      mouseX: 0,
      mouseY: 0,
      cells: [
        {x:100, y:100, idx:0, id:'cell0', img:moon},
        {x:150, y:150, idx:1, id:'cell1', img:moon},
        {x:200, y:200, idx:2, id:'cell2', img:moon}
      ],
      holdIndex: -1,
    };

//---------------------------------------------------------- WHEN BOX IS CLICKED
//this receives the onclick event and idx through props from the cell
  findTheMovingCellOnMouseDown = (e, idx) => {
    // e.persist or console.log e.clientX
    this.setState({
      oldMouseX: e.clientX,
      oldMouseY: e.clientY,
      holdIndex: idx,
    });
  }

//---------------------------------------------------------- WHEN BOX IS DRAGGED
  handleMouseMove = (e) => {
    // console.log(this.state.cells[2]);

    let newState = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      holdIndex: this.state.holdIndex,
    };

    if(newState.holdIndex >= 0) {
      newState.cells = this.state.cells;
      let target = newState.cells[this.state.holdIndex];
      target.x += e.clientX - this.state.mouseX;
      target.y += e.clientY - this.state.mouseY;
      let dropZone = this.findDropZone()
      // console.log(dropZone)
      // console.log(dropZone.right - dropZone.width)
      if(target.x < dropZone.right &&
        target.x > (dropZone.right - dropZone.width - 100) &&
        target.y < dropZone.bottom &&
        target.y > (dropZone.bottom - dropZone.height-100)){
        console.log("i'm here")
      }
    }
    this.setState(newState);
  }

//--------------------------------------------- WHEN BOX IS PLACED AND UNCLICKED
  handleMouseUp = (event) => {
    this.setState({holdIndex: -1});
  }

  render() {
    let cells = this.state.cells.map((cell) => {
        return (
          <Cell
            key={cell.idx}
            id={cell.id}
            idx={cell.idx}
            x={cell.x}
            y={cell.y}
            img={cell.img}
            findTheMovingCell={this.findTheMovingCellOnMouseDown}
          />
        );
      }
    );

    return (
      <div id="app">
        <DropZone ref='DropZone'/>
        <div onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove}> { cells }</div>
      </div>
    );
  }
}





export default App;
