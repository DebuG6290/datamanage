import React, { Component } from 'react'
import './TableHeading.css'
import { FaArrowDown,FaArrowUp } from "react-icons/fa";

export class TableHeading extends Component {
    constructor(props) {
        super(props)
        this.state = {
             sortValue:0,
             sortId:null,
        }
    }
    handleClick(Id){
        let sortValue=this.state.sortValue;
        if(this.state.sortId===Id){
            if(this.state.sortValue===2){
                sortValue=0;
            }
            else{
                sortValue++;
            }
        }
        else{
            sortValue=1;
        }
        this.setState({sortValue:sortValue,sortId:Id},()=>{this.props.handleSort(Id,this.state.sortValue);})
    }
    
    render() {
        return (
            <>
                    <th className='heading'>Select</th>
                    <th className='heading'>Edit</th>
                    <th className='heading'>Image</th>
                    <th className='heading' onClick={()=>this.handleClick('first_name')}>First Name
                        {this.state.sortValue===1&&this.state.sortId==='first_name'&&<FaArrowUp/>}
                        {this.state.sortValue===2&&this.state.sortId==='first_name'&&<FaArrowDown/>}
                    </th>
                    <th className='heading' onClick={()=>this.handleClick('last_name')}>Last Name
                        {this.state.sortValue===1&&this.state.sortId==='last_name'&&<FaArrowUp/>}
                        {this.state.sortValue===2&&this.state.sortId==='last_name'&&<FaArrowDown/>}
                    </th>
                    <th className='heading' onClick={()=>this.handleClick('email')}>Email
                        {this.state.sortValue===1&&this.state.sortId==='email'&&<FaArrowUp/>}
                        {this.state.sortValue===2&&this.state.sortId==='email'&&<FaArrowDown/>}
                    </th>
            </>
        )
    }
}

export default TableHeading
