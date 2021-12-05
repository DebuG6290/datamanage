import React, { Component } from 'react'

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
            <div style={{position:'absolute',top:'0',right:'0',border:'1px solid black',width:'40vw',backgroundColor:'white'}}>
                <div>
                    <img src={this.state.personInfo.avatar} alt='img'/>
                </div>
                <div>
                    <div>First Name</div>
                    <div>{this.state.personInfo.first_name}</div>
                </div>
                <div>
                    <div>Last Name</div>
                    <div>{this.state.personInfo.last_name}</div>
                </div>
                <div>
                    <div>Email</div>
                    <div>{this.state.personInfo.email}</div>
                </div>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default SideDrawer
