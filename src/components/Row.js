import React, { Component } from 'react'
import './Row.css'
import { FaUserEdit } from 'react-icons/fa'
export class Row extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            data: this.props.data
        }
    }
    handleEdit=()=>{
        this.props.getToBeUpdated(this.state.data.id);
    }

    static getDerivedStateFromProps(props, state) {
        return  {data: props.data};
      }

    render() {
        return (
            <>  
            {this.state.data?
              <td className='row-ele'><img src={this.state.data.avatar} alt={this.state.data.first_name}/></td>
            :null}
            <td className='row-ele'>{this.state.data.first_name}</td>
            <td className='row-ele'>{this.state.data.last_name}</td>
            <td className='row-ele'>{this.state.data.email}</td>
            <td className='row-ele' onClick={this.handleEdit}><FaUserEdit/></td>
            </>
        )
    }
}

export default Row
