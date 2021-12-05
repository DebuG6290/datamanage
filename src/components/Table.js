import React, { Component } from 'react'
import InfoApi from './InfoApi'
import Row from './Row'
import SideDrawer from './SideDrawer'
import TableHeading from './TableHeading'
import './Table.css'


class Table extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            personInfo:[],
            elementToBeUpdated:null,
            personInfoOriginal:[]
        }
    }
    getData=(data)=>{
        this.setState({personInfo:data,personInfoOriginal:data});
    }
    handleData=()=>{
        
    }
    handleToBeUpdated=(elementId)=>{
        this.setState({elementToBeUpdated:elementId});
    }
    handleChange=()=>{
        this.setState({elementToBeUpdated:null});
    }
    handleSort=(Id,sortValue)=>{
        let temp=this.state.personInfo;
        if(sortValue===1){
            temp.sort((a, b) => {
                let fa = a[Id].toLowerCase(),
                    fb = b[Id].toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        }
        else if(sortValue===2){
            temp.sort((a, b) => {
                let fa = a[Id].toLowerCase(),
                    fb = b[Id].toLowerCase();
            
                if (fa > fb) {
                    return -1;
                }
                if (fa < fb) {
                    return 1;
                }
                return 0;
            });
        }
        else{
            console.log(this.state.personInfoOriginal);
            temp=this.state.personInfoOriginal;
        }
        this.setState({personInfo:temp});
        console.log(this.state.personInfoOriginal);
    }
    render() {
        return (
            <div>
                <InfoApi getData={this.getData}/>
                <div className='app'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                            <TableHeading handleAsc={this.handleAsc} handleDsc={this.handleDsc} handleSort={this.handleSort}/>
                            </tr>
                        </thead>
                        <tbody >
                        {this.state.personInfo?this.state.personInfo.map((element) => { return <tr><Row data={element} getToBeUpdated={this.handleToBeUpdated}/></tr> }):null}
                        </tbody>
                    </table>
                    {this.state.elementToBeUpdated?<SideDrawer 
                    data={this.state.personInfo.filter((data)=>{return data.id===this.state.elementToBeUpdated })}
                    handleChange={this.handleChange}
                    />:null}
                </div>
            </div>
        )
    }
}

export default Table
