import React, { Component } from 'react'
import axios from 'axios';

export default class Createuser extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
        }
    }
    changeHandler=(e)=>{
        this.setState({
            username: e.target.value,
        })
    }

    submitHandler=(e)=>{
        e.preventDefault();
        let user={
            username: this.state.username,
        }
        console.log(user);
        axios.post('http://localhost:5000/users/add',user)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
        this.setState({
            username:"",
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={(e)=>this.submitHandler(e)}>
                <div className="form-group">
                <label>Username:</label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={(e)=>this.changeHandler(e)}   
                    />
            </div>
            <input className="btn btn-primary" type="submit" value="Create Exercise Log"/>
                </form>
            </div>
        )
    }
}
