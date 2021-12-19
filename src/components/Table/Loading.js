import React, { Component } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import './Loading.css'

export default class Loading extends Component {
    render() {
        return (
            <div className='loading-main'>
                <div className='loading-heading'>Loading Your Table..Please Wait</div>
                <LinearProgress className='loading-bar' color='secondary'/>
            </div>
        )
    }
}
