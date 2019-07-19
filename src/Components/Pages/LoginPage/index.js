import React, {Component} from 'react'
import Login from './Login/index'
class LoginPage extends Component{
    LoginStatus = (status,teacherLogin) =>{
        this.props.LogedInStatus(status,teacherLogin);
    }
   render()
   {
       return(
             <Login loginStatus = {this.LoginStatus}/> 
       )
   }
}

export default LoginPage