import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { STUDENTS, MARKS } from '../../service/api';
import Modal from '../common/Modal';
import '../../style/components/subject/subject.css';
import '../../style/common/table.css';


class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {students: [], openDialog: false, student:null, parents: [], marks:[], openDialog2:false, average:0 };
    }

    componentDidMount(){
        if(localStorage.getItem('role') === "Student") {
            const pa = STUDENTS+"/"+localStorage.getItem("user");
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  '+localStorage.getItem("token")
                }
            };
            fetch(pa, requestOptions)
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
        } else {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  '+localStorage.getItem("token")
                }
            };
            fetch(STUDENTS, requestOptions)
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
        this.setState({openDialog: true});
    }
    openParents = (parents) => {
        this.setState({openDialog2: true, parents: parents});
    }

    closeDetails = () => {
        this.setState({student:null, openDialog:false, openDialog2:false});
    }

    updateStudent = (id) => {
        this.props.history.push("updateStudent/"+id);
    }

    deleteStudent = (id) => {
        const path = STUDENTS + "/delete/" + id;
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
                    this.setState({students: this.state.students.filter(student => student.Id!==id)})
                });
            }else {
                response.text().then(message => alert(message))
            }
        })
        .catch(error => console.log(error));
    }
    getAverageMark = (subject, idStudent) =>{
        const path = MARKS+subject+"/average/"+ idStudent;
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
                    this.setState({average: data})    
                )
            }else {
                response.text().then(message => alert(message))
            }
        })
        .catch(error => console.log(error))
        this.setState({openDialog: true});
    }

    render() {
        let heading=[];
        if(localStorage.getItem("role")==="Admin"){
            heading=["Username", "Name", "Surname", "Email","","","",""];
        }
        else{
            heading=["Username", "Name", "Surname", "Email","",""];
        }
        
        const markHeading=["Teachers Name", "Mark", "Subject"];
        const parentHeading=["Name", "Surname", "Username", "Email"];
        return (
            <div className="subject_wrapper">
            <Modal show={this.state.openDialog2} onClose={this.closeDetails}>
                    <table>
                        <thead>
                            <tr>
                                {
                                    parentHeading.map((head,index) => <th key={index}>{head}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    this.state.parents && this.state.parents.map((item,index)=>
                                       <tr key={index}>
                                            <td>{item.FirstName}</td>
                                            <td>{item.LastName}</td>
                                            <td>{item.UserName}</td>
                                            <td>{item.Email}</td>
                                        </tr>  
                                    )}
                        </tbody>
                    </table>
                </Modal>
                <Modal show={this.state.openDialog} onClose={this.closeDetails}>
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
                                            {/* <td><button className="btn-update" onClick={()=>this.getAverageMark()}>Average</button></td> */}
                                        </tr>  
                                    )}
                        </tbody>
                    </table>
                </Modal>
                {
                    this.state.students && 
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
                               this.state.students && this.state.students.map((student, index )=>

                                    <tr key={index}>
                                        <td>{student.UserName}</td>
                                        <td>{student.FirstName}</td>
                                        <td>{student.LastName}</td>
                                        {
                                            student.Email !== null ? <td>{student.Email}</td> : <td>/</td>
                                        }
                                        {
                                            localStorage.getItem("role") === "Admin"?
                                            <tr>
                                                <td key="Marks"><button className="btn-update" onClick={()=>this.openMarks(student.Id)}>Marks</button></td>
                                                <td key="Parents"><button className="btn-update" onClick={()=>this.openParents(student.Parents)}> Parents</button></td>
                                                <td key="Delete"><button className="btn-update" onClick={()=>this.deleteStudent(student.Id)}> Delete</button></td>
                                                <td key="Update"><button className="btn-update" onClick={()=>this.updateStudent(student.Id)}> Update</button></td>
                                            </tr> 
                                            :
                                            <td>
                                                <td key="Marks"><button className="btn-update" onClick={()=>this.openMarks(student.Id)}>Marks</button></td>
                                                <td key="Parents"><button className="btn-update" onClick={()=>this.openParents(student.Parents)}> Parents</button></td>  
                                            </td>
                                        }
                                    </tr>  
                                )
                            }
                        </tbody>
                    </table>
                } 
                <Link to="/addStudent">Add new student</Link>
               
            </div>
           
        )
    }
}

export default Student;