import React, { Component } from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { CgSoftwareUpload } from "react-icons/cg";
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
        this.props.handleChange(this.state.personInfo.unique_id,this.state.personInfo);
    }
    handleBack=()=>{
        this.props.handleBack();
    }
    checkImgUrl=(element)=>{
        
        // console.log(element);
        return((element+'').match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    handleChange=(event,element)=>{
        console.log(event.target.value)
         this.setState({personInfo:{[element]:event.target.value}},()=>{console.log(this.state.personInfo);});
    }
    static getDerivedStateFromProps(props, state) {
        // console.log(props.data[0]);
        return  {personInfo: props.data[0], personInfoKeyArray:Object.keys(props.data[0])};
      }
    render() {
        return (
            <div className='main-sideDrawer'>
                {console.log(this.props.data[0])}
                <h1 className='sideDrawer-heading'>Row Data</h1>
                <div className='close-btn' onClick={()=>{this.props.handleBack();}}><FaArrowAltCircleRight/></div>
                {this.state.personInfoKeyArray&&this.state.personInfoKeyArray.map((element)=>{
                    if(element==='unique_id'){
                        <div  className='sideDrawer-ele'>  
                                <div className='sideDrawer-ele-heading'>{element.toUpperCase()}</div>
                                <input className='sideDrawer-ele-input' disabled value={this.state.personInfo[element]} onChange={(event)=>{this.handleChange(event)}}></input>
                        </div>
                    }
                    else if(this.checkImgUrl(this.state.personInfo[element])){
                        return (
                            <div className='sideDrawer-ele'>
                                <div className='sideDrawer-ele-heading'>{element.toUpperCase()}</div>
                                <img className='sideDrawer-ele-img' src={this.state.personInfo[element]} alt='img'/>
                            </div>
                        )
                    }
                    else{
                        return(
                            <div  className='sideDrawer-ele'>  
                                <div className='sideDrawer-ele-heading'>{element.toUpperCase()}</div>
                                <input className='sideDrawer-ele-input' value={this.state.personInfo[element]} onChange={(event)=>{this.handleChange(event)}}></input>
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
                <button className='submit-btn' onClick={this.handleSubmit}><CgSoftwareUpload/>Save Changes</button>
            </div>
        )
    }
}

export default SideDrawer
