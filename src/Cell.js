import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { colors } from './Constants';

export default class Cell extends Component {

  //----------------------------- TERRIBLE STYLING THAT NEEDS TO BE MOVED TO CSS
  getStyle(scale, x, y) {
    return {
      position: 'absolute',
      width: 100,
      height: 100,
      background: colors[this.props.id % colors.length],
      left: x,
      top: y,
      border: `5px solid ${colors[3]}`,
      borderRadius: '5px',
      WebkitUserSelect: 'none',
      transform: `scale(${scale})`,
      fontFamily: 'monospace',
      boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
    };
  }

   render() {
    let front = this.props.front;
    let scale = 3; //window.innerWidth / 100;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let width = 100;
    let height = 100;

//------------------------------------------------------------ TEXT INSIDE BOXES
    return (
      <Motion
      defaultStyle = {{
        s: 1,
        x: this.props.x,
        y: this.props.y,
      }}
      style = {{
        s: spring(front ? scale : 1),
        x: spring(front ? windowWidth/2-width/2 : this.props.x),
        y: spring(front ? windowHeight/2-height/2 : this.props.y),
      }}
      >
      {({s, x, y}) =>
        <div
          key={this.props.id}
          style={ this.getStyle(s, x, y) }
          onMouseDown={ (e)=>this.props.onMouseDown(e, this.props.id) }
          >
          <div>id: {this.props.id}</div>
          <div>position: {`(${this.props.x}, ${this.props.y})`} </div>
          <div>front: {front?'true':'false'} </div>
        </div>
      }
    </Motion>
  );
  }
}
