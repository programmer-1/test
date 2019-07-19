import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import './style.css'

const SideDrawer = props =>{
    return (
        <div>
            <nav>
            <ul>
                 <li><Link to = '/'>Home</Link></li> 
                 <li><Link to = '/apptitude'>Apptitude</Link></li> 
                 <li><Link to = '/developer'>Developer</Link></li>   
            </ul>    
        </nav>
        </div>    
     )
}
export default SideDrawer;