import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PARENTS, STUDENTS, MARKS } from '../../service/api';
import Modal from '../common/Modal';
import '../../style/components/subject/subject.css';
import '../../style/common/table.css';


class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {parents: [], openDialog: false, parent:null, marks:[],students:[], openDialog2:false };
    }

    componentDidMount(){
        if(localStorage.getItem('token') === null) {
            this.props.history.push('/login');
        } else {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  '+localStorage.getItem("token")
                }
            };
            fetch(PARENTS, requestOptions)
            .then(response => {
                if(response.ok) {
                    response.json().then(data =>
                        this.setState({parents: data})    
                    )
                }else {
                    response.text().then(message => alert(message))
                }
            })
            .catch(error => console.log(error))  
        }    
    }
    
    openMarks = (id) => {
        const path = MARKS+"/student/"+ id;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            }
        };
        fetch(path, requestOptions)
        .then(response => {
            if(response.ok) {
                response.json().then(data =>
                    this.setState({marks: data})    
                )
            }else {
                response.text().then(message => alert(message))
            }
        })
        .catch(error => console.log(error))
        this.setState({openDialog:false , openDialog2:true});
    }
    openStudents = (id) => {
        const path = STUDENTS+ "/getbyparent/"+ id;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            }
        };
        fetch(path, requestOptions)
        .then(response => {
            if(response.ok) {
                response.json().then(data =>
                    this.setState({students: data})    
                )
            }else {
                response.text().then(message => alert(message))
            }
        })
        .catch(error => console.log(error))  
        this.setState({openDialog: true});
    }

    closeDetails = () => {
        this.setState({student:null, openDialog:false, openDialog2:false});
    }

    updateParent = (id) => {
        this.props.history.push("updateParent/"+id);
    }

    deleteParent = (id) => {
        const path = PARENTS + "/delete/" + id;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            }
        };
        fetch(path, requestOptions)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({parents: this.state.parents.filter(parent => parent.Id!==id)})
                });
            }else {
                response.text().then(message => alert(message))
            }
        })
        .catch(error => console.log(error));
    }

    render() {
        const heading=["Username", "Name", "Surname", "Email","","",""];
        const markHeading=["Teachers Name", "Mark", "Subject"];
        const studentHeading = ["Name", "Surname", "Username", "Email", ""]
        //const parentHeading=["Name", "Surname", "Username", "Email"];
        return (
            <div className="subject_wrapper">
            <Modal show={this.state.openDialog} onClose={this.closeDetails}>
                    <table>
                        <thead>
                            <tr>
                                {
                                    studentHeading.map((head,index) => <th key={index}>{head}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    this.state.students && this.state.students.map((item,id)=>
                                       <tr key={id}>
                                            <td>{item.FirstName}</td>
                                            <td>{item.LastName}</td>
                                            <td>{item.UserName}</td>
                                            {
                                            item.Email !== null ? <td>{item.Email}</td> : <td>/</td>
                                            }
                                            <td key="Marks"><button className="btn-update" onClick={()=>this.openMarks(item.Id)}> Marks</button></td>
                                        </tr>  
                                    )}
                        </tbody>
                    </table>
                </Modal>
                <Modal show={this.state.openDialog2} onClose={this.closeDetails}>
                    <table>
                        <thead>
                            <tr>
                                {
                                    markHeading.map((head,index) => <th key={index}>{head}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    this.state.marks && this.state.marks.map((item,index)=>
                                       <tr key={index}>
                                            <td>{item.TeachersName}</td>
                                            <td>{item.Mark}</td>
                                            <td>{item.Subject}</td>
                                        </tr>  
                                    )}
                        </tbody>
                    </table>
                </Modal>
                {
                    this.state.parents && 
                    <table>
                        <thead>
                            <tr>
                                {heading.map((head, index) => 
                                    <th key={index}>{head}</th>    
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {
                               this.state.parents && this.state.parents.map((parent, Id )=>
                                    <tr key={Id}>
                                        <td>{parent.UserName}</td>
                                        <td>{parent.FirstName}</td>
                                        <td>{parent.LastName}</td>
                                        {
                                            parent.Email !== null ? <td>{parent.Email}</td> : <td>/</td>
                                        }
                                        {/* <td key="Marks"><button className="btn-update" onClick={()=>this.openMarks(student.Id)}>Marks</button></td>*/}
                                        <td key="Students"><button className="btn-update" onClick={()=>this.openStudents(parent.Id)}> Students</button></td> 
                                        <td key="Delete"><button className="btn-update" onClick={()=>this.deleteParent(parent.Id)}> Delete</button></td>
                                        <td key="Update"><button className="btn-update" onClick={()=>this.updateParent(parent.Id)}> Update</button></td>
                                    </tr>  
                                )
                            }
                        </tbody>
                    </table>
                } 
                <Link to="/addParent">Add new parent</Link>
               
            </div>
           
        )
    }
}

export default Parent;