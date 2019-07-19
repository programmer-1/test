import React, {Component} from 'react'
import Register from './Register/index'
class RegisterPage extends Component{
    LoginStatus = status =>{
        console.log(status)
        this.props.LogedInStatus(status);
    }
   render()
   {
       return(
             <Register /> 
       )
   }
}

export default RegisterPage