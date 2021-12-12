import React, { Component } from 'react'
import './Row.css'
import { FaUserEdit } from 'react-icons/fa'
export class Row extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            data: this.props.data,
            dataArray:Object.values(this.props.data),
            id:props.id
        }
    }
    handleEdit=()=>{
        this.props.getToBeUpdated(this.state.data[this.state.id]);
    }
    checkImgUrl=(element)=>{
        
        // console.log(element);
        return((element+'').match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    static getDerivedStateFromProps(props, state) {
        return  {dataArray: Object.values(props.data), data:props.data};
      }


    render() {
        return (
            <> 
            <td className='row-ele'><input type="checkbox"></input></td> 
            <td className='row-ele' onClick={this.handleEdit}><FaUserEdit/></td>
            {this.state.dataArray&&this.state.dataArray.map((element)=>{
                if(this.checkImgUrl(element)){
                    return <td className='row-ele'><img src={element} alt={element}/></td>
                }
                else{
                    return <td className='row-ele'>{element}</td>
                }  
            })}

            {/* {this.state.data?
              <td className='row-ele'><img src={this.state.data.avatar} alt={this.state.data.first_name}/></td>
            :null}
            <td className='row-ele'>{this.state.data.first_name}</td>
            <td className='row-ele'>{this.state.data.last_name}</td>
            <td className='row-ele'>{this.state.data.email}</td> */}
            </>
        )
    }
}

export default Row
