import React, { Component } from 'react'
import { FaRegPlusSquare } from 'react-icons/fa'
import AddDrawer from './AddDrawer';

export default class AddRow extends Component {
handleClick=()=>{
    this.setState({addClicked:true});
}
constructor(props) {
    super(props)

    this.state = {
         addClicked:false,
         newData:null,
         array:this.props.data,
         dataSize:this.props.data.length,
    }
}


    render() {
        return (
            <div>
                <button onClick={this.handleClick}><FaRegPlusSquare/>Add Row</button>
                {this.state.addClicked?<AddDrawer array={this.state.array} dataSize={this.state.dataSize}/>:null}
            </div>
        )
    }
}
