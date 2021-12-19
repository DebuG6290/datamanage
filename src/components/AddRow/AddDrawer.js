import React, { Component } from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa';
import './AddDrawer.css'
import {BsPlusSquare} from "react-icons/bs";

export default class AddDrawer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             newData:{},
             tableColumnHeadings:null,
             dataSize:this.props.dataSize,
        }
    }
    componentDidMount=()=>{
        let tempObj={};
        for(let headings of this.props.tableColumnHeadings){
            tempObj={...tempObj,[headings]:null};
        }
        console.log(tempObj);
        this.setState({newData:tempObj})
    }
    handleBack=()=>{
        this.props.handleBack();
    }
    handleChange=(columnHeading,event)=>{
        this.setState({newData:{...this.state.newData,[columnHeading]:event.target.value}});
    }
    handleSubmit=()=>{
        this.props.passNewData(this.state.newData);
    }
    static getDerivedStateFromProps=(props,state)=>{
        return {tableColumnHeadings:props.tableColumnHeadings};
    }
    render() {
        return (
            <div className='main-addDrawer'>
                <h1 className='addDrawer-heading'>Add Data</h1>
                <div className='close-btn' onClick={()=>{this.props.handleBack();}}><FaArrowAltCircleRight/></div>
                {this.state.tableColumnHeadings?this.state.tableColumnHeadings.map((e)=>{
                    if(e!=='unique_id'){
                        return (
                            <div  className='addDrawer-ele' key={e}>
                                    <div className='addDrawer-ele-heading'>{e.toUpperCase()}</div>
                                    <input className='addDrawer-ele-input' value={this.state.newData&&this.state.newData[e]?this.state.newData[e]:''} onChange={(event)=>{this.handleChange(e,event)}}></input>
                            </div>
                        )
                    }
                }):null}
                <button className='submit-btn' onClick={this.handleSubmit}><BsPlusSquare/>Add New Row</button>
            </div>
        )
    }
}
