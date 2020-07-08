import React, { Component } from 'react';

class Subject extends Component {
    render() {  //javascript의 class 내 소속된 함수는 function을 생략함
      //return에서는 하나의 최상위 tag만 사용
      return (
        <header>
              <h1><a href="/" onClick={function(e){
                e.preventDefault();
                this.props.onChangePage();
              }.bind(this)
                }>{this.props.title}</a></h1>
              {this.props.sub}
          </header>
      );
    }
}

export default Subject;