import React, { Component } from 'react'
import InfoApi from '../InfoApi/InfoApi'
import Row from './Row'
import SideDrawer from './SideDrawer'
import TableHeading from './TableHeading'
import './Table.css'
import AddRow from '../AddRow/AddRow'
import Compare from '../InfoApi/Compare'
import Download from '../InfoApi/Download'
import Loading from './Loading'


class Table extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            tableData:[], //stores the table data 
            elementToBeUpdated:null, //stores the UID of element which needs to be edited
            id:'unique_id', //stores the UID element of the data
            sortId:'', //stores the column by which sorting needs to be done
            sortDirection:0, //stores the direction of sort
            rowChecked:[], //stores the uid of rows which are checked
            nextUID:1, //stores the next UID to be assigned in case a new row is added
            tableColumnHeadings:[], // stores the column headers of the table
            newRowData:null, //stores the data of new row to be added
            compareClicked:false,
            loading:true,
        }
    }
    componentDidMount=()=>{
        console.log('idhar');
        this.setState(localStorage.getItem('state')?JSON.parse(localStorage.getItem('state')):{tableData:this.state.tableData},()=>{
            this.setState({loading:false})
        });
    }
    componentDidUpdate=()=>{
        localStorage.setItem('state',JSON.stringify(this.state,function(key, value) { return value === undefined ? null : value; }))
    }
    getData=(data,typeOfOperation)=>{ // gets data and type of operation performed from InfoApi and stores data in tableData accordingly
        console.log('aya kya');
        if(typeOfOperation==='delete-operation'){
            this.setState({tableData:[...data],tableColumnHeadings:Object.keys(data[0])},()=>{this.setState({loading:false})});
        }
        else{
            this.clearRowChecked();
            console.log('aya');
            this.setState({tableData:[]},()=>{ //needed to set to [] first so that all the rows are newly made, else the checked/notChecked class anomaly happens
                this.setState({tableData:[...data],tableColumnHeadings:Object.keys(data[0])},()=>{this.setState({loading:false})});})
        }
        
    }
    handleBack=()=>{ //handles when user goes back from edit page
        this.setState({elementToBeUpdated:null});
    }
    handleToBeUpdated=(elementId)=>{ //sets elementToBeUpdated to the uid of element which needs to be updated
        this.setState({elementToBeUpdated:elementId});    
    }
    handleEditChange=(unique_id,data)=>{ //handles 
        this.setState({loading:true},()=>{
            let tempRowData=[...this.state.tableData];
            for(let i in this.state.tableData){
            if(this.state.tableData[i]['unique_id']===unique_id){
                console.log(this.state.tableData[i]);
                tempRowData[i]=data;
            }
        }
        this.setState({tableData:tempRowData},()=>{this.setState({elementToBeUpdated:null});this.setState({loading:false})})
        });  
    }
    handleBulkEdit=(selectedColumn,bulkEditInput)=>{
        let tempRowData=[...this.state.tableData];
        for(let i of this.state.rowChecked){
            for(let j in tempRowData){
                if(tempRowData[j]['unique_id']===i){
                    tempRowData[j]={...tempRowData[j],[selectedColumn]:bulkEditInput};
                }
            }
        }
        this.setState({tableData:tempRowData});
    }
    handleSort=(sortId,sortDirection)=>{ // sets the value of sortId and sortDirection taken from TableHeading component
        this.setState({sortId:sortId,sortDirection:sortDirection})
    }
    handleChecked=(id,checkBoxClicked)=>{ //updates the rowChecked state to the array of UID of rows which are currently selected/checked
        if(checkBoxClicked){
            this.setState({rowChecked:[...this.state.rowChecked,id]})
        }
        else{
            let tempArr=this.state.rowChecked.filter((a)=>{
                return a!==id
            })
            this.setState({rowChecked:[...tempArr]})
        }
    }
    handlePassData=()=>{ 
        //this function handles the table data which needs to be passed 
        //i.e it sorts the data based on what sort is needed and passes it to Row component for rendering
        let temp=[...this.state.tableData];
        console.log(temp,temp===[{}]);
        if(!this.state.tableData||!this.state.tableData[0]){
            console.log('hello');
        }
        else if(this.state.sortId===''){
            console.log('hello1');
        }
        else if(this.state.tableData&&this.state.tableData[0]&&typeof(this.state.tableData[0][this.state.sortId])!=='number'){
            if( this.state.sortDirection===1){
                temp.sort((a, b) => {
                    let fa = a[this.state.sortId],
                        fb = b[this.state.sortId];
                
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
            }
            else if(this.state.sortDirection===2){
                temp.sort((a, b) => {
                    let fa = a[this.state.sortId],
                        fb = b[this.state.sortId];
                
                    if (fa > fb) {
                        return -1;
                    }
                    if (fa < fb) {
                        return 1;
                    }
                    return 0;
                });
            }
        }
        else {
            if( this.state.sortDirection===1){
                temp.sort((a, b) => {
                    let fa = parseFloat(a[this.state.sortId]),
                        fb = parseFloat(b[this.state.sortId]);
                
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
            }
            else if(this.state.sortDirection===2){
                temp.sort((a, b) => {
                    let fa = parseFloat(a[this.state.sortId]),
                        fb = parseFloat(b[this.state.sortId]);
                
                    if (fa > fb) {
                        return -1;
                    }
                    if (fa < fb) {
                        return 1;
                    }
                    return 0;
                });
            }   
        }
        return temp;
    }
    setId=(id)=>{ //sets the UID of the table
        this.setState({id:id});
    }
    clearRowChecked=()=>{ //clears the rowChecked state array
        this.setState({rowChecked:[]})
    }
    updateNextUID=(nextUID)=>{ //updates the nextUID state
        this.setState({nextUID:nextUID});
    }
    passNewData=(newRowData)=>{
        console.log('hello there',newRowData);
        this.setState({tableData:[...this.state.tableData,newRowData]});
    }
    handleCompare=()=>{
        this.setState({compareClicked:true});
    }
    handleCompareBack=()=>{
        this.setState({compareClicked:false});
    }
    handleLoading=()=>{
        this.setState({loading:!this.state.loading});
    }
    render() {
        if(this.state.loading){
            return <Loading/>
        }
        else{
            return (
                <div className='main-app'>
                    <InfoApi 
                    getData={this.getData} 
                    setId={this.setId} 
                    rowChecked={this.state.rowChecked} 
                    clearRowChecked={this.clearRowChecked} 
                    updateNextUID={this.updateNextUID} 
                    handleCompare={this.handleCompare}
                    tableColumnHeadings={this.state.tableColumnHeadings}
                    newRowData={this.state.newRowData}
                    tableData={this.state.tableData}
                    handleLoading={this.handleLoading}
                    handleBulkEdit={this.handleBulkEdit}
                    />
                    <div className='app'>
                        <table className='main-table'>
                            <thead>
                                <tr className='table-heading'>
                                <TableHeading data={this.state.tableData} tableColumnHeadings={this.state.tableColumnHeadings} handleSort={this.handleSort}/>
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                            {this.state.tableData&&this.state.tableData!==[]?this.handlePassData().map((element) => { 
                                let newObj={};
                                for(let keys in element){
                                    if(keys==='unique_id'){
    
                                    }
                                    else{
                                        newObj={...newObj,[keys]:element[keys]};
                                    }
                                }
                                 return <Row 
                                 rowData={newObj} 
                                 key={element.unique_id} 
                                 getToBeUpdated={this.handleToBeUpdated} 
                                 id={this.state.id} 
                                 idValue={element.unique_id} 
                                 handleChecked={this.handleChecked}
                                 tableData={this.state.tableData}
                                 rowChecked={this.state.rowChecked}
                                 /> })
                                 :null}
                            </tbody>
                        </table>
                        {this.state.compareClicked?
                            <Compare 
                            tableColumnHeadings={this.state.tableColumnHeadings} 
                            rowChecked={this.state.rowChecked}
                            handleCompareBack={this.handleCompareBack}
                            selectedRowsData={this.state.tableData.filter((element)=>{
                                for(let i of this.state.rowChecked){
                                    if(element.unique_id===i){
                                        return true;
                                    }
                                }
                                return false;
                            })}
                            />
                        :null}
                        {this.state.elementToBeUpdated?<SideDrawer 
                        rowData={this.state.tableData.filter((data)=>{ return data[this.state.id]===this.state.elementToBeUpdated })}
                        tableColumnHeadings={this.state.tableColumnHeadings}
                        handleEditChange={this.handleEditChange}
                        handleBack={this.handleBack}
                        />:null}
                        <div className='lower-btns'>
                            <AddRow 
                            tableColumnHeadings={this.state.tableColumnHeadings} 
                            nextUID={this.state.nextUID} 
                            updateNextUID={this.updateNextUID} 
                            handleBack={this.handleBack} 
                            passNewData={this.passNewData} 
                            handleAdd={this.handleAdd} 
                            tableData={this.state.tableData}
                            />
                            <Download 
                            tableData={this.state.tableData} 
                            tableColumnHeadings={this.state.tableColumnHeadings.filter((ele)=>{
                               return ele!=='unique_id';
                            })}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Table
