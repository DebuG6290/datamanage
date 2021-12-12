import React, { Component } from 'react'
import InfoApi from './InfoApi'
import Row from './Row'
import SideDrawer from './SideDrawer'
import TableHeading from './TableHeading'
import './Table.css'
import AddRow from './AddRow'


class Table extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            personInfo:[],
            elementToBeUpdated:null,
            personInfoOriginal:[],
            id:'unique_id'
        }
    }
    getData=(data)=>{
        this.setState({personInfo:[...data],personInfoOriginal:[...data]},()=>{console.log(this.state.personInfo,this.state.personInfoOriginal);});
        
    }
    handleBack=()=>{
        this.setState({elementToBeUpdated:null});
    }
    handleToBeUpdated=(elementId)=>{
        this.setState({elementToBeUpdated:elementId});
    }
    handleChange=(unique_id,data)=>{
        this.setState({elementToBeUpdated:null});
    }
    handleSort=(Id,sortValue)=>{
        let temp=this.state.personInfo;
        // console.log(this.state.personInfo[0][Id],'helooo');
        if(typeof(this.state.personInfo[0][Id])!=='number'){
            if( sortValue===1){
                temp.sort((a, b) => {
                    let fa = a[Id].toUpperCase(),
                        fb = b[Id].toUpperCase();
                
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
                    let fa = a[Id].toUpperCase(),
                        fb = b[Id].toUpperCase();
                
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
        }
        else {
            if( sortValue===1){
                temp.sort((a, b) => {
                    let fa = parseFloat(a[Id]),
                        fb = parseFloat(b[Id]);
                
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
                    let fa = parseFloat(a[Id]),
                        fb = parseFloat(b[Id]);
                
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
        }
        
        this.setState({personInfo:temp});
        console.log(this.state.personInfoOriginal);
    }
    setId=(id)=>{
        this.setState({id:id});
    }

    render() {
        return (
            <div>
                <InfoApi getData={this.getData} setId={this.setId}/>
                <div className='app'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                            <TableHeading data={this.state.personInfo} handleSort={this.handleSort}/>
                            </tr>
                        </thead>
                        <tbody >
                        {this.state.personInfo?this.state.personInfo.map((element) => { return <tr><Row data={element} getToBeUpdated={this.handleToBeUpdated} id={this.state.id}/></tr> }):null}
                        </tbody>
                    </table>
                    <AddRow handleAdd={this.handleAdd} data={this.state.personInfo}/>
                    {/* {console.log(this.state.personInfo[0]?this.state.personInfo[0][this.state.id]:null)} */}
                    {this.state.elementToBeUpdated?<SideDrawer 
                    data={this.state.personInfo.filter((data)=>{ console.log(this.state.elementToBeUpdated); return data[this.state.id]===this.state.elementToBeUpdated })}
                    handleChange={this.handleChange}
                    handleBack={this.handleBack}
                    />:null}
                </div>
            </div>
        )
    }
}

export default Table
