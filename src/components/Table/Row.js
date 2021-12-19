import React, { Component } from 'react'
import './Row.css'
import { FaCheck, FaUserEdit,FaTimes } from 'react-icons/fa'
export class Row extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            rowData: this.props.rowData,
            rowDataArray:(Object.values(this.props.rowData)),
            id:props.id,
            checkboxClicked:false,
            idValue:props.idValue,

        }
    }
    // componentDidUpdate=()=>{
    //     if(this.state.checkboxClicked===true){
    //         this.setState({checkboxClicked:false});
    //     } 
    // }
    handleCheckboxClicked=()=>{
        let flag=1;
        for(let id of this.state.rowChecked){
            if(id===this.state.idValue){
                this.setState({checkboxClicked:false},()=>{
                    this.props.handleChecked(this.state.idValue,this.state.checkboxClicked)
                });
                flag=0;
                break;
            }
        }
        if(flag){
            this.setState({checkboxClicked:!this.state.true},()=>{
                this.props.handleChecked(this.state.idValue,this.state.checkboxClicked)
            });
        }
        this.setState({checkboxClicked:!this.state.checkboxClicked},()=>{
            this.props.handleChecked(this.state.idValue,this.state.checkboxClicked)
        });
    } 
    handleEdit=()=>{
        this.props.getToBeUpdated(this.state.idValue);
    }
    checkImgUrl=(element)=>{
        return((element+'').match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    static getDerivedStateFromProps(props, state) {
        return  {rowDataArray: Object.values(props.rowData), rowData:props.rowData,tableData:props.tableData,rowChecked:props.rowChecked};
      }


    render() {
        return (
            <> 
            <tr key={this.state.rowDataArray[0]} className={this.state.checkboxClicked?'checked':'notChecked'}>
            <td className={`row-ele ${this.state.checkboxClicked?'checked':'notChecked'}`}><input type="checkbox" onClick={()=>{this.handleCheckboxClicked()}}></input></td> 
            <td className={`row-ele ${this.state.checkboxClicked?'checked':'notChecked'}`} onClick={this.handleEdit}><FaUserEdit/></td>
            {this.state.rowDataArray&&this.state.rowDataArray.map((element)=>{
                if(this.checkImgUrl(element)){
                    return <td className={`row-ele ${this.state.checkboxClicked?'checked':'notChecked'}`}><img src={element} alt={element}/></td>
                }
                else if(typeof(element)==='boolean'){
                    return <td className={`row-ele ${this.state.checkboxClicked?'checked':'notChecked'}`}>{element?<FaCheck/>:<FaTimes/>}</td>
                }
                else{
                    return <td className={`row-ele ${this.state.checkboxClicked?'checked':'notChecked'}`}>{element}</td>
                }  
            })}
            </tr>
            </>
        )
    }
}

export default Row
