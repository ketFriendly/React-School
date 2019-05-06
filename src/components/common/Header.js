import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../style/common/header.css';

class Header extends Component {
    
    logout = () => {
        localStorage.clear(); 
        this.props.history.push("/login");
    }
    
    render() {
        if(!localStorage.getItem("token"))
        {
            return(
                <div className="header">
                 <Link to="/">Home</Link>
                 <Link to="/login">Login</Link>
                </div>
            )
        }
        if(localStorage.getItem("role")==="Admin")
        {
            return (
                <div className="header">
                   <Link to="/">Home</Link>
                     <div className="header_links">
                                <Link to="/subjects" >Subjects</Link>
                                <Link to="/students" > Students</Link>
                                <Link to="/teachers" > Teachers</Link>
                                <Link to="/parents" > Parents</Link>
                                <Link to="/classes" > Classes</Link>
                                <div className="logout" onClick={this.logout}>Logout</div>
                            </div>  
                </div>
            )
        }
        if(localStorage.getItem("role")==="Student")
        {
            return (
                <div className="header">
                   <Link to="/">Home</Link>
                     <div className="header_links">
                                <Link to="/students" > Students</Link>
                                <div className="logout" onClick={this.logout}>Logout</div>
                            </div>  
                </div>
            )
        }
        if(localStorage.getItem("role")==="Teacher")
        {
            return (
                <div className="header">
                   <Link to="/">Home</Link>
                            <div className="header_links">
                                <Link to="/marks">Marks </Link>
                                <div className="logout" onClick={this.logout}>Logout</div>
                            </div>  

                </div>
                )
        }
        if(localStorage.getItem("role")==="Parent")
        {
            return (
                <div className="header">
                   <Link to="/">Home</Link>
                            <div className="header_links">
                                <Link to="/parents" > Parents</Link>
                                <div className="logout" onClick={this.logout}>Logout</div>
                            </div>  
                </div>
                )
        }
        
    }
};

export default withRouter(Header);





///<div>{ localStorage.getItem("role")}</div> trenutna rola