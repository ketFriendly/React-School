import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CLASSES, STUDENTS, SUBJECTS } from '../../service/api';
import Modal from '../common/Modal';
import '../../style/components/subject/subject.css';
import '../../style/common/table.css';
import { utimes } from 'fs';


class Class extends Component {
    
    constructor(props) {
        super(props);
        this.state = {classes: [], openDialog: false, class:null, students: [], deleted:false, studentss:[], openDialog2:false, idClass:0, openDialog3:false, subjects:[], teachers:[], openDialog4:false, classId:0};
    }

    componentDidMount(){
        const path = CLASSES;
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
            fetch(path, requestOptions)
            .then(response => {
                if(response.ok) {
                    response.json().then(data =>
                        this.setState({classes: data})    
                    )
                }else {
                    response.text().then(message => alert(message))
                }
            })
            .catch(error => console.log(error))
        }    
        console.log(this.state.classes)
    }
    
    openDetails = (id) => {
        const path = CLASSES + "/studentsInClass/"+id;
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
        }    
        this.setState({openDialog: true});
        console.log(this.state.students)
    }

    closeDetails = () => {
        this.setState({class:null, openDialog:false, openDialog2:false, openDialog3:false})
    }

    updateClass = (id) => {
        this.props.history.push("updateClass/"+id);
    }

    deleteClass = (id) => {
        const path = CLASSES + "/" + id;
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
                    this.setState({classes: this.state.classes.filter(item => item.IdClass!==id)})
                });
            }else {
                response.text().then(message => alert(message))
            }
        })
        .catch(error => console.log(error));
    }
    addStudents(id){
        const path = CLASSES + "/studentsNoClass";
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
            fetch(path, requestOptions)
            .then(response => {
                if(response.ok) {
                    response.json().then(data =>
                        this.setState({studentss: data, idClass:id})    
                    )
                }else {
                    response.text().then(message => alert(message))
                }
            })
            .catch(error => console.log(error))
        }    
        this.setState({openDialog2: true})
        console.log("Id class" + this.state.idClass)
        console.log("Studentss" + this.state.studentss)
    }
    addStudentToClass = (idStudent, idClass)=>{
        const path = CLASSES + "/" + idClass + "/add-student/" + idStudent;
        if(localStorage.getItem('token') === null) {
            this.props.history.push('/login');
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  '+localStorage.getItem("token")
                }
            };
            fetch(path, requestOptions)
            .then(response => 
                {
                    if(response.ok) {
                        response.json().then(data => {
                            this.setState({openDialog2: false, errorMessage: '', studentss: this.state.studentss.filter(item =>item.Id !== idStudent)})
                            this.props.history.push("/classes");
                        });
                    }else {
                        response.text().then(message => this.setState({errorMessage: message}))
                    }
                })
            .catch(error => console.log(error))
            
        }    
        
    }
    getSubjects = (id) => {
        const path = CLASSES +"/subjectsNoClass";
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
            fetch(path, requestOptions)
            .then(response => {
                if(response.ok) {
                    response.json().then(data =>
                        this.setState({subjects: data, classId:id})    
                    )
                }else {
                    response.text().then(message => alert(message))
                }
            })
            .catch(error => console.log(error))
        }    
        this.setState({openDialog3: true});
        console.log(this.state.subjects)
    }
    addSubjectToClass = (IdSubject, IdClass) => {
        const path = CLASSES +"/"+IdClass+"/addSubject/"+IdSubject;
        if(localStorage.getItem('token') === null) {
            this.props.history.push('/login');
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  '+localStorage.getItem("token")
                }
            };
            fetch(path, requestOptions)
            .then(response => {
                if(response.ok) {
                    response.json().then(data =>{
                        this.setState({errorMessage:'', openDialog3: false})
                        this.props.history.push("/classes"); 
                        }   
                    )
                }else {
                    response.text().then(message => alert(message))
                }
            })
            .catch(error => console.log(error))
        }    
        this.setState({openDialog3: false});
        console.log(this.state.subjects)
    }
    
    render() {
        const heading=[ "Class Number", "Grade", "", "", "", ""];
        const studentsHeading=["First Name", "Last Name", "Email"];
        const studentsHeading2=["First Name", "Last Name", "Email", ""];
        const subjectsHeading = ["Name","Weekly class number", "", ""]
        
        return (
            <div className="subject_wrapper">
                <Modal show={this.state.openDialog} onClose={this.closeDetails}>{
                this.state.students &&
                    <table>
                        <thead>
                            <tr>
                                {
                                    studentsHeading.map((head,index) => <th key={index}>{head}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                                { 
                                    this.state.students && this.state.students.map((item,index)=>
                                        <tr key={index}>
                                            <td>{item.FirstName}</td>
                                            <td>{item.LastName}</td>
                                            <td>{item.Email}</td>
                                        </tr>  
                                    )}
                        </tbody>
                    </table>
                    }
                </Modal>
                <Modal show={this.state.openDialog2} onClose={this.closeDetails}>{
                this.state.studentss &&
                    <table>
                        <thead>
                            <tr>
                                {
                                    studentsHeading2.map((head,index) => <th key={index}>{head}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                                { 
                                    this.state.studentss && this.state.studentss.map((item,Id)=>
                                        <tr key={Id}>
                                            <td>{item.FirstName}</td>
                                            <td>{item.LastName}</td>
                                            <td>{item.Email}</td>
                                            <td key="AddStudent"><button className="btn-update" onClick={()=>this.addStudentToClass(item.Id, this.state.idClass)}> Add Student</button></td>
                                        </tr>  
                                    )}
                        </tbody>
                    </table>
                    }
                </Modal>
                <Modal show={this.state.openDialog3} onClose={this.closeDetails}>{
                this.state.subjects &&
                    <table>
                        <thead>
                            <tr>
                                {
                                    subjectsHeading.map((head,index) => <th key={index}>{head}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                                { 
                                     
                                    this.state.subjects && this.state.subjects.map((item,Id)=>
                                        <tr key={Id}>
                                            <td>{item.Name}</td>
                                            <td>{item.WeeklyClassNo}</td>
                                            <td key="Subjects"><button className="btn-update" onClick={()=>this.addSubjectToClass(item.IdSubject, this.state.classId)}> Add Subject</button></td> 
                                        </tr>  
                                   )
                                
                                }
                        </tbody>
                    </table>
                   
                    }
                </Modal>
                {
                    this.state.classes && 
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
                               this.state.classes && this.state.classes.map((item, index)=>
                                    <tr key={index}>
                                        <td>{item.ClassNo}</td>
                                        <td>{item.Grade}</td>
                                        <td key="Class"><button className="btn-update" onClick={()=>this.openDetails(item.IdClass)}>Students</button></td>
                                        <td key="Delete"><button className="btn-update" onClick={()=>this.deleteClass(item.IdClass)}> Delete</button></td>
                                        <td key="Update"><button className="btn-update" onClick={()=>this.updateClass(item.IdClass)}> Update</button></td>
                                        <td key="AddStudent"><button className="btn-update" onClick={()=>this.addStudents(item.IdClass)}> Add Students</button></td>
                                        <td key="AddSubjects"><button className="btn-update" onClick={()=>this.getSubjects(item.IdClass)}> Add Subjects</button></td>
                                    </tr>  
                                )
                            }
                        </tbody>
                    </table>
                } 
                {console.log(this.state.classes)}
                <Link to="/addClass">Add new class</Link>
            </div>
        )
    }
};

export default Class;