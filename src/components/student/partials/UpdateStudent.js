import React, { Component } from 'react';
import '../../../style/components/auth/login.css';
import { STUDENTS } from "../../../service/api";

class UpdateStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {student: null, UserName: '', FirstName:'', LastName:'', errorMessage:''};
    }

    componentDidMount() {
        const currentUser = localStorage.getItem("token");
        if(currentUser) {
            const path = STUDENTS+"/"+this.props.match.params.id;
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
                this.setState({student: data})
                console.log(this.state.student)
            });
        }else {
            this.props.history.push("/login");
        }
       

    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        
        this.setState({
            student: {...this.state.student, [name]: target.value},

        });
    }    
    
    handleSubmit = (event) => {
        console.log(this.state.student);
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            body: JSON.stringify({
                Id: this.state.student.Id,
                FirstName:this.state.student.FirstName,
                LastName: this.state.student.LastName,
                UserName: this.state.student.UserName,
                Email: this.state.student.Email,
                Password: this.state.student.Password,
                ConfirmPassword: this.state.student.Password
                // Teachers: null
            })
        };
        const path = STUDENTS+"/"+ this.props.match.params.id;
        fetch( path, requestOptions)
        .then(response => 
            {
                if(response.ok) {
                    response.json().then(data => {
                        this.setState({errorMessage: ''})
                        this.props.history.push("/students");
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
                this.state.student && 
                <form onSubmit={this.handleSubmit}>
                <input 
                        type="text" 
                        name="UserName"
                        placeholder="Enter username"
                        value = {this.state.student.UserName}
                        onChange={this.handleInputChange} />

                    <input 
                        type="text" 
                        name="FirstName" 
                        placeholder="Enter first name"
                        value = {this.state.student.FirstName}
                        onChange={this.handleInputChange} />
                                        
                    <input 
                        type="text" 
                        name="LastName"
                        placeholder="Enter last name"
                        value = {this.state.student.LastName}
                        onChange={this.handleInputChange} />
                    <input 
                        type="email" 
                        name="Email" 
                        placeholder="Enter email"
                        value = {this.state.student.Email}
                        onChange={this.handleInputChange} />
                    <input 
                        type="password" 
                        name="Password" 
                        placeholder="Enter password"
                        value = {this.state.student.Password}
                        onChange={this.handleInputChange} />

                                    
                <input type="submit" value="Change" className="submit" />
                <input type="button" value="Cancel" className="cancel" onClick={()=>this.props.history.push("/students")} />
                <label className="error">{this.state.errorMessage}</label>
            </form>
            }
               
            </div>
           
        )
    }
};

export default UpdateStudent;