import React, { Component } from 'react';
import '../../../style/components/auth/login.css';
import { SUBJECTS } from "../../../service/api";

class UpdateSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {subject: null};
    }

    componentDidMount() {
        const currentUser = localStorage.getItem("token");
        if(currentUser) {
            const path = SUBJECTS+"/"+this.props.match.params.id;
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
                this.setState({subject: data})
                console.log(this.state.subject)
            });
        }else {
            this.props.history.push("/login");
        }
       

    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        
        this.setState({
            subject: {...this.state.subject, [name]: target.value}
        });
    }    
    
    handleSubmit = (event) => {
        console.log(this.state.subject);
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            body: JSON.stringify({
                IdSubject: this.state.subject.IdSubject,
                SubjectName: this.state.subject.Name,
                WeeklyClassNo: this.state.subject.WeeklyClassNo,
                Teachers: null
            })
        };

        const path = SUBJECTS+"/"+ this.props.match.params.id;
        fetch( path, requestOptions)
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

    };

    render() {
        
        return (
            <div className="login_form">
            {
                this.state.subject && 
                <form onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    name="Name"
                    placeholder="Change name"
                    value={this.state.subject.SubjectName}
                    onChange={this.handleInputChange} />
                <input 
                    type="number" 
                    name="WeeklyHoursTaught" 
                    placeholder="Change weekly hours"
                    value={this.state.subject.WeeklyClassNo}
                    onChange={this.handleInputChange} />
                                    
                <input type="submit" value="Change" className="submit" />
                <input type="button" value="Cancel" className="cancel" onClick={()=>this.props.history.push("/subjects")} />
                <label className="error">{this.state.errorMessage}</label>
            </form>
            }
               
            </div>
           
        )
    }
};

export default UpdateSubject;