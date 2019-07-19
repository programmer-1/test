import React, { Component } from 'react'
import {Card} from 'antd'
import * as firebase from 'firebase'
import {apiKey, authDomain, databaseURL, storageBucket,} from '../../../../Action/type'
import './style.css'

const firebaseConfigTeacher = {
    apiKey,
    authDomain,
    databaseURL,
    storageBucket
  }
  
//   firebase.initializeApp(firebaseConfigTeacher);

export default class Teacher extends Component {
    constructor(props){
       super(props);
       this.state = {
           testArr : [],
       }
    }
    addTest(){
        var TestName,TestCode;
        if(this.state.testArr.length === 0){
            let copyTestArr = [].concat(this.state.testArr)
        copyTestArr.push(['','',[]])
        this.setState({
            testArr : copyTestArr,
        })
    }
        else{
            alert(this.state.testArr.length)
            TestName = this.state.testArr[0][0]
            TestCode = this.state.testArr[0][1]
            firebase.database().ref(TestName).child(TestCode).update({
                Array : this.state.testArr[0][2]
              }).then(() => {
                alert("Inserted")
              }
              ).catch((error) =>{
                 alert(error)
                });
        }
    }
    RetriveData(){
        firebase.database().ref('Test Name').child('Test code').on('value',(data) => {
            console.log(data.toJSON())
        });
    }
    handleInput=(pos,event) =>{
        let copyTestArr = [].concat(this.state.testArr)
        copyTestArr[0][pos] = event.target.value;
        this.setState({
            testArr : copyTestArr
        })
    }
    addQuestion(categoryindex){
        let copyTestArr = [].concat(this.state.testArr)
        copyTestArr[0][2].push(['','','','',''])
        this.setState({
            testArr : copyTestArr,
        },()=>{console.log(categoryindex)})
    }
    deleteQuestion(index){
        console.log(index)
        let copyTestArr = [].concat(this.state.testArr)
        copyTestArr[0][2] = copyTestArr[0][2].slice(0,index).concat(copyTestArr[0][2].slice(index+1,copyTestArr[0][2].length))
        this.setState({
            testArr : copyTestArr,
        })
    }
    addOption(index,pos,event){
        let copyTestArr = [].concat(this.state.testArr)
        copyTestArr[0][2][index][pos] = event.target.value;
        this.setState({
            testArr : copyTestArr
        })
    }
    cancelTestQuestions(){
        this.setState({
            testArr : [],
        })
    }
    render() {
        return (
                <div style = {{margin : 0,padding : 10,
                    boxShadow: '3px 3px 5px 6px blue', background : 'blue'}}>
                    <Card className = 'question-card' >
                    <div className = 'question-card-div'>
                        <div className = 'row' style = {{margin : 0}}>
                            <div style = {{float : 'right',paddingBottom : 10}} className = 'col-md-3'>
                                <button /* disabled = {this.state.testArr.length > 0?true:false} */ className = 'add-question-set' style = {{float : 'right',color : 'white', background : '#6ad500'}} onClick = {this.addTest.bind(this)}>{this.state.testArr.length > 0?'Save':'+ Add Question Set'}</button>
                            </div> 
                            {
                                this.state.testArr.map((testData, index) => {
                                    return(
                                    <div className = 'question' key={index} style = {{padding : 10,background : 'black'}}>
                                        <div className = 'row' style = {{padding : 10}}>
                                            <div className = 'col-md-6'>
                                            <input value = {testData[0]} onChange = {this.handleInput.bind(this,0)} placeholder = 'Test Name' />   
                                            </div> 
                                            <div className = 'col-md-6'>
                                            <input value = {testData[1]} onChange = {this.handleInput.bind(this,1)} placeholder = 'Test Code' />   
                                            </div>    
                                        </div>{
                                            this.state.testArr[0][2].map((questionData, questionIndex) =>{
                                                return(
                                                    <div key={questionIndex} style = {{padding : 10,border : '2px solid black',background : 'blue',borderSizing : 'border-box'}}>
                                                        <div className = 'row'>
                                                            <div className = 'col-md-10' style = {{alignContent : 'center',padding : 10}}><textarea rows= '1' style = {{width : '90%'}} onChange = {this.addOption.bind(this,questionIndex,0)} value = {questionData[0]}></textarea></div>
                                                            <div className = 'col-md-2' style = {{alignContent : 'center',padding : 10}}><button onClick=  {this.deleteQuestion.bind(this,questionIndex)}>-</button></div>
                                                        </div> 
                                                        <div className = 'row' style = {{padding : 10}}>
                                                            <div className = 'col-md-3'  style = {{padding : 10}}>
                                                               <input value = {questionData[1]} onChange = {this.addOption.bind(this,questionIndex,1)} placeholder='Enter Option A' /> 
                                                            </div>
                                                            <div className = 'col-md-3'  style = {{padding : 10}}>
                                                               <input value = {questionData[2]}  onChange = {this.addOption.bind(this,questionIndex,2)} placeholder='Enter Option B' /> 
                                                            </div>
                                                            <div className = 'col-md-3'  style = {{padding : 10}}>
                                                               <input  value = {questionData[3]} onChange = {this.addOption.bind(this,questionIndex,3)} placeholder='Enter Option C' /> 
                                                            </div>
                                                            <div className = 'col-md-3'  style = {{padding : 10}}>
                                                               <input value = {questionData[4]} onChange = {this.addOption.bind(this,questionIndex,4)}  placeholder='Enter Option D' /> 
                                                            </div>
                                                        </div>   
                                                    </div>
                                                )
                                            })
                                     }
                                        <div className = 'row' style = {{padding : 10}}>
                                            <div className = 'col-md-4' style = {{padding : 10}}>
                                                 <button onClick = {this.addQuestion.bind(this,index)}>+ Add Question</button>
                                            </div>
                                            <div className = 'col-md-4'>
                                                 <button onClick = {this.cancelTestQuestions.bind(this)}>Cancel</button>
                                            </div>    
                                        </div>    
                                    </div>    
                                        )
                                })
                            }   
                        </div>
                    </div>
                </Card>
                </div>    
        )
    }
}
