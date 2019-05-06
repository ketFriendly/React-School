import React, { Component } from 'react';
import '../../../style/components/auth/login.css';
import { REGISTER } from "../../../service/api";

class AddTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {UserName: '', FirstName:'', LastName:'',Password:'',ConfirmPassword:'', errorMessage:'', disable: false};
    }

    componentDidMount() {
        const currentUser = localStorage.getItem("token");
        if(!currentUser) {
            this.props.history.push("/login");
        }
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
        if(this.state.ConfirmPassword!=='' && target.value!==this.state.ConfirmPassword) {      
            this.setState({errorMessage:"Passwords do not match!", disable: true})
        }else {
            this.setState({errorMessage:"", disable:false, [name]: target.value})
        }
    }
    handleRepeatedPassword = (event) => {
        const target = event.target;
        const name = target.name;
        if(this.state.Password!==target.value) {      
            this.setState({errorMessage:"Passwords do not match!", disable: true})
        }else {
            this.setState({errorMessage:"", disable:false, [name]: target.value})
        }
    }
    handleSubmit = (event) => {
        const path = REGISTER+"/register-teacher";
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            body: JSON.stringify({
                UserName: this.state.UserName,
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Password: this.state.Password,
                ConfirmPassword: this.state.ConfirmPassword
            })
        };
        fetch( path, requestOptions)
        .then(response => {
                if(response.ok) {
                    // response.json().then(data => {
                        this.setState({errorMessage: ''})
                        this.props.history.push("/teachers");
                    //});
                }else {
                    response.text().then(message => this.setState({errorMessage: message}))
                }
            })
        .catch(error => console.log(error))
        event.preventDefault();
    }
    render() {   
        return (
            <div className="login_form">
                <form onSubmit={this.handleSubmit} className="register">
                    <input 
                        type="text" 
                        name="UserName"
                        placeholder="Enter username"
                        onChange={this.handleInputChange} />

                    <input 
                        type="text" 
                        name="FirstName" 
                        placeholder="Enter first name"
                        onChange={this.handleInputChange} />
                                        
                    <input 
                        type="text" 
                        name="LastName"
                        placeholder="Enter last name"
                        onChange={this.handleInputChange} />

                    <input 
                        type="password" 
                        name="Password" 
                        placeholder="Enter password"
                        onChange={this.handlePassword} />

                    <input 
                        type="password" 
                        name="ConfirmPassword" 
                        placeholder="ConfirmPassword"
                        onChange={this.handleRepeatedPassword} />
                        <input type="submit" value="Submit" className="submit" disabled={this.state.disable} />
                        {/* <input type="submit" value="Add" className="submit" /> */}
                    <input type="button" value="Cancel" className="cancel" onClick={()=>this.props.history.push("/students")} />
                <label className="error">{this.state.errorMessage}</label>
                 </form> 
            </div>
           
        )
    }
};

export default AddTeacher;