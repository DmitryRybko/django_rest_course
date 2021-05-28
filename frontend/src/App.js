import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Projects.js';
import ToDoList from './components/ToDo.js';
import ProjectDetail from "./components/ProjectItem";
import axios from 'axios';
import {BrowserRouter, Route, Link} from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';


let users_url = 'http://127.0.0.1:8000/api/users'
let projects_url = 'http://127.0.0.1:8000/api/projects'
let todos_url = 'http://127.0.0.1:8000/api/todolist'

const usersRequest = axios.get(users_url);
const projectsRequest = axios.get(projects_url);
const todosRequest = axios.get(todos_url);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'users': [],
        'projects': [],
        'todos': [],
    }
  }

  componentDidMount() {
    axios
        .all([usersRequest, projectsRequest, todosRequest])
        .then(
          axios.spread((...responses) => {
              const responseUsers = responses[0].data.results;
              const responseProjects = responses[1].data.results;
              const responseToDos = responses[2].data.results;

              this.setState(
                  {
                      users: responseUsers,
                      projects: responseProjects,
                      todos: responseToDos,
                  }
              )

          }))

        .catch(error => console.log(error))
  }

  render() {
    return (
        <div className="maincontainer">
            <Header></Header>

            <BrowserRouter>

                <Route exact path='/' component={() => <UserList users={this.state.users} /> } />
                <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} /> } />
                <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos} /> } />
                <Route path="/project/:id">
                    <ProjectDetail items={this.state.todos} />
                </Route>

            </BrowserRouter>

            <Footer></Footer>
        </div>
    )
  }
}

export default App;
