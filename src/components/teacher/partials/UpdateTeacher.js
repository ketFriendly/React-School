import React, { Component } from 'react';
import '../../../style/components/auth/login.css';
import { TEACHERS } from "../../../service/api";

class UpdateTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {teacher: null, UserName: '', FirstName:'', LastName:'', errorMessage:''};
    }

    componentDidMount() {
        const currentUser = localStorage.getItem("token");
        if(currentUser) {
            const path = TEACHERS+"/"+this.props.match.params.id;
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  '+localStorage.getItem("token")
                }
            };
            fetch(path, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({teacher: data})
                console.log(this.state.teacher)
            });
        }else {
            this.props.history.push("/login");
        }
       

    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        
        this.setState({
            teacher: {...this.state.teacher, [name]: target.value},

        });
    }    
    
    handleSubmit = (event) => {
        console.log(this.state.teacher);
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            body: JSON.stringify({
                FirstName:this.state.teacher.Name,
                LastName: this.state.teacher.Surname,
                Username: this.state.teacher.Username,
                Email: this.state.teacher.Email,
                Password: this.state.teacher.Password,
                ConfirmPassword: this.state.teacher.Password
                // Teachers: null
            })
        };
        const path = TEACHERS+"/"+ this.props.match.params.id;
        fetch( path, requestOptions)
        .then(response => 
            {
                if(response.ok) {
                    response.json().then(data => {
                        this.setState({errorMessage: ''})
                        this.props.history.push("/teachers");
                    });
                }else {
                    response.text().then(message => this.setState({errorMessage: message}))
                }
            })
        .catch(error => console.log(error))
        event.preventDefault();
    };

    render() {
        
        return (
            <div className="login_form">
            {
                this.state.teacher && 
                <form onSubmit={this.handleSubmit}>
                <input 
                        type="text" 
                        name="Username"
                        placeholder="Enter username"
                        value = {this.state.teacher.Username}
                        onChange={this.handleInputChange} />

                    <input 
                        type="text" 
                        name="Name" 
                        placeholder="Enter first name"
                        value = {this.state.teacher.Name}
                        onChange={this.handleInputChange} />
                                        
                    <input 
                        type="text" 
                        name="Surname"
                        placeholder="Enter last name"
                        value = {this.state.teacher.Surname}
                        onChange={this.handleInputChange} />
                    <input 
                        type="email" 
                        name="Email" 
                        placeholder="Enter email"
                        value = {this.state.teacher.Email}
                        onChange={this.handleInputChange} />
                    <input 
                        type="password" 
                        name="Password" 
                        placeholder="Enter password"
                        value = {this.state.teacher.Password}
                        onChange={this.handleInputChange} />

                                    
                <input type="submit" value="Change" className="submit" />
                <input type="button" value="Cancel" className="cancel" onClick={()=>this.props.history.push("/teachers")} />
                <label className="error">{this.state.errorMessage}</label>
            </form>
            }
               
            </div>
           
        )
    }
};

export default UpdateTeacher;