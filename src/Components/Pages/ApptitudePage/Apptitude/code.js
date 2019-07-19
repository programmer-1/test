import React, { Component } from 'react'

export default class Code extends Component {
    render() {
        return (
            <div style = {{padding : 10, background : '#bbbbbb', color: 'd7de6e'}}>
               {this.props.children}
            </div>
        )
    }
}
