import React from 'react'
import './togel.css'

const ToogleButton = props => {
    return (
        <button className = 'toggleButton'>
            <div className = 'toggleButton-line' />
            <div className = 'toggleButton-line' />
            <div className = 'toggleButton-line' />
        </button>    
    )
}

export default ToogleButton;