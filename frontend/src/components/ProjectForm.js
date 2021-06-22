import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', users: props.users}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="users">users</label>

                    <select name="users" className='form-control' onChange={(event)=>this.handleChange(event)}>
                        {this.props.users.map((item)=><option value={item.id}>{item.id}</option>)}
                    </select>


                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm