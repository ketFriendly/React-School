import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../style/components/auth/login.css';
import { createFormBody } from '../../service/helper';
import {LOGIN} from "../../service/api";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password:'', errorMessage:''};
    }

    handleInputChange = (event) => {      
        const target = event.target;
        const name = target.name;
      
        this.setState({
            [name]: target.value
        });      
    }    
    
    handleSubmit = (event) => {
        

        let details = {
            'grant_type': 'password',
            'username': this.state.username,
            'password': this.state.password
        };
        
        let data = createFormBody(details);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'mode':'no-cors'
            },
            body: data
        };
        
        fetch(LOGIN, requestOptions)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({errorMessage: ''})
                    localStorage.setItem("token", data.access_token);
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("user", data.UserId);
                    this.props.history.push("/");  
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
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Enter username"
                        onChange={this.handleInputChange} />

                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter password"
                        onChange={this.handleInputChange} />
                                        
                    <input type="submit" value="Submit" className="submit" />
                    <label className="error">{this.state.errorMessage}</label>
                    <label className="info">If you do not have account, please <Link to="/register">register</Link></label>
                </form>
            </div>
           
        )
    }
};

export default Login;