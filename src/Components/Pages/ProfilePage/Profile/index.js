import React, { Component } from 'react'
import logo from '../../../Images/logo.png'
import man from '../../../Images/man.png'
import * as firebase from 'firebase'

export default class Profile extends Component {

  constructor(props){
    super(props)
    this.state = {
       UserName : 'Bug ZapperZ',
       RegNum : '1108--104---',
       ProfilePic : ''
    }
  }

  componentWillMount(){
    var user = firebase.auth().currentUser;
    var UserID = user.uid;
    firebase.database().ref('StudentsDetailsWithUID/').child(UserID).on('value',(data) => {
      let dat = data.toJSON();
      this.setState({
        UserName : dat['UserName'],
        RegNum : dat['RegNum'],
        ProfilePic : dat['Profile']
      })
    })
  }

  render() {
    return (
      <div className = 'bg' style={{background : 'blue'}}>
     <div class="corners" style = {{textAlign : 'center',background : 'grey'}}>
        <div className = 'row' style = {{margin : 0,justifyContent : 'center',alignContent : 'center',textAlign : 'center'}}>
          <h1 style = {{color : 'black'}}>PROFILE</h1>
        </div>  
         <div className = 'row' style = {{margin : 0,marginTop : 10,justifyContent : 'center',alignContent : 'center',textAlign : 'center'}}>
         <img  src={this.state.ProfilePic || man} alt="Uploaded images" style={{borderRadius: 200/ 2,background : 'white'}} height="200" width="200"/>
         </div>    
         <div className = 'row' style = {{margin : 0,justifyContent : 'center',alignContent : 'center',textAlign : 'center' , marginTop:30 }}>
           <label style = {{fontSize : 30,color:'black'}}>{this.state.UserName}</label>
         </div>
         <div className = 'row' style = {{margin : 0,justifyContent : 'center',alignContent : 'center',textAlign : 'center' , marginTop:15 }}>
           <label style = {{fontSize : 20,color:'black'}}>{this.state.RegNum}</label>
         </div>
     </div> 
   </div>    
    )
  }
}
