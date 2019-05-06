import React, { Component } from 'react';
import '../../../style/components/auth/login.css';
import { SUBJECTS } from "../../../service/api";

class AddSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {Name: '', WeeklyHoursTaught:0, Deleted:false, errorMessage:''};
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
                SubjectName: this.state.Name,
                WeeklyClassNo: this.state.WeeklyHoursTaught,
                Deleted: this.state.Deleted
            })
        };
        
        fetch( SUBJECTS, requestOptions)
        .then(response => 
            {
                if(response.ok) {
                    response.json().then(data => {
                        this.setState({errorMessage: ''})
                        this.props.history.push("/subjects");
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
                        type="text" 
                        name="Name"
                        placeholder="Enter name"
                        onChange={this.handleInputChange} />

                    <input 
                        type="number" 
                        name="WeeklyHoursTaught" 
                        placeholder="Enter weekly hours"
                        onChange={this.handleInputChange} />
                                        
                    <input type="submit" value="Add" className="submit" />
                    <input type="button" value="Cancel" className="cancel" onClick={()=>this.props.history.push("/subjects")} />
                <label className="error">{this.state.errorMessage}</label>
                 </form> 
            </div>
           
        )
    }
};

export default AddSubject;