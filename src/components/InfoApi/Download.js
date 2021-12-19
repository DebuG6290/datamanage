import React, { Component, createRef } from 'react'
import JsFileDownloader from 'js-file-downloader'
import './Download.css'
import { FaFileCsv, FaFileDownload, FaRegFileCode, FaTimes } from 'react-icons/fa'

export default class Download extends Component {
    constructor(props) {
        super(props)
        this.dofileDownload=createRef();
        this.fileNames={
            json:'tableData.json',
            csv:'tableData.csv',

        }
        this.state = {
             downloadClicked:false,
             fileDownloadUrl:null,
             fileType:null,

        }
    }
    handleRemoveUidParam=(element,temp)=>{

    }
    handleDownloadClicked=()=>{
        let tempTableData=[];
        this.state.tableData.forEach((element) => { 
            let newObj={};
            for(let keys in element){
                if(keys==='unique_id'){

                }
                else{
                    newObj={...newObj,[keys]:element[keys]};
                }
            }
            tempTableData=[...tempTableData,newObj];});
            console.log(tempTableData);
        this.setState({downloadClicked:true,editedTableData:tempTableData});
    }
    static getDerivedStateFromProps=(props,state)=>{
        return {tableData:props.tableData,tableColumnHeadings:props.tableColumnHeadings};
    }
    handleDownload=(fileType)=>{
        let output;
        if (this.state.fileType === "json") {
            output = JSON.stringify({...this.state.editedTableData}, 
            null, 4);
        }
        else if (this.state.fileType === "csv"){
        // Prepare data:
        let contents = [];
        contents.push (this.state.tableColumnHeadings);
        this.state.editedTableData.forEach(row => {
            let temp=Object.values(row);
            contents.push(temp)
        });
        output = this.makeCSV(contents);
        }
        let blob= new Blob([output]);
        const fileDownloadUrl=URL.createObjectURL(blob);
        // new JsFileDownloader({
        //     url:fileDownloadUrl
        // })
        this.setState({fileDownloadUrl:fileDownloadUrl},()=>{
            console.log(output,blob,fileDownloadUrl);
            console.log(this.dofileDownload);
            this.dofileDownload.current.click(); 
            URL.revokeObjectURL(fileDownloadUrl); 
            this.setState({fileDownloadUrl:null});
        })
        // this.setState({downloadClicked:false})
    }
    makeCSV (content) {
        let csv = '';
      content.forEach(value => {
          value.forEach((item, i) => {
          let innerValue = item === null||item===undefined ? '' : item.toString();
          let result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0) {
            result = '"' + result + '"'
          }
          if (i > 0) {csv += ','}
          csv += result;
        })
          csv += '\n';
        })
      return csv;
    }
    render() {

        return (
            <div className='download-btn-div'>
                {this.state.downloadClicked?null:<button className='download-btn' onClick={()=>{this.handleDownloadClicked()}}><FaFileDownload/>Download File</button>}
                {this.state.downloadClicked?
                <div className='two-download-btns'>
                    <button className='download-btn-close' onClick={()=>this.setState({downloadClicked:false})}><FaTimes/></button>
                    <button className='download-btn' onClick={()=>{this.setState({fileType:'json'},()=>this.handleDownload('json'));}}><FaRegFileCode/>Download JSON</button>
                    <button className='download-btn' onClick={()=>{this.setState({fileType:'csv'},()=>this.handleDownload('csv'));}}><FaFileCsv/>Download CSV</button>
                    <a className="hidden"
                        download={this.fileNames[this.state.fileType]}
                        href={this.state.fileDownloadUrl}
                        ref={this.dofileDownload}
                    >download it</a>
                </div>:null}
            </div>
        )
    }
}
