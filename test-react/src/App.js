import React, { Component } from 'react';
import './App.css';
import Subject from './components/Subject';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

//유사 javascript임. create-react-app이 console에서 사용할 수 있게끔 수정해준다고 함. 이건 jsx
class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;  //UI에 영향을 주지 않기 때문에 따로 뺌
    this.state = {
      mode:"welcome",
      selected_content_id:0,
      welcome:{title:"Welcome", desc:"Hello, React!!"},
      subject:{title:"WEB", sub:"World Wid Web!"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is HyperText Markup Language."},
        {id:2, title:"CSS", desc:"CSS is for design."},
        {id:3, title:"Javascript", desc:"Javascript is for interactive."}
      ]
    }
  }
  getReadContent(){
    var i = 0;
      while( i < this.state.contents.length ){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
        }
        i = i + 1;
      }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    }else if(this.state.mode === "read"){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    }else if(this.state.mode === "create"){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        this.setState({
          contents:this.state.contents.concat(
            {id:this.max_content_id, title:_title, desc:_desc}
          ),
          selected_content_id:this.max_content_id,
          mode:'read'
        });
      }.bind(this)}></CreateContent>;
    }else if(this.state.mode === "update"){
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content}
      onSubmit={function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents:_contents,
          mode:'read'
        });
      }.bind(this)}></UpdateContent>;
    }
    return _article;
  }
  render() {
    
    return (
      <div className="App">
        <Subject title={this.state.subject.title}
        sub={this.state.subject.sub}
        onChangePage={function(){
                this.setState({mode:"welcome"});
              }.bind(this)}></Subject>
        <TOC onChangePage={function(id){
          this.setState({
            mode:"read",
            selected_content_id:Number(id)
        });
        }.bind(this)}
        data={this.state.contents}></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === 'update'){
            if(this.state.selected_content_id === 0){
              return;
            }
            this.setState({
              mode:_mode
            });
          }else if(_mode === 'delete'){
            if(this.state.selected_content_id === 0){
              return;
            }
            if(window.confirm("Do you really want to delete it?")){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i, 1);
                }
                i = i + 1;
              }
              this.setState({
                mode:_mode,
                contents:_contents
              });
            }
          }else if(_mode === 'create'){
            this.setState({
              mode:_mode
            });
          }
          
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
