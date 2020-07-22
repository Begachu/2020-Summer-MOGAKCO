import React, { Component } from 'react';

class Control extends Component {
    render() {  //javascript의 class 내 소속된 함수는 function을 생략함
      //return에서는 하나의 최상위 tag만 사용
      return (
        <ul>
          <li><a href="/create"
           onClick={function(e){
             e.preventDefault();
             this.props.onChangeMode('create');
           }.bind(this)}>create</a></li>
          <li><a href="/update"
          onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}>update</a></li>
          <li><input type="button" value="delete"
          onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('delete');
          }.bind(this)}></input></li>
        </ul>
      );
    }
}

export default Control;