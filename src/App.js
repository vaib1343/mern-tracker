import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/navbar.component';
import Exerciseslist from './component/exercises-list.component';
import Editexercises from './component/edit-exercises.component';
import Createexercise from './component/create-exercise.component';
import Createuser from './component/create-user.component';

function App() {
  return (
    <BrowserRouter>
    <>
    <div className="container">
    <Navbar/>
    <br/>
    <Route path="/" exact render={()=><Exerciseslist/>}/>
    <Route path="/edit/:id"  component={Editexercises}/>
    <Route path="/create" exact render={()=><Createexercise/>}/>
    <Route path="/user" exact render={()=><Createuser/>}/>
    
    </div>
    </>
    </BrowserRouter>
  );
}

export default App;
