import React, { Component } from 'react'
import InfoApi from './InfoApi'
import Row from './Row'
import SideDrawer from './SideDrawer'
import TableHeading from './TableHeading'
import './Table.css'


class Table extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            personInfo:[],
            elementToBeUpdated:null
        }
    }
    getData=(data)=>{
        this.setState({personInfo:data});
    }
    handleData=()=>{
        
    }
    handleToBeUpdated=(elementId)=>{
        this.setState({elementToBeUpdated:elementId});
    }
    handleChange=()=>{
        this.setState({elementToBeUpdated:null});
    }
    handleDsc=(Id)=>{
        let temp=this.state.personInfo;
        switch (Id) {
            case 'first_name':
                temp.sort((a, b) => {
                    let fa = a.first_name.toLowerCase(),
                        fb = b.first_name.toLowerCase();
                
                    if (fa > fb) {
                        return -1;
                    }
                    if (fa < fb) {
                        return 1;
                    }
                    return 0;
                });
                break;
                case 'last_name':
                    temp.sort((a, b) => {
                        let fa = a.last_name.toLowerCase(),
                            fb = b.last_name.toLowerCase();
                    
                        if (fa > fb) {
                            return -1;
                        }
                        if (fa < fb) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
                case 'email':
                    temp.sort((a, b) => {
                        let fa = a.email.toLowerCase(),
                            fb = b.email.toLowerCase();
                    
                        if (fa > fb) {
                            return -1;
                        }
                        if (fa < fb) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
        
            default:
                break;
        }
        this.setState({personInfo:temp})
        console.log(this.state.personInfo);
    }
    handleAsc=(Id)=>{
        let temp=this.state.personInfo;
        switch (Id) {
            case 'first_name':
                temp.sort((a, b) => {
                    let fa = a.first_name.toLowerCase(),
                        fb = b.first_name.toLowerCase();
                
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
                break;
                case 'last_name':
                    temp.sort((a, b) => {
                        let fa = a.last_name.toLowerCase(),
                            fb = b.last_name.toLowerCase();
                    
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
                case 'email':
                    temp.sort((a, b) => {
                        let fa = a.email.toLowerCase(),
                            fb = b.email.toLowerCase();
                    
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
        
            default:
                break;
        }
        this.setState({personInfo:temp})
        console.log(this.state.personInfo);
    }
    render() {
        return (
            <div>
                <InfoApi getData={this.getData}/>
                <div className='app'>
                    <table style={{width:'100vw',borderSpacing:'0px'}}>
                        <thead>
                            <tr>
                            <TableHeading handleAsc={this.handleAsc} handleDsc={this.handleDsc}/>
                            </tr>
                        </thead>
                        <tbody >
                        {this.state.personInfo?this.state.personInfo.map((element) => { return <tr><Row data={element} getToBeUpdated={this.handleToBeUpdated}/></tr> }):null}
                        </tbody>
                    </table>
                    {this.state.elementToBeUpdated?<SideDrawer 
                    data={this.state.personInfo.filter((data)=>{return data.id===this.state.elementToBeUpdated })}
                    handleChange={this.handleChange}
                    />:null}
                </div>
            </div>
        )
    }
}

export default Table
