import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import * as firebase from 'firebase'
import {apiKey, authDomain, databaseURL, storageBucket,} from '../../../../Action/type'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import male from '../../../Images/male.png'
import female from '../../../Images/female.png'
import menBlack from '../../../Images/menBlack.png'
import womanBlack from '../../../Images/womanBlack.png'
import man from '../../../Images/man.png'
import LoadingOverlay from 'react-loading-overlay';
import './style.css'

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket
}

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

export default class Register extends Component {

  constructor(props){
    super(props)
    
    this.state = {
       email : '',
       password : '',
       confirmpassword : '',
       startDate: '',
       MinDate : '',
       RegisterNumber: '',
       UserName:'',
       boy : false,
       girl : false,
       image: null,
        url: '',
        progress: 0
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }


  handleInput = (name, e) =>{
    this.setState({
      [name] : e.target.value,
    })
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  
  handleMenClick = () => {
    this.setState(prevState => ({
      boy : !prevState.boy,  
      girl : false,
    }))
  }

  handlewomenClick = () => {
    this.setState(prevState => ({
      girl : !prevState.girl, 
      boy : false, 
    }))
  }

  hi = e =>{
    alert("HI")
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }
  handleUpload = () => {
      var RegNo;
      RegNo = this.state.RegisterNumber;
      const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});

      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});

            // firebase.database().ref('StudentsDetails/').child(RegNo).update({
            //   Profile : url
              
            // }).then(() => {
            //   alert("Image Inserted")
            // }
            // ).catch((error) =>{
            //    alert(error)
            //   });
        })
    });
  }

handleCreateAccount = () => {

  var CurrUser;
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
 uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
               // this value to authenticate with your backend server, if
               // you have one. Use User.getToken() instead.
}
alert(name)
alert(email)
alert(photoUrl)
alert(uid)
alert(emailVerified)

  var RegNo,gender;
  var EmailWithoutAT = this.state.email;
  EmailWithoutAT = EmailWithoutAT.split('@');
  EmailWithoutAT = EmailWithoutAT[0];
    if(this.state.UserName === ''){
      alert("Enter User Name")
    }
    else if(this.state.email === ''){
      alert("Enter Email ID")
    }
    else if(this.state.password === '' || this.state.confirmpassword === ''){
      alert("Enter Password")
    }
    else if(this.state.password !== this.state.confirmpassword){
      alert("Check your password")
    }
    
    else if(this.state.RegisterNumber === ''){
      alert("Enter Register Number")
    }
    else if(this.state.RegisterNumber.toString().length !== 12){
      alert("Enter Your Full Register Numer")
    }
    else if(this.state.startDate === ''){
      alert("Enter DOB")
    }
    else if(this.state.boy === false && this.state.girl === false){
      alert("Choose Your Gender")
    }
    else{
        RegNo = this.state.RegisterNumber;
        if(this.state.boy == true){
          gender = "Boy"
        }
        else if(this.state.girl == false){
          gender = "Girl"
        }
        try{
          alert(this.state.startDate)
          // To create email with password (START)
          firebase.auth().createUserWithEmailAndPassword(this.state.email , this.state.password).then(() => {
            alert("Account Created")
            CurrUser = firebase.auth().currentUser;
            alert(CurrUser.uid)
            // To insert email and password (START)
            firebase.database().ref('EmailAndPassword/').child(EmailWithoutAT).set(
              {
                Email: this.state.email,
                Password: this.state.password,
                UID: CurrUser.uid
              }).then(() => {
                alert("Data Inserted")

                firebase.database().ref('StudentsDetails/').child(RegNo).set({
                  UserName : this.state.UserName,
                  Email: this.state.email,
                  Password: this.state.password,
                  RegNum : this.state.RegisterNumber,
                  // DOB : this.state.startDate,
                  Gender : gender,
                  UID: CurrUser.uid,
                  Profile : this.state.url
                }).then(() => {
                  alert("Inserted")

                  firebase.database().ref('StudentsDetailsWithUID/').child(CurrUser.uid).set({
                    UserName : this.state.UserName,
                    Email: this.state.email,
                    Password: this.state.password,
                    RegNum : this.state.RegisterNumber,
                    // DOB : this.state.startDate,
                    Gender : gender,
                    UID: CurrUser.uid,
                    Profile : this.state.url
                  }).then(() => {
                    alert("Inserted")
                  }
                  ).catch((error) =>{
                     alert(error)
                    });
                }
                ).catch((error) =>{
                   alert(error)
                  });

              }).catch((error) => {
                alert("1"+error)
              });
            // To insert email and password (END)
            
          })
          .catch(error => {
            alert("2"+error)
          });
          // To create email with password (END)
      }
      catch(error){
        alert("3"+error);
      }
   }
};


  render() {
    const style = {
      // height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center'
    };
    return (
      
       <div style = {{position : 'relative', background : 'blue' ,height: 790}} >
    
        <div  style = {{textAlign : 'center',paddingTop : 5}}>
         <h2 style = {{color : 'white'}}>Register</h2>
        </div>

        

        <div style = {{padding : '3%'}}>
          <form>
          
              <div style = {{padding : '2%'}}>
                <label style = {{color : 'white'}}>
                User Name
                </label>  
                <input max={5}  type="text"  value = {this.state.UserName} name="UserName" placeholder = 'Enter your User Name' className = 'input-component' onChange = {this.handleInput.bind(this,'UserName')}/>
              </div>

              
              <div style = {{padding : '2%'}}>
                <label style = {{color : 'white'}}>
                  Email
                </label>  
                <input type="email" value = {this.state.email} name="email" placeholder = 'Enter your Email' className = 'input-component' onChange = {this.handleInput.bind(this, 'email')}/>
              </div> 

              <div style = {{padding : '2%'}}>
              <label style = {{color : 'white'}}>
              Password
              </label>  
              <input type="password"  value = {this.state.password} name="password" placeholder = 'Enter your Password' className = 'input-component' onChange = {this.handleInput.bind(this,'password')}/>
              </div> 
              
              <div style = {{padding : '2%'}}>
              <label style = {{color : 'white'}}>
              Confirm Password
              </label>  
              <input type="password"  value = {this.state.confirmpassword} name="confirmpassword" placeholder = 'Enter your Confirm Password' className = 'input-component' onChange = {this.handleInput.bind(this,'confirmpassword')}/>
              </div>
          
                {/* {this.state.boy?  
                    <LoadingOverlay
                    active = {true}
                    spinner
                    text='Bug Zapperz'
                    ></LoadingOverlay> 
                    :
                    <LoadingOverlay
                active = {false}
                spinner
                text='Bug Zapperz'
                ></LoadingOverlay>
                } */}
              
              <div style = {{padding : '2%'}}>
              <label style = {{color : 'white'}}>
              Register Number
              </label>  
              <input max={5}  type="number"  value = {this.state.RegisterNumber} name="RegisterNumber" placeholder = 'Enter your Register Number' className = 'input-component' onChange = {this.handleInput.bind(this,'RegisterNumber')}/>
              </div> 

              <div style = {{padding : '3%'}}>
                <div className = 'row'>
                <div className  = 'col-md-6'>
                  <label style = {{color : 'white'}}>
                  DOB
                  </label> 
                  <br/> 
                  <DatePicker
                  selected={this.state.startDate}
                    onChange={this.handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    minDate={this.state.MinDate}
                  />
                  
                  </div>
                  <div className  = 'col-md-6'>
                    <div className = 'row'>
                      <div className  = 'col-md-6'>
                        <label style = {{color : 'white'}}>Male</label>
                        <br/>
                        {this.state.boy?
                           <img className = 'logo' alt = 'logo' onClick = {this.handleMenClick} src = {male}></img> 
                           :
                            <img className = 'logo' alt = 'logo' onClick = {this.handleMenClick} src = {menBlack}></img>
                        }
                        
                      </div>
                      <div className  = 'col-md-6'>
                        <label style = {{color : 'white'}}>Female</label>
                        <br/>
                        {this.state.girl?
                           <img className = 'logo' alt = 'logo' onClick = {this.handlewomenClick} src = {female}></img> 
                           :
                            <img className = 'logo' alt = 'logo' onClick = {this.handlewomenClick} src = {womanBlack}></img>
                        }
                      </div>
                    </div>
                  </div> 
                </div>
              </div>

              <div style={style}>
              <br/>
                <div className = 'row'>
                  
                  <div className = 'col-md-6'>
                <img type="file" onClick={this.hi} onChange={this.handleChange} src={this.state.url || man} alt="Uploaded images" style={{borderRadius: 100/ 2}} height="100" width="100"/>
                  </div>
                  <div className = 'col-md-6'>
                    <div className = 'row'>
                      <div className = 'col-md-12'><input type="file" onChange={this.handleChange} /></div>
                    </div>
                    <br/>
                    <div className = 'row'>
                      <div className = 'col-md-12'><button onClick={this.handleUpload}>Upload</button></div>
                    </div>
                  </div>
                </div>
                
              </div>

              <div style = {{padding : '3%'}}>
                
              </div>
              <div style = {{padding : '3%'}}>

              <Button className ='login-form-button' onClick = {this.handleCreateAccount} >Create Account</Button>
              </div>
          </form>
        </div>  

       </div> 
    )
  }
}
