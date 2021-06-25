import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', users: 1}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
        console.log(this.state.users)
    }

    handleSubmit(event) {
        console.log(this.state.name)
        console.log(this.state.users)
        this.props.createProject(this.state.name, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="login">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label htmlFor="users">users</label>

                    <select name="users" className='form-control'
                            onChange={(event)=>this.handleChange(event)}>
                        {this.props.users.map((item)=><option key={item.id} value={item.id}>{item.email}</option>)}
                    </select>


                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm