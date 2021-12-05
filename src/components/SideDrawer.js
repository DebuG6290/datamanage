import React, { Component } from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import './SideDrawer.css'

export class SideDrawer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            personInfo:this.props.data[0]
        }
    }
    handleSubmit=()=>{
        this.props.handleChange();
    }
    static getDerivedStateFromProps(props, state) {
        return  {personInfo: props.data[0]};
      }
    render() {
        return (
            <div className='main-sideDrawer'>
                <div className='close-btn' onClick={()=>{this.props.handleChange();}}><FaArrowAltCircleRight/></div>
                <div className='sideDrawer-ele'>
                    <img src={this.state.personInfo.avatar} alt='img'/>
                </div>
                <div  className='sideDrawer-ele'>
                    <div className='sideDrawer-ele-heading'>First Name</div>
                    <input className='sideDrawer-ele-input'value={this.state.personInfo.first_name}></input>
                </div>
                <div className='sideDrawer-ele'>
                    <div className='sideDrawer-ele-heading'>Last Name</div>
                    <input className='sideDrawer-ele-input'value={this.state.personInfo.last_name}></input>
                </div>
                <div className='sideDrawer-ele'>
                    <div className='sideDrawer-ele-heading'>Email</div>
                    <input className='sideDrawer-ele-input'value={this.state.personInfo.email}></input>
                </div>
                <button className='submit-btn' onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default SideDrawer
