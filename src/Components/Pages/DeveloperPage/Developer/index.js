import React, { Component } from 'react'
// import background from '../../../Images/wall.jpg'
import logo from '../../../Images/logo.png'


export default class Developer extends Component {
    render() {
        return (
          <div className = 'bg'/*  style = {{backgroundImage: `url(${background})`}} */>
             {/*  <div className = 'row' style = {{margin : 0,width : '100%',height : '100vh'}}>
              <img src = {BZ} style={{borderColor:'black',alignItems: 'center',width: '100%',height: '80vh',justifyContent: 'center'}} ></img>
            </div> */} 
            <div class="corners" style = {{textAlign : 'center'}}>
            <div className = 'row' style = {{margin : 0,justifyContent : 'center',alignContent : 'center',textAlign : 'center'}}>
                <h3>Bug Zapperz</h3>
                </div>  
                <div className = 'row' style = {{margin : 0,justifyContent : 'center',alignContent : 'center',textAlign : 'center'}}>
                <img scr={logo} alt = 'logo' />
                </div>    
            </div> 
          </div>    
        )
    }
}
