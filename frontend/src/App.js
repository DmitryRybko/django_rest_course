import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Projects.js';
import ToDoList from './components/ToDo.js';
import ProjectForm from "./components/ProjectForm";
import ProjectDetail from "./components/ProjectItem";
import LoginForm from "./components/Auth";
import ToDoForm from "./components/ToDoForm";
import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Header from './components/Header';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'users': [],
        'projects': [],
        'todos': [],
        'token': '',
        'current_user': 'Default User',
    }
  }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todolist/${id}`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    createProject(name, users) {
        const headers = this.get_headers()
        const data = {name: name, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                const users = this.state.users.filter((item) => item.id === new_project.users)[0]
                new_project.users = users
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    createToDo(title) {
        const headers = this.get_headers()
        const data = {title: title}
        axios.post(`http://127.0.0.1:8000/api/todolist/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }


    set_token(token) {
      const cookies = new Cookies()
      cookies.set('token', token)
      this.setState({'token': token}, ()=>this.load_data())
  }

    set_current_user(user) {
        const cookies = new Cookies()
        cookies.set('current_user', user)
        this.setState({'current_user': user}, ()=>this.load_data())
    }


    get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
        })
        .catch(error => alert('Неверный логин или пароль'))
  }

  is_authenticated() {
    return this.state.token !=='';

  }

  logout() {
    this.set_token('')
      this.set_current_user('')
  }

  get_token_from_storage() {
     const cookies = new Cookies()
     const token = cookies.get('token')
     this.setState({'token': token}, ()=>this.load_data())
  }

  get_current_user_from_storage() {
      const cookies = new Cookies()
      const current_user = cookies.get('current_user')
      this.setState({'current_user': current_user}, ()=>this.load_data())
  }


  get_headers() {
      let headers = {
          'Content-Type': 'application/json'
      }
      if (this.is_authenticated())
      {
          headers['Authorization'] = 'Token ' + this.state.token
      }
      return headers
  }


  load_data () {
      let users_url = 'http://127.0.0.1:8000/api/users'
      let projects_url = 'http://127.0.0.1:8000/api/projects'
      let todos_url = 'http://127.0.0.1:8000/api/todolist'

      const headers = this.get_headers()

      const usersRequest = axios.get(users_url, {headers});
      const projectsRequest = axios.get(projects_url, {headers});
      const todosRequest = axios.get(todos_url, {headers});

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

          .catch(error => {
              console.log(error)
              this.setState({todos: []})
          })
  }

  componentDidMount() {
    this.get_token_from_storage()
      this.get_current_user_from_storage()
    this.load_data ()

  }

  render() {
    return (
        <div className="maincontainer">

            <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">USER LIST |</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/projects">PROJECTS |</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/todos">TODOs |</a>
                    </li>
                    {this.is_authenticated () ?
                       <div><li className="nav-item active">
                           <a className="nav-link" href='#'>Logged in as {this.state.current_user} | </a></li>
                       <li className="nav-item active"><button onClick={() => this.logout()}>Logout</button></li></div> :
                       <a className="nav-link" href='/login'>Login |</a>}

                </ul>
            </nav>

            <BrowserRouter>

                <Route exact path='/' component={() => <UserList users={this.state.users} /> } />
                <Route exact path='/projects' component={() =>
                    <ProjectList projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)}/> } />

                <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos}
                                                                      deleteToDo={(id)=>this.deleteToDo(id)} /> } />
                <Route exact path='/todos/create' component={() =>
                    <ToDoForm createBook={(title) => this.createToDo(title)} />} />

                <Route path="/project/:id">
                    <ProjectDetail items={this.state.todos} />
                </Route>
                <Route exact path='/login' component={() => <LoginForm
                    get_token={(username, password) => this.get_token(username, password)} />} />
                <Route exact path='/projects/create' component={() =>
                    <ProjectForm users = {this.state.users}
                                 createProject={(name, users) => this.createProject(name, users)}/>}  />

            </BrowserRouter>

            <Footer></Footer>
        </div>
    )
  }
}

export default App;
