import React, {Component} from 'react'
import './style.css'
import {Button} from 'react-bootstrap'
import logo from '../../../Images/logo1.png'
import * as firebase from 'firebase'
import 'firebase/auth';
import RegisterPage from '../../RegisterPage/index'
import {apiKey, authDomain, databaseURL, projectId, appId} from '../../../../Action/type'
import { any } from 'prop-types';
import { userInfo } from 'os';
//hi

class Login extends Component{
 
  constructor(props){
    super(props)
    this.state = {
       action : true,
       logedIn : false,
       email : '',
       password : '',
       teacherLogin : false,
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // alert(user.uid)
        if(user.uid === 'Kho5wHIeJqWJqmkP9JQAKbXZpEi1')
        {
          // alert("Teacher Loggedin")
        }
        else
        {
          // alert("Student Loggedin")
        }
      } else {
        // alert("Not Loggedin")
      }
      });
    
  }

  handleInput = (name, e) =>{
      this.setState({
        [name] : e.target.value,
      })
  }

  changeAction = () =>{
      this.setState(prevState => ({
          action : !prevState.action,  
      }))
  }
 callback(key) {
    console.log(key);
  }

  /***************  LOG OUT ******** */
      // logout(){
      //   firebase.auth().signOut().then(() => {
      //     alert("Siggned out Sucessfully")
      //   }).catch((error) => {
      //     alert(error)
      //   })
      // }
  /*****************************/

  handleSubmit = () => {
    
    

    if(this.state.email === ''){
      //  alert("Enter email id")
    }else if(this.state.password === ''){
      // alert("Enter password")
    }
    else{
    // firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(() => {
    //   if(this.state.email == 'jec@gmail.com'){
    //     alert("Teacher")
    //   }else{
    //     alert("Student")
    //   }
    // }).catch((error) => {
    //   alert(error)
    // })
  }
    if(this.state.email === 'jec@gmail.com'){
     this.setState({teacherLogin : true,
    })
    }
    this.setState(prevState => ({
      logedIn : !prevState.logedIn,  
  }),() =>{this.props.loginStatus(this.state.logedIn,this.state.teacherLogin)
   })
   
/*     event.preventDefault();
    const { email, password } = this.state;
    const config = {
      apiKey: apiKey,
      authDomain: authDomain,
      databaseURL:databaseURL,
      projectId: projectId,
      appId: appId
    };
    firebase.initializeApp(config);
 firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(prevState => ({
          logedIn : !prevState.logedIn,  
      }),() =>{this.props.loginStatus(this.state.logedIn)
       })
      })
      .catch((error) => {
        this.setState({ error: error });
      }) */
  };

  /* handleSubmit = props =>{
   // if(this.state.email === 'admin' && this.state.password === 'admin'){
    this.setState(prevState => ({
      logedIn : !prevState.logedIn,  
  }),() =>{this.props.loginStatus(this.state.logedIn)
   })
  //}
  //else{
    //alert('Invalid Username or password!')
  //}
  } */

   render()
   {
       return(
           <div style = {{backgroundColor : '#f8f7f7', height : '100vh', width : '100%'}}>
                <div className = 'row' style = {{backgroundColor : 'DodgerBlue'}}>
                  <div className = 'col-md-1'>
                     <a href = 'http://www.github.com/Programmer-1'><img className = 'logo' alt = 'logo' src = {logo}></img></a>
                  </div> 
                  <div className = 'col-md-10' style = {{textAlign : 'center',color : 'white'}}>
                    <h2>Apptitude Test</h2>
                  </div> 
                  <div className = 'col-md-1' style = {{margin : 'auto',float : 'right'}}>
                  <button style = {{backgroundColor : 'white'}} onClick = {this.changeAction}>{this.state.action?'Register':'Login'}</button>
                  </div>
                </div>
                <div style = {{paddingTop : '10vh' }}>
                   <div className = 'center-div'>
                     {this.state.action?
                         <div>
                                       <div  style = {{textAlign : 'center', paddingTop : 5}}>
                                       <h2>Login</h2>
                                      </div>
                                      <div style = {{padding : '3%'}}>
                                      <form>
                                        <div style = {{padding : '2%'}}>
                                        <label>
                                          Email
                                          </label>  
                                          <input type="email" style = {{paddingLeft : 10}} value = {this.state.email} name="email" placeholder = 'Enter your Email' className = 'input-component' onChange = {this.handleInput.bind(this, 'email')}/>
                                        </div>  
                                          <div style = {{padding : '2%'}}>
                                          <label>
                                          Password
                                          </label>  
                                          <input type="password" style = {{paddingLeft : 10}} value = {this.state.password} name="password" placeholder = 'Enter your Password' className = 'input-component' onChange = {this.handleInput.bind(this,'password')}/>
                                          </div>  
                                          <div style = {{padding : '3%'}}>
                                            <div className = 'row'>
                                            <div className  = 'col-md-6'>
                                                <a href = 'http://google.com'><label>forget password</label></a>
                                              </div>
                                              <div className  = 'col-md-6'>
                                                <label>Rember Me!</label>
                                              </div> 
                                            </div>
                                          </div>
                                          <div style = {{padding : '3%'}}>
                                           <Button className ='login-form-button' onClick = {this.handleSubmit} >Login</Button>
                                          </div>
                                      </form>
                                      </div>
                       </div>
                         :
                         <RegisterPage tab="Register" key="Register"/>
                     }
                   </div>  
                </div>  
           </div>  
       )
   }
}

export default Login