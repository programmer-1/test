import React, {Component} from 'react'
import man from '../../../Images/man.png'

class Home extends Component{
  render(){
      return(
        <div style = {{padding : 10, marginLeft : 60,marginRight: 60, borderRadius: 15 , background : 'blue'}}>
          <div className='row'>
            <div className = 'col-md-3'>
              <img src = {man} style={{borderRadius: 100/ 2 , borderColor:'black'}} height="100" width="100"></img>
            </div>
            <div className='col-md-9'></div>  
          </div>   
        </div>
      )
  }
}
export default Home