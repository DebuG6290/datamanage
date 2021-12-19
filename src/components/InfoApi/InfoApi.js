import React, { Component } from 'react'
import { ExcelRenderer} from 'react-excel-renderer';
import './InfoApi.css'
import Operations from './Operations';

export class InfoApi extends Component {
    constructor(props) {
        super(props)
        this.state = {
             apiLink:null,
             apiExtension:'',
             id:null,
             rowChecked:[],
             requestToAdd:false,
             newRowData:null,
        }
    }
    static getDerivedStateFromProps=(props,state)=>{
      return {rowChecked:props.rowChecked,newRowData:props.newRowData,tableColumnHeadings:props.tableColumnHeadings,tableData:props.tableData};
    }
    async componentDidMount() {
      if(this.state.tableData===[]){
        const response = await fetch(`https://reqres.in/api/users?page=2`);
        const json = await response.json();
        console.log(json);
        this.addUID(json.data)
      }
        
    }
    handleSubmitApi=async (e)=>{
      e.preventDefault();
      console.log(this.state.apiExtension,this.state.apiLink);
        const response = await fetch(this.state.apiLink);
        let json=await response.json();
        let s='';
        if(this.state.apiExtension){
          for(let i of this.state.apiExtension){
            if(i==='.'){
              if(s.length){
                json=json[s];
                s='';
              } 
            }
            else{
              s+=i;
            }
          }
        }
        if(s.length){
          json=json[s];
        }
        this.addUID(json);
    }
    handleChange=(event)=>{
         console.log(event);
    }
    fileHandler = (event) => {
        let fileObj = event.target.files[0];
    
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
          if(err){
            console.log(err);            
          }
          else{
            this.setState({
              cols: resp.cols,
              rows: resp.rows
            });
            this.convertToReadableJSON(resp);
          }
        });               
      }
      addUID=(data)=>{
        for(let i=1;i<=data.length;i++){
          let tempObj={};
          tempObj={unique_id:i,...data[i-1]};
          data[i-1]=tempObj;
        }
        this.props.updateNextUID(data.length+1);
        this.props.clearRowChecked();
        this.setState({tableInfo:data},()=>{this.props.getData(data);});
      }

      convertToReadableJSON=(resp)=>{
        let dataArray=[];
        let keyArray=['unique_id']
        keyArray=[...keyArray,...resp.rows[0]];
        let count=1;
        for(let i=1;i<resp.rows.length;i++){
          let tempObj={};
          for(let j=0;j<keyArray.length;j++){
            let tempvar=keyArray[j];
              if(j===0){
                tempObj={...tempObj,...{[tempvar]:count}}
                count++;
              }
              else{
                tempObj={...tempObj,...{[tempvar]:resp.rows[i][j-1]}}
              }
              
          }
          dataArray.push(tempObj);
        }
        this.props.updateNextUID(dataArray.length+1);
        this.props.clearRowChecked();
        this.setState({tableInfo:dataArray},()=>{ this.props.getData(dataArray)})
      }
      // handleSubmitID=(e)=>{
      //   e.preventDefault();
      //   this.props.setId(this.state.id);
      // }
      handleDelete=()=>{
        let tempData=this.state.tableData.filter((element)=>{
          for(let i of this.state.rowChecked){
            if(element.unique_id===i){
              return false;
            }
          }
          return true;
        });
        this.clearRowChecked();
        this.setState({tableData:tempData},()=>{ this.props.getData(tempData,'delete-operation')})
      }
      handleCompare=()=>{
        this.props.handleCompare();
      }

      clearRowChecked=()=>{
        this.props.clearRowChecked();
      }
      handleRequestToAdd=()=>{
        this.setState({requestToAdd:true});
      }
      handleBulkEdit=(selectedColumn,bulkEditInput)=>{
          this.props.handleBulkEdit(selectedColumn,bulkEditInput);
      }

    render() {
        return (
            <>
            <div className='infoapi-main'>
              <div className='input-feilds'>
            <div className='browseFile-main'>
              <label className='browseFile-heading'>Enter an Exel File of Your Choice</label>
              <input type="file" onChange={this.fileHandler.bind(this)} className='browseFile-input' />
            </div>
            <div className='middle'>OR</div>
            <form className='apiForm' onSubmit={(e)=>{this.handleSubmitApi(e)}}>
              <input className='apiForm-input' type='text' onChange={(e)=>{this.setState({apiLink:e.target.value})}} placeholder='Enter JSON File link here'/>
              <input className='apiForm-input' type='text' onChange={(e)=>{this.setState({apiExtension:e.target.value})}} placeholder='Enter Object Extension here'/>
              <input className='apiForm-submit-btn' type='submit' value='Go!'></input>
            </form>
            </div>
            { this.state.rowChecked.length ? 
            <Operations 
            handleDelete={this.handleDelete} 
            handleEdit={this.handleEdit} 
            handleCompare={this.handleCompare}
            rowChecked={this.state.rowChecked} 
            tableColumnHeadings={this.state.tableColumnHeadings}
            tableData={this.state.tableData}
            handleBulkEdit={this.handleBulkEdit}
            />
            :null}
            </div>
            {/* <button onClick={this.handleRequestToAdd()}>Add Row</button>
            {this.state.requestToAdd?<AddDrawer tableColumnHeadings={this.props.tableColumnHeadings}/>:null} */}

            {/* <form onSubmit={(e)=>{this.handleSubmitID(e)}}>
              <label>Enter the Unique ID of your table</label>
              <input type='text' onChange={(e)=>{this.setState({id:e.target.value})}} placeholder='Ex- id , uid (case sensitive)'/>
              <input type='submit' value='Submit ID'></input>
            </form> */}
            
            
            </>
        )
    }
}

export default InfoApi
