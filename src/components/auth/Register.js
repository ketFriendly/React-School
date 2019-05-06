import React, { Component } from 'react';
import '../../style/components/auth/login.css';
import {REGISTER} from "../../service/api";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {firstName:'', lastName:'',email: '', username:'',password:'', repeatedPassword:'', errorMessage:'', disable: false};
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        
        this.setState({
            [name]: target.value
        });

      
    }    
    
    handlePassword = (event) => {
        const target = event.target;
        const name = target.name;
 
        if(this.state.repeatedPassword!=='' && target.value!==this.state.repeatedPassword) {      
            this.setState({errorMessage:"Passwords do not match!", disable: true})
        }else {
            this.setState({errorMessage:"", disable:false, [name]: target.value})
        }
    }

    handleRepeatedPassword = (event) => {
        const target = event.target;
        const name = target.name;
 
        if(this.state.password!==target.value) {      
            this.setState({errorMessage:"Passwords do not match!", disable: true})
        }else {
            this.setState({errorMessage:"", disable:false, [name]: target.value})
        }
    }
    
    handleSubmit = (event) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                repeatedPassword: this.state.repeatedPassword
            })
        };
        
        fetch(REGISTER, requestOptions)
        .then(response => {
            if (response.ok) {
                this.setState({errorMessage: ''})
                this.props.history.push("/login");        
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
                <form onSubmit={this.handleSubmit} className="register">
                    <input 
                        type="text" 
                        name="firstName"
                        placeholder="Enter first name"
                        onChange={this.handleInputChange} />

                    <input 
                        type="lastName" 
                        name="lastName"
                        placeholder="Enter last name"
                        onChange={this.handleInputChange} />

                    <input 
                        type="text" 
                        name="username"
                        placeholder="Enter username"
                        onChange={this.handleInputChange} />                 

                    <input 
                        type="email" 
                        name="email"
                        placeholder="Enter email"
                        onChange={this.handleInputChange} />

                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter password"
                        onChange={this.handlePassword} />

                    <input 
                        type="password" 
                        name="repeatedPassword" 
                        placeholder="Enter password again"
                        onChange={this.handleRepeatedPassword} />
                                        
                    <input type="submit" value="Submit" className="submit" disabled={this.state.disable} />
                    <label className="error">{this.state.errorMessage}</label>
                </form>
            </div>
           
        )
    }
};

export default Register;