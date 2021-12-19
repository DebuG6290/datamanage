import React, { Component } from 'react'
import { FaArrowAltCircleRight, FaFileSignature } from 'react-icons/fa'
import './SideDrawer.css'

export class SideDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rowData:{...this.props.rowData[0]},
            tableColumnHeadings:[],
            editedRowData:null,
        }
    }
    handleSubmit=()=>{
        this.props.handleEditChange(this.state.rowData.unique_id,{...this.state.rowData,...this.state.editedRowData})
        
    }
    handleBack=()=>{
        this.props.handleBack();
    }
    checkImgUrl=(element)=>{
        return((element+'').match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    handleChange=(event,element)=>{
        this.setState({editedRowData:{...this.state.editedRowData,[element]:event.target.value}});
    }
    static getDerivedStateFromProps(props, state) {
        return  {rowData: {...props.rowData[0]}, tableColumnHeadings:props.tableColumnHeadings};
      }
    render() {
        return (
            <div className='main-sideDrawer'>
                <h1 className='sideDrawer-heading'>Row Data</h1>
                <div className='close-btn' onClick={()=>{this.props.handleBack();}}><FaArrowAltCircleRight/></div>
                {this.state.tableColumnHeadings&&this.state.tableColumnHeadings.map((element)=>{
                    if(element==='unique_id'){
                        return null
                    }
                    else{
                        return(
                            <div  className='sideDrawer-ele'>  
                                <div className='sideDrawer-ele-heading'>{element.toUpperCase()}</div>
                                <input 
                                className='sideDrawer-ele-input' 
                                value={
                                    this.state.editedRowData?
                                    this.state.editedRowData[element]:
                                    this.state.rowData[element]
                                    } 
                                onChange={(event)=>{this.handleChange(event,element)}}></input>
                            </div>
                        )
                    }
                })}
                <button className='submit-btn' onClick={this.handleSubmit}><FaFileSignature/>Save Changes</button>
            </div>
        )
    }
}

export default SideDrawer
