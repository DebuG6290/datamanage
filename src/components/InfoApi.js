import React, { Component } from 'react'

export class InfoApi extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    async componentDidMount() {
        const response = await fetch(`https://reqres.in/api/users?page=2`);
        const json = await response.json();
        this.setState( json.data );
        this.props.getData(json.data);
      }
    render() {
        return (
            <>  
            </>
        )
    }
}

export default InfoApi
