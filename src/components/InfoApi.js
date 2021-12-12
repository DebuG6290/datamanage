import React, { Component } from 'react'
import { ExcelRenderer} from 'react-excel-renderer';
import './InfoApi.css'

export class InfoApi extends Component {
    constructor(props) {
        super(props)
        this.state = {
             cols:null,
             rows:null,
             apiLink:null,
             apiExtension:'',
             id:null
        }
    }
    async componentDidMount() {
        const response = await fetch(`https://reqres.in/api/users?page=2`);
        const json = await response.json();
        // this.setState( json.data );
        console.log(json.data);
        this.addUID(json.data)
        // this.props.getData(json.data);
    }
    // handleSubmitFile=async (event)=>{
    //     event.preventDefault();
    //      console.log(event);
    //     let temp=await fetch(event.target.files);
    //     // console.log(temp.json.data);

    // }

    handleSubmitApi=async (e)=>{
      e.preventDefault();
      console.log(this.state.apiExtension,this.state.apiLink);
        const response = await fetch(this.state.apiLink);
        const json=await response.json();
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
            console.log(resp);
            this.setState({
              cols: resp.cols,
              rows: resp.rows
            },console.log(this.state));
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
        this.props.getData(data);
      }

      convertToReadableJSON=(resp)=>{
        let dataArray=[];
        let keyArray=['unique_id']
        keyArray=[...keyArray,...resp.rows[0]];
        console.log(resp.rows);
        let count=1;
        for(let i=1;i<resp.rows.length;i++){
          let tempObj={};
          for(let j=0;j<keyArray.length;j++){
            let tempvar=keyArray[j];
              // tempObj.push({[tempvar]:[resp.rows[i][j]]});
              if(j===0){
                tempObj={...tempObj,...{[tempvar]:count}}
                count++;
              }
              else{
                tempObj={...tempObj,...{[tempvar]:resp.rows[i][j]}}
              }
              
          }
          dataArray.push(tempObj);
        }
        console.log(dataArray);
        this.props.getData(dataArray)
      }
      // handleSubmitID=(e)=>{
      //   e.preventDefault();
      //   this.props.setId(this.state.id);
      // }

    render() {
        return (
            <>  
            {/* <form onSubmit={this.handleSubmitFile}>
                <input type='file' onChange={this.handleChange}></input>
                <input type='submit' value='submit'></input>
            </form> */}
            <div className='infoapi-main'>
            <div className='browseFile-main'>
              <label className='browseFile-heading'>Enter an Exel File of Your Choice</label>
              <input type="file" onChange={this.fileHandler.bind(this)} className='browseFile-input' />
            </div>
            <div className='middle'>OR</div>
            <form className='apiForm' onSubmit={(e)=>{this.handleSubmitApi(e)}}>
              <input type='text' onChange={(e)=>{this.setState({apiLink:e.target.value})}} placeholder='Enter JSON File link here'/>
              <input type='text' onChange={(e)=>{this.setState({apiExtension:e.target.value})}} placeholder='Enter Object Extension here'/>
              <input type='submit' value='Submit'></input>
            </form>
            </div>
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
