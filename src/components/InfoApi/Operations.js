import React, { Component } from 'react'
import { FaTrash, FaUserEdit, FaUserFriends } from 'react-icons/fa';
import Compare from './Compare';
import './Operations.css'
import {FiColumns} from "react-icons/fi";

export default class Operations extends Component {
constructor(props) {
    super(props)

    this.state = {
         compareClicked:false,
         bulkEditClicked:false,
         selectedColumn:null,
         bulkEditInput:'',
    }
}

    static getDerivedStateFromProps=(props,state)=>{
        return {tableColumnHeadings:props.tableColumnHeadings,rowChecked:props.rowChecked,tableData:props.tableData}
    }

    handleDelete=()=>{
        this.props.handleDelete();
    }
    handleCompare=()=>{
        this.props.handleCompare();
    }
    handleBulkEdit=(e)=>{
        e.preventDefault();
        this.props.handleBulkEdit(this.state.selectedColumn,this.state.bulkEditInput);
        this.setState({bulkEditClicked:false,selectedColumn:null,bulkEditInput:''});
    }

    render() {
        return (
            <div className='operation-btns'>
                <button className='operation-btn compare' onClick={()=>{this.handleCompare()}}><FiColumns/>Compare</button>
                <button className='operation-btn delete' onClick={this.handleDelete}><FaTrash/>Delete</button>
                <button className='operation-btn edit' onClick={()=>{this.setState({bulkEditClicked:!this.state.bulkEditClicked})}}><FaUserFriends/>Bulk Edit</button>
                {this.state.bulkEditClicked?<form className='bulkEdit-form' onSubmit={this.handleBulkEdit}>
                    <div className='column-heading'>
                        <label className='column-heading-label'>Select Column</label>
                        <select className='column-select' onChange={(e)=>{this.setState({selectedColumn:e.target.value})}} value={this.state.selectedColumn}>
                            {this.state.tableColumnHeadings?this.state.tableColumnHeadings.map((column)=>{
                                if(column!=='unique_id')
                                return <option value={column}>{column.toUpperCase()}</option>
                            }):null}
                        </select>
                    </div>
                    <div className='inputValue'>
                        <input className='inputValue-box' type='text' placeholder='Enter the new Value' onChange={(e)=>{this.setState({bulkEditInput:e.target.value})}}/>
                    </div>
                    <button className='bulkEdit-submit-btn' type='submit'>Edit</button>
                </form>
                :null}
            </div>
        )
    }
}
