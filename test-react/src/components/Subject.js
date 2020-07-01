import React, { Component } from 'react';

class Subject extends Component {
    render() {  //javascript의 class 내 소속된 함수는 function을 생략함
      //return에서는 하나의 최상위 tag만 사용
      return (
        <header>
              <h1>WEB</h1>
              world wide web!
          </header>
      );
    }
}

export default Subject;