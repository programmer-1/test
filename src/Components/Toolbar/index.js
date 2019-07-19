import React, { Component } from 'react'
import * as firebase from 'firebase'

import './style.css'
import logo from '../Images/logo1.png'
import ToogleButton from '../SideDrawer/toogle'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import man from '../Images/man.png'
import {apiKey, authDomain, databaseURL, storageBucket,} from '../../Action/type'

const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    storageBucket
  }

class Toolbar extends Component{
    constructor(){
        super()
        this.state = {
            display : false,
            url: ''
        };
    }
    
    componentWillMount(){
        var user = firebase.auth().currentUser;
        var UserID = user.uid;
        firebase.database().ref('StudentsDetailsWithUID/').child(UserID).on('value',(data) => {
          let dat = data.toJSON();
          this.setState({
            
            url : dat['Profile']
          })
        })
      }

    changeAction = (props)=>{
        this.setState(prevState =>({
            display : !prevState.display
        }),()=>{ this.props.displayState(this.state.display)})
    }
    render(){
        return(
                <nav className = 'toolbar-navigation'>
                    <div style = {{marginLeft : '0.5rem'}}><ToogleButton /></div>    
                    <div className = 'toolbar-logo'>
                        <a href = 'http://www.github.com/Programmer-1'><img className = 'logo' alt = 'logo' src = {logo}></img></a>
                    </div> 
                    <div className = 'toolbar-title'>
                    <h2>Apptitude Test</h2>
                    </div>
                    <div className = 'spacer'>
                    </div>    
                    <div className = 'toolbar-navigation-items'>
                    <ul>
                        <li><Link className = 'li-nk' to = '/'>Dashboard</Link></li> 
                        <li><Link className = 'li-nk' to = '/apptitude'>Apptitude</Link></li> 
                        <li><Link className = 'li-nk' to = '/developer'>Developer</Link></li>   
                    </ul>    
                    </div> 
                    <div style = {{paddingLeft : 5,paddingRight : 5}}>
                    <img type="file" onClick = {this.changeAction} src={this.state.url || man} alt="Uploaded images" style={{borderRadius: 100/ 2}} height="50" width="50"/>
                    </div>
                </nav> 
        )
    }
}

export default Toolbar;