import React, { Component } from 'react'
import './TableHeading.css'
import { FaArrowDown,FaArrowUp } from "react-icons/fa";

export class TableHeading extends Component {
    constructor(props) {
        super(props)
        this.state = {
             sortValue:0,
             sortId:null,
             headings:[]
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
    static getDerivedStateFromProps(props, state) {
        if(props.data[0])
        return  {headings: Object.keys(props.data[0])};
      }
    render() {
        return (
            <>
                    <th className='heading'></th>
                    <th className='heading'>Edit</th>
                    {this.state.headings&&this.state.headings.map((element)=>{
                        return (
                            <th className='heading' onClick={()=>this.handleClick(`${element}`)}>{element.toUpperCase()}
                                {this.state.sortValue===1&&this.state.sortId===`${element}`&&<FaArrowUp/>}
                                {this.state.sortValue===2&&this.state.sortId===`${element}`&&<FaArrowDown/>}
                            </th>
                        )
                    })}
            </>
        )
    }
}

export default TableHeading
