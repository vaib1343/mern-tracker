import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

export default class Createexercise extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            description:"",
            duration:"",
            date: new Date(),
            users:[],
        }
    }

    componentDidMount(){
    
        axios.get('http://localhost:5000/users/')
            .then(res=>{
                if(res.data.length>0){
                    this.setState({
                        users: res.data.map(user=> user.username),
                        username: res.data[0].username,
                    })
                }
            })
            .catch(err=>console.log(err))
            
    }

    changeHandler=(e,type)=>{
        if(type==="username"){
            this.setState({
                username: e.target.value,
            })
        }
        else if(type==="description"){
            this.setState({
                description: e.target.value,
            })
        }
        else if(type==="duration"){
            this.setState({
                duration: e.target.value,
            })
        }
        else if(type==="date"){
            this.setState({
                date: e,
            })
        }
    }

    onSubmithandle=(e)=>{
        e.preventDefault();
        let {username,description,duration,date}= this.state;
        const exercise={
            username,
            description,
            duration,
            date
        }
        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add',exercise)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))

        window.location='/';
    }

    render() {
        let {username,description,duration,date}=this.state
        return (
            <>
            <h3>Create New Exercise Log</h3>
            <div>
            <form onSubmit={(e)=>this.onSubmithandle(e)}>
            <div className="form-group">
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={(e)=>this.changeHandler(e,"username")}>
                    {
                        this.state.users.map((user)=>{
                            return <option
                                key={user}
                                value={user}>{user}</option>
                        })
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Description:</label>
                <input type="text"
                    required
                    className="form-control"
                    value={description}
                    onChange={(e)=>this.changeHandler(e,"description")}   
                    />
            </div>
            <div className="form-group">
                <label>Duration (in minute):</label>
                <input type="text"
                    required
                    className="form-control"
                    value={duration}
                    onChange={(e)=>this.changeHandler(e,"duration")}   
                    />
            </div>
            <div className="form-group">
                <label>Date:</label>
                <DatePicker
                    selected={date}
                    onChange={(e)=>this.changeHandler(e,"date")}
                />
            </div>
            <input className="btn btn-primary" type="submit" value="Create Exercise Log"/>
            </form>
            </div>
            
            </>
        )
    }
}
