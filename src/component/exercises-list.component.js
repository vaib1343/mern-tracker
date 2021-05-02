import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Exercise =(props)=>{
    console.log(props)
    return(<>
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id} >Edit</Link> | <a href="#" onClick={()=>props.delete(props.exercise._id)}>delete</a>
        </td>
    </tr>
    </>)
}

export default class exerciseslist extends Component {
    constructor(props){
        super(props);
        this.state={
            exercises:[],
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
            .then(res=>{
                this.setState({
                    exercises: res.data,
                },()=>console.log("reee",this.state.exercises))
            })
            .catch(err=>console.log(err));
    }

    deleteExercise=(id)=>{
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res=>console.log(res.data));
        this.setState({
            exercises: this.state.exercises.filter(el=> el._id !== id)
        })
    }

    exerciseList=()=>{
        return this.state.exercises.map(currentExercise=>{
            return <Exercise exercise={currentExercise} key={currentExercise._id} delete={this.deleteExercise}/>
        })
    }
    render() {
        return (
            <div>
                <h3>Logged Exercise</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-bordered">{this.exerciseList()}</tbody>
                </table>
            </div>
        )
    }
}
