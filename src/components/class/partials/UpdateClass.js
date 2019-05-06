import React, { Component } from 'react';
import '../../../style/components/auth/login.css';
import { CLASSES } from "../../../service/api";

class UpdateClass extends Component {
    constructor(props) {
        super(props);
        this.state = {class: null};
    }

    componentDidMount() {
        const currentUser = localStorage.getItem("token");
        if(currentUser) {
            const path = CLASSES+"/"+this.props.match.params.id;
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
                this.setState({class: data})
                console.log(this.state.class)
            });
        }else {
            this.props.history.push("/login");
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        
        this.setState({
            class: {...this.state.class, [name]: target.value}
        });
    }    
    
    handleSubmit = (event) => {
        console.log(this.state.class);
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            body: JSON.stringify({
                ClassNo: this.state.class.ClassNo,
                Grade: this.state.class.Grade,
            })
        };

        const path = CLASSES+"/"+ this.props.match.params.id;
        fetch( path, requestOptions)
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

    };

    render() {
        
        return (
            <div className="login_form">
            {
                this.state.class && 
                <form onSubmit={this.handleSubmit}>
                <input 
                    type="number" 
                    name="ClassNo"
                    placeholder="Change the Class Number"
                    value={this.state.class.ClassNo}
                    onChange={this.handleInputChange} />
                <input 
                    type="number" 
                    name="Grade" 
                    placeholder="Change grade level"
                    value={this.state.class.Grade}
                    onChange={this.handleInputChange} />
                                    
                <input type="submit" value="Change" className="submit" />
                <input type="button" value="Cancel" className="cancel" onClick={()=>this.props.history.push("/classes")} />
                <label className="error">{this.state.errorMessage}</label>
            </form>
            }
               
            </div>
           
        )
    }
};

export default UpdateClass;