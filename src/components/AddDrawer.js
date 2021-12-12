import React, { Component } from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa';
import './AddDrawer.css'

export default class AddDrawer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             newData:null,
             personInfoKeyArray:Object.keys(this.props.array[0]),
             dataSize:this.props.dataSize,
        }
    }
    handleBack=()=>{
        this.props.handleBack();
    }

    render() {
        return (
            <div className='main-addDrawer'>
                <h1 className='addDrawer-heading'>Add Data</h1>
                <div className='close-btn' onClick={()=>{this.props.handleBack();}}><FaArrowAltCircleRight/></div>
                {this.state.personInfoKeyArray?this.state.personInfoKeyArray.map((e)=>{
                    return (
                        <div  className='addDrawer-ele'>
                                <div className='addDrawer-ele-heading'>{e.toUpperCase()}</div>
                                <input className='addDrawer-ele-input' value={''} onChange={(event)=>{this.handleChange(event)}}></input>
                        </div>
                    )
                }):null}
                
            </div>
        )
    }
}
