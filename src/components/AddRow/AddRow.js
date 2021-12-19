    import React, { Component } from 'react'
    import { FaRegPlusSquare } from 'react-icons/fa'
    import AddDrawer from './AddDrawer';
    import './AddRow.css'

    export default class AddRow extends Component {
    handleClick=()=>{
        this.setState({addClicked:true});
    }
    constructor(props) {
        super(props)

        this.state = {
            addClicked:false,
            newData:null,
            tableColumnHeadings:[],
            tableData:null,
        }
    }
    handleBack=()=>{
        this.setState({addClicked:false})
    }

    static getDerivedStateFromProps=(props,state)=>{
        return {tableData:props.tableData, tableColumnHeadings:props.tableColumnHeadings,nextUID:props.nextUID};
    }
    passNewData=(newRowObject)=>{
        let tempRowObject={unique_id:this.state.nextUID,...newRowObject};
        this.props.updateNextUID(this.state.nextUID+1);
        this.setState({addClicked:false})
        this.props.passNewData(tempRowObject)
        // this.props.passNewData(newRowObject);
    }
    render() {
        return (
            <div className='add-btn-div'>
                <button className='add-btn' onClick={this.handleClick}><FaRegPlusSquare/>Add Row</button>
                {this.state.addClicked?<AddDrawer 
                        tableColumnHeadings={this.state.tableColumnHeadings} 
                        nextUID={this.state.nextUID} 
                        handleBack={this.handleBack} 
                        passNewData={this.passNewData} 
                        />
                :null}
            </div>
        )
    }
}
