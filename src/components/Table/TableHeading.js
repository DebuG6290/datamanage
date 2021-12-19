import React, { Component } from 'react'
import './TableHeading.css'
import { FaArrowDown,FaArrowUp } from "react-icons/fa";

export class TableHeading extends Component {
    constructor(props) {
        super(props)
        this.state = {
             sortDirection:0,  //stores the direction of sort
             sortId:null, //stores the column by which sorting needs to be done
             headings:[] //stores the different column headings of the table
        }
    }
    handleClick(Id){   //handles and updates sort direction and column when a column header is clicked
        let sortDirection=this.state.sortDirection;
        if(this.state.sortId===Id){
            if(this.state.sortDirection===2){
                sortDirection=0;
            }
            else{
                sortDirection++;
            }
        }
        else{
            sortDirection=1;
        }
        this.setState({sortDirection:sortDirection,sortId:Id},()=>{
            this.props.handleSort(Id,this.state.sortDirection);
        }) //sets the sort id and direction and calls handleSort of Table component
    }
    static getDerivedStateFromProps(props, state) {
        if(props.tableColumnHeadings)
        return  {headings: props.tableColumnHeadings};
      }
    render() {
        return (
            <>
                    <th className='heading' key='checker'></th>
                    <th className='heading' key='editor'>Edit</th>
                    {this.state.headings&&this.state.headings.map((element)=>{
                        if(element!=='unique_id'){
                            return (
                                <th key={element} className='heading' onClick={()=>this.handleClick(`${element}`)}>{element.toUpperCase()}
                                    {this.state.sortDirection===1&&this.state.sortId===`${element}`&&<FaArrowUp/>}
                                    {this.state.sortDirection===2&&this.state.sortId===`${element}`&&<FaArrowDown/>}
                                </th>
                            );
                        }
                        else return null;
                    })
                    }      
            </>
        )
    }
}

export default TableHeading
