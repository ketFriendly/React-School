import React, { Component } from 'react';
import '../../../style/components/auth/login.css';
import { CLASSES } from "../../../service/api";

class AddClass extends Component {
    constructor(props) {
        super(props);
        this.state = {ClassNo: 0, Grade:0, errorMessage:''};
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
    
    handleSubmit = (event) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            body: JSON.stringify({
                ClassNo: this.state.ClassNo,
                Grade: this.state.Grade
            })
        };
        
        fetch( CLASSES, requestOptions)
        .then(response => 
            {
                if(response.ok) {
                    response.json().then(data => {
                        this.setState({errorMessage: ''})
                        this.props.history.push("/classes");
                    });
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
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="number" 
                        name="ClassNo"
                        placeholder="Enter class number"
                        onChange={this.handleInputChange} />

                    <input 
                        type="number" 
                        name="Grade" 
                        placeholder="Enter Grade"
                        onChange={this.handleInputChange} />
                                        
                    <input type="submit" value="Add" className="submit" />
                    <input type="button" value="Cancel" className="cancel" onClick={()=>this.props.history.push("/classes")} />
                <label className="error">{this.state.errorMessage}</label>
                 </form> 
            </div>
           
        )
    }
};

export default AddClass;