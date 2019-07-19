import React, {Component} from 'react'
import './style.css'
import Toolbar from '../Toolbar/index'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'
import SideDrawer from '../SideDrawer/index'
import HomePage from '../Pages/DashboardPage/index'
import ApptitudePage from '../Pages/ApptitudePage/index'
import ProfilePage from '../Pages/ProfilePage/index'
import DeveloperPage from '../Pages/DeveloperPage/index'
import TeacherPage from '../Pages/TeacherPage/index'
import { previewImage } from 'antd/lib/upload/utils';

import './style.css'

class DefaultPage extends Component{
    constructor(){
        super()
        this.state ={
            displayProfile : false,
            login : true,
        }
    }
    display = ()=>{
        this.setState(prevState =>({
            displayProfile : !prevState.displayProfile,
        }))
    }
    logoutAction = () =>{
        this.setState(prevState =>({
            login : !prevState.login,
        }),()=>{this.props.LogedInStatus(this.state.login)})
    }
    render(){
        return(
            <div>
                 <Router>
                <header className = 'toolbar'>
                  <Toolbar displayState = {this.display} />
                </header>
                <Switch>
                <main style = {{justifyContent : 'center', alignItems : 'center'}}>
                {this.state.displayProfile?<div style = {{margin : 0, padding : 20}} className = 'float-div'>
                      <div className = 'row' style = {{borderBottom : '2px Solid #000000', margin : 0, padding : 20,textAlign : 'center'}}><Link to = '/profile'>Profile</Link></div>
                      <div className = 'row' style = {{margin : 0, padding : 20,textAlign : 'center'}}><button onClick = {this.logoutAction}>Logout</button></div>
                  </div>:null}
                     <Route exact path = '/' component = {HomePage} />
                     <Route exact path = '/apptitude' component = {ApptitudePage} />
                     <Route exact path = '/developer' component = {DeveloperPage} />
                     <Route exact path = '/teacher' component = {TeacherPage} />
                     <Route exact path = '/profile' component = {ProfilePage} />
                </main>    
                </Switch>  
                </Router>
            </div>       
        )
    }
}

export default DefaultPage 