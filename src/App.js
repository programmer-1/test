import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react';
import './App.css';

import DefaultPage from './Components/DefultPage/index'
import LoginPage from './Components/Pages/LoginPage/index'
import TeacherPage from './Components/Pages/TeacherPage/index'

class App extends Component{
  constructor(){
     super()
     this.state = {
       Login : false,
       teacherLogin : false,
     }
  }

  loginStatus = (status, teacherLogin) =>{
    this.setState({
      Login : status,
      teacherLogin : teacherLogin,
    })
  }

  render(){
    return (
      <div>
        {!this.state.Login?<LoginPage LogedInStatus = {this.loginStatus} />:!this.state.teacherLogin?<DefaultPage LogedInStatus= {this.loginStatus}/>:<TeacherPage />}
      </div>
    );
  }
}

export default App;
