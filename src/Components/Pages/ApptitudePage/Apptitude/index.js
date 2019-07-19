import React, { Component, Fragment } from 'react'
import { Card, Radio } from 'antd';import * as firebase from 'firebase'
import {apiKey, authDomain, databaseURL, storageBucket,} from '../../../../Action/type'
import './style.css'

const firebaseConfigApptitude = {
    apiKey,
    authDomain,
    databaseURL,
    storageBucket
  }
class Apptitude extends Component{
  constructor(props){
    super(props);
    this.state = {
      startDate : new Date(),
      test : [{'question' : `Who is the inventer of Bulb?`,'Optiona' : 'Galilio','Optionb' : 'Right Brothers','Optionc' : 'Alexander','Optiond' : 'skdjfh', 'Value' : null},{'question' : 'Who is the Founder of Tesla?','Optiona' : 'Galilio','Optionb' : 'Right Brothers','Optionc' : 'Alexander','Optiond' : 'skdjfh', 'Value' : null},],
      Index : 0,
    }
    // this.RetriveData();
  }
  handleChange = (date)=>{
    console.log(this.state.startDate)
    this.setState({
      startDate : date,
    },()=>{
      console.log(this.state.startDate)
    });
  }
/*   RetriveData(){
    firebase.database().ref('test').child('tcode').on('value',(data) => {
      let dat = data.toJSON()
      let da = dat['Array']['0']
      let copytestArr =[].concat(this.state.test)
      copytestArr.push({'question' : dat['Array']['0']['0'],'Optiona' : dat['Array']['0']['1'],'Optionb' : dat['Array']['0']['2'],'Optionc':dat['Array']['0']['3'],'Optiond':dat['Array']['0']['4'],'Value': null})
      console.log(copytestArr)
      /* this.setState({
        test : copytestArr
      },()=>{console.log(copytestArr)}) 
    });
} */
  changeIndex =index =>{
    index = parseInt(index, 10)
    this.setState({
      Index : index
    })
  }
  BtnIndex = text =>{
     if(text === 'next'){
       this.setState(prevState =>({
         Index : prevState.Index +1,
       }))
     }
     else if(text === 'prev'){
      this.setState(prevState =>({
        Index : prevState.Index - 1,
      }))
    } 
  }
  onRadioChange = event =>{
    let data = [].concat(this.state.test)
    data[this.state.Index].Value = event.target.value;
    this.setState({
      test : data,
    })
  }
  componentWillMount() {
    firebase.database().ref('test').child('tcode').on('value',(data) => {
      let dat = data.toJSON()
      let copytestArr =[].concat(this.state.test)
      copytestArr.push({'question' : dat['Array']['0']['0'],'Optiona' : dat['Array']['0']['1'],'Optionb' : dat['Array']['0']['2'],'Optionc':dat['Array']['0']['3'],'Optiond':dat['Array']['0']['4'],'Value': null})
      console.log(copytestArr)
       this.setState({
        test : copytestArr
      },()=>{console.log(copytestArr)}) 
    });
  }
    render() {
        return (
           <div style = {{padding : '1rem', alignContent : 'center', justifyContent : 'center'}}>
                <div className = 'apptitude-main-div'>   
                  <div className = 'row' style = {{margin : 0,padding : 10}}>
                  <Card title="Apptitude" style={{ width: '100%', paddingTop : 10,padding:10,paddingBottom : 10, backgroundColor : 'dark' }}>
                    <div className = 'row' style = {{padding : '10px'}}>
                        <div className = 'col-md-8' style = {{border : '2px solid black', backgroundColor : '#0017ff',padding : 10, width: '50%',alignContent : 'center',justifyContent :'center'}}>
                         <div>
                         <div className = 'question-div' style = {{borderBottom : '3px solid blue',color : 'white', backgroundColor : '#0c0000', padding : 10,paddingLeft : 20}}>
                             <p>{this.state.test[this.state.Index].question}</p>
                          </div>
                          <div style = {{color : 'white', backgroundColor : '#080301', padding : 10,paddingTop : 0,paddingLeft : 20}}>
                          <Radio.Group onChange={this.onRadioChange} value={this.state.test[this.state.Index].Value}>
                               <br/>
                              <Radio value={1}>{` ${this.state.test[this.state.Index].Optiona}`}</Radio>
                              <br/>
                              <Radio value={2}>{` ${this.state.test[this.state.Index].Optionb}`}</Radio>
                              <br/>
                              <Radio value={3}>{` ${this.state.test[this.state.Index].Optionc}`}</Radio>
                              <br/>
                              <Radio value={4}>{` ${this.state.test[this.state.Index].Optiond}`}</Radio>
                              <br/>
                            </Radio.Group>
                          </div>
                         </div>  
                          <div style = {{width : '100%',borderTop : '3px solid blue',color : 'white', backgroundColor : '#080301', padding : 10,paddingTop : 0,paddingLeft : 20}}>
                            <div className = 'row' style = {{padding : '20px', alignItems : 'center', justifyContent :'center', margin : 'auto'}}>
                            <div className = 'col-md-4'>
                              <button style = {{border : 'none',color : 'white',background : 'blue'}} disabled = {this.state.Index === 0} onClick = {this.BtnIndex.bind(this,'prev')}>{`< Prev`}</button>
                             </div> 
                              <div className = 'col-md-4'><button style = {{border : 'none',color : 'white',background : 'blue'}}>{this.state.Index}</button></div>
                              <div className = 'col-md-4'>
                              <button disabled = {this.state.Index === (this.state.test.length) -1} style = {{border : 'none',color : 'white',background : 'blue'}} onClick = {this.BtnIndex.bind(this,'next')}>{`Next >`}</button>
                              </div>
                            </div>  
                          </div>  
                        </div>
                        <div className = 'col-md-4' style = {{border : '1px solid black',backgroundColor: 'blue', padding : 10,}}>
                         <div style = {{padding :10,backgroundColor: 'black',flexDirection : 'coloum'}}>
                          {
                            this.state.test.map((testData, index) => {
                              return(
                                <>
                                  <label onClick = {this.changeIndex.bind(this,index)}  style ={{border : '1px solid black',padding : 15,position : 'relative',background : 'blue',color : 'white'}} key={index}>{index}</label>
                                  <label style = {{paddingLeft : 10}}>{'  '}</label>
                                    </>
                              )
                            })
                          }
                          </div>
                        </div>
                    </div>
                    </Card>
                  </div>
               </div>
           </div>    
        )
    }
}

export default Apptitude;