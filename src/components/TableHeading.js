import React, { Component } from 'react'
import './TableHeading.css'
import { FaArrowDown,FaArrowUp } from "react-icons/fa";

export class TableHeading extends Component {
    constructor(props) {
        super(props)
        this.state = {
             
        }
    }
    handleAsc=(Id)=>{
        this.props.handleAsc(Id);
    }
    handleDsc=(Id)=>{
        this.props.handleDsc(Id);
    }
    
    render() {
        return (
            <>
                    <th className='heading'>Image</th>
                    <th className='heading'>
                        First Name
                        <div onClick={()=>{this.handleAsc(`first_name`)}}><FaArrowUp/></div>
                        <div onClick={()=>{this.handleDsc(`first_name`)}}><FaArrowDown/></div>
                    </th>
                    <th className='heading'>Last Name
                        <div onClick={()=>{this.handleAsc(`last_name`)}}><FaArrowUp/></div>
                        <div onClick={()=>{this.handleDsc(`last_name`)}}><FaArrowDown/></div>
                    </th>
                    <th className='heading'>Email
                        <div onClick={()=>{this.handleAsc(`email`)}}><FaArrowUp/></div>
                        <div onClick={()=>{this.handleDsc(`email`)}}><FaArrowDown/></div>
                    </th>
            </>
        )
    }
}

export default TableHeading
