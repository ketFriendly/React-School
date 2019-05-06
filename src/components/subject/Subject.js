import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS } from '../../service/api';
import Modal from '../common/Modal';
import '../../style/components/subject/subject.css';
import '../../style/common/table.css';


class Subject extends Component {
    teachersModal = [];
    constructor(props) {
        super(props);
        this.state = {subjects: [], openDialog: false, subject:null, teachers: [], deleted:false};
    }

    componentDidMount(){
        const path = SUBJECTS+"/all";
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
                        this.setState({subjects: data})    
                    )
                }else {
                    response.text().then(message => alert(message))
                }
            })
            .catch(error => console.log(error))
        }    
        console.log(this.state.subjects)
    }
    
    openDetails = (teachers) => {
        // this.teachersModal = teachers;
        const teacheri = [];
         console.log(teachers);
         for(let i = 0; i<teachers.length; i++) {
            if(teachers[i] !== null)
                {
                    teacheri.push(teachers[i]);
                    console.log(teachers[i]);
                }
            else{
           console.log("There are no teachers that teach this subject")
        }
    }
    this.setState({openDialog: true, teachers: teacheri});
    console.log(this.state.teachers)
    }

    closeDetails = () => {
        this.setState({subject:null, openDialog:false})
    }

    updateSubject = (id) => {
        this.props.history.push("updateSubject/"+id);
    }

    deleteSubject = (id) => {
        const path = SUBJECTS + "/" + id;
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
                    this.setState({subjects: this.state.subjects.filter(subject => subject.IdSubject!==id)})
                });
            }else {
                response.text().then(message => alert(message))
            }
        })
        .catch(error => console.log(error));
    }

    render() {
        const heading=[ "Name", "Weekly hours", "",""];
        const teacherHeading=["FirstName", "LastName"];
        
        return (
            <div className="subject_wrapper">
                <Modal show={this.state.openDialog} onClose={this.closeDetails}>{
                this.state.teachers &&
                    <table>
                        <thead>
                            <tr>
                                {
                                    teacherHeading.map((head,index) => <th key={index}>{head}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                                { 
                                    this.state.teachers && this.state.teachers.map((item,index)=>
                                        <tr key={index}>
                                            <td>{item.Name}</td>
                                            <td>{item.Surname}</td>
                                        </tr>  
                                    )}
                        </tbody>
                    </table>
                    }
                </Modal>
                {
                    this.state.subjects && 
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
                               this.state.subjects && this.state.subjects.map((subject)=>
                                    <tr key={subject.SubjectDtoId}>
                                        <td>{subject.SubjectName}</td>
                                        <td>{subject.WeeklyClassNo}</td>
                                        <td key="Teachers"><button className="btn-update" onClick={()=>this.openDetails(subject.Teachers)}>Teachers</button></td>
                                        {
                                            localStorage.getItem("role")==="Admin" ? 
                                            <tr> <td key="Delete"><button className="btn-update" onClick={()=>this.deleteSubject(subject.SubjectDtoId)}> Delete</button></td>
                                            <td key="Update"><button className="btn-update" onClick={()=>this.updateSubject(subject.SubjectDtoId)}> Update</button></td></tr>
                                            :
                                            <td key="Teachers"><button className="btn-update" onClick={()=>this.openDetails(subject.Teachers)}>Teachers</button></td>
                                        }
                                        
                                    </tr>  
                                )
                            }
                        </tbody>
                    </table>
                } 
                <div>{localStorage.getItem("user")}</div>
                {console.log(this.state.subjects)}
                <Link to="/addSubject">Add new subject</Link>
                
            </div>
        )
    }
};

export default Subject;