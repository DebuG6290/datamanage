import React, { Component } from 'react'
import { FaArrowAltCircleRight, FaCheck, FaTimes } from 'react-icons/fa'
import './Compare.css'

export default class Compare extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    componentDidMount=()=>{
        console.log(this.state.selectedRowsData);
        let tempDataArray=[];
        for(let i of this.state.tableColumnHeadings){
            let tempArray=[i];
            for(let j of this.state.selectedRowsData){
                tempArray=[...tempArray,j[i]];
            }
            tempDataArray=[...tempDataArray,tempArray];
        }
        this.setState({convertedData:[...tempDataArray]})
        
        console.log(tempDataArray);
    }
    static getDerivedStateFromProps=(props,state)=>{
        return {tableColumnHeadings:props.tableColumnHeadings,rowChecked:props.rowChecked,selectedRowsData:props.selectedRowsData}
    }

    checkImgUrl=(element)=>{
        // console.log(element);
        return((element+'').match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    render() {
        return (
            <div className='main-compare'>
                <h1 className='compare-heading'>Comparision View</h1>
                <div className='close-btn' onClick={()=>{this.props.handleCompareBack()}}><FaArrowAltCircleRight/></div>
                <div className='compare-table'>
                    {this.state.convertedData?this.state.convertedData.map((array)=>{
                        if(array[0]!=='unique_id'){
                            let count=0;
                            return <div className='compare-table-array'>
                            {array.map((element)=>{
                                if(count===0){
                                    count++;
                                    return <div className='compare-table-heading'>{element.toUpperCase()}</div>
                                }
                                else if(typeof(element)==='boolean'){
                                    return <div className='compare-table-bool'>{element?<FaCheck/>:<FaTimes/>}</div>
                                }
                               return <div className='compare-table-data'>{element}</div>
                            })}
                        </div>  
                        }
                        else return null;
                    }):null}

                {/* <div className='compare-ele-headings'>
                    {this.state.tableColumnHeadings?this.state.tableColumnHeadings.map((ele)=>{
                        return <div>{ele}</div>
                    }):null}
                </div>
                <div className='compare-data'>
                    {this.state.selectedRowsData?this.state.selectedRowsData.map((element)=>{
                        return <div className='compare-ele'> {Object.values(element).map((ele)=>{
                            if(this.checkImgUrl(ele)){
                                return <img className='compare-ele-img' src={ele} alt={ele}/>
                            }
                            else if(typeof(ele)==='boolean'){
                                return <div className='compare-ele-bool'>{ele?<FaCheck/>:<FaTimes/>}</div>
                            }
                            else{
                                return <div className='compare-ele-data'>{ele}</div>
                            }
                        })}
                        </div>
                    }):null}
                </div> */}
                </div>
            </div>
        )
    }
}
