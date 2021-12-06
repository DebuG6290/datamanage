import React, { Component } from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import './SideDrawer.css'

export class SideDrawer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            personInfo:this.props.data[0],
            personInfoKeyArray:Object.keys(this.props.data[0])
        }
    }
    handleSubmit=()=>{
        this.props.handleChange();
    }
    checkImgUrl=(element)=>{
        
        console.log(element);
        return((element+'').match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props.data[0]);
        return  {personInfo: props.data[0], personInfoKeyArray:Object.keys(props.data[0])};
      }
    render() {
        return (
            <div className='main-sideDrawer'>
                <div className='close-btn' onClick={()=>{this.props.handleChange();}}><FaArrowAltCircleRight/></div>
                {this.state.personInfoKeyArray&&this.state.personInfoKeyArray.map((element)=>{
                    if(this.checkImgUrl(this.state.personInfo[element])){
                        return (
                            <div className='sideDrawer-ele'>
                                <img src={this.state.personInfo[element]} alt='img'/>
                            </div>
                        )
                    }
                    else{
                        return(
                            <div  className='sideDrawer-ele'>
                                <div className='sideDrawer-ele-heading'>{element}</div>
                                <input className='sideDrawer-ele-input'value={this.state.personInfo[element]}></input>
                            </div>
                        )
                    }
                })}
                {/* <div className='sideDrawer-ele'>
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
                </div> */}
                <button className='submit-btn' onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default SideDrawer
