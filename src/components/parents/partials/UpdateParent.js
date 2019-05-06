import React, { Component } from 'react';
import '../../../style/components/auth/login.css';
import { STUDENTS, PARENTS } from "../../../service/api";

class UpdateParent extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: null, UserName: '', FirstName:'', LastName:'', errorMessage:''};
    }

    componentDidMount() {
        const currentUser = localStorage.getItem("token");
        if(currentUser) {
            const path = PARENTS+"/"+this.props.match.params.id;
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
                this.setState({parent: data})
                console.log(this.state.parent)
            });
        }else {
            this.props.history.push("/login");
        }
       

    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        
        this.setState({
            parent: {...this.state.parent, [name]: target.value},

        });
    }    
    
    handleSubmit = (event) => {
        console.log(this.state.parent);
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            body: JSON.stringify({
                Id: this.state.parent.Id,
                FirstName:this.state.parent.FirstName,
                LastName: this.state.parent.LastName,
                UserName: this.state.parent.UserName,
                Email: this.state.parent.Email,
                Password: this.state.parent.Password,
                ConfirmPassword: this.state.parent.Password
            })
        };
        const path = PARENTS+"/"+ this.props.match.params.id;
        fetch( path, requestOptions)
        .then(response => 
            {
                if(response.ok) {
                    response.json().then(data => {
                        this.setState({errorMessage: ''})
                        this.props.history.push("/parents");
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
                this.state.parent && 
                <form onSubmit={this.handleSubmit}>
                <input 
                        type="text" 
                        name="UserName"
                        placeholder="Enter username"
                        value = {this.state.parent.UserName}
                        onChange={this.handleInputChange} />

                    <input 
                        type="text" 
                        name="FirstName" 
                        placeholder="Enter first name"
                        value = {this.state.parent.FirstName}
                        onChange={this.handleInputChange} />
                                        
                    <input 
                        type="text" 
                        name="LastName"
                        placeholder="Enter last name"
                        value = {this.state.parent.LastName}
                        onChange={this.handleInputChange} />
                    <input 
                        type="email" 
                        name="Email" 
                        placeholder="Enter email"
                        value = {this.state.parent.Email}
                        onChange={this.handleInputChange} />
                    <input 
                        type="password" 
                        name="Password" 
                        placeholder="Enter password"
                        value = {this.state.parent.Password}
                        onChange={this.handleInputChange} />

                                    
                <input type="submit" value="Change" className="submit" />
                <input type="button" value="Cancel" className="cancel" onClick={()=>this.props.history.push("/parents")} />
                <label className="error">{this.state.errorMessage}</label>
            </form>
            }
               
            </div>
           
        )
    }
};

export default UpdateParent;