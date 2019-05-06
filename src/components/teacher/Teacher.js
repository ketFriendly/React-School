import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TEACHERS, SUBJECTS } from '../../service/api';
import Modal from '../common/Modal';
import '../../style/components/subject/subject.css';
import '../../style/common/table.css';
//import SubjectDD from "../../subject/partials/SubjectDD";


class SubjectDD extends Component {
    constructor(props) {
        super(props);
        this.state = {IdSubject:[], value:'',selectedSubject:''};
        
    }
    handleChange = (event) => {
        
        //this.setState({value: event.target.value})
    }
    handleSubject = (event) => {
        const teachId = this.props.state.teachID;
        let x = document.getElementById("selected");
        let ind = x.selectedIndex;
        let subjectValue = x.options[ind].value;
        let subjectKey = x.options[ind].key;
        console.log("this is subjectValue"+ subjectValue);
        console.log("this is subjectKey "+ subjectKey);
        let allSubjects = this.props.state.subjectss;
        const subs = allSubjects.filter(sub => sub.Name === subjectValue);
        const subId = subs[0].IdSubject;
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            // body: JSON.stringify({
            //     Id: this.state.student.Id,
            //     FirstName:this.state.student.FirstName,
            //     LastName: this.state.student.LastName,
            //     UserName: this.state.student.UserName,
            //     Email: this.state.student.Email,
            //     Password: this.state.student.Password,
            //     ConfirmPassword: this.state.student.Password
            //     // Teachers: null
            // })
        };
        const path = SUBJECTS+"/"+subId+"/add-existing-teacher/"+ teachId;
        fetch( path, requestOptions)
        .then(response => 
            {
                if(response.ok) {
                    response.json().then(data => {
                        this.setState({errorMessage: ''})
                    });
                }else {
                    response.text().then(message => this.setState({errorMessage: message}))
                }
            })
        .catch(error => console.log(error))
    }
    render () {
        let subjects = this.props.state.subjectss;
        let optionItems = subjects.map((subject) =>
                <option key={subject.IdSubject} value={subject.Name}>{subject.Name}</option>
            );

        return (
         <div>
             <select id="selected">
                {optionItems}
             </select>
             <button className="btn-update" onClick={()=>this.handleSubject()}> Add subject</button>
         </div>
        )
    }
}
// function updateSelectedValue(selectedSubject) {
//     this.setState({ selectedSubject })
// }

class Teacher extends Component {
    constructor(props) {
        super(props);
        this.state = {teachers: [], openDialog: false,openDialog2:false, teacher:null, subjects:[],subjectss:[], selectedSubject: 'Select the subject',teachID:''};
        // updateSelectedValue = updateSelectedValue.bind(this)
    }

    componentDidMount(){
        this.getTeachers();
        this.getSubjects();
    }
    getTeachers = () => {
        const path = TEACHERS;
       
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
                        this.setState({teachers: data})    
                    )
                }else {
                    response.text().then(message => alert(message))
                }
            })
            .catch(error => console.log(error))
        }    
        console.log(this.state.teachers)
    }
    getSubjects = () => {
        const pathS = SUBJECTS;
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
            fetch(pathS, requestOptions)
            .then(response => {
                if(response.ok) {
                    response.json().then(data =>
                        this.setState({subjectss: data})    
                    )
                }else {
                    response.text().then(message => alert(message))
                }
            })
            .catch(error => console.log(error))
        }    
        console.log(this.state.subjectss)
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
    openDetails2 = (id) =>{
        this.setState({openDialog2:true, teachID:id})
    }

    closeDetails = () => {
        this.setState({teacher:null, openDialog:false})
    }
    closeDetails2 = () => {
        this.setState({openDialog:false, openDialog2:false})
    }

    updateTeacher = (id) => {
        this.props.history.push("updateTeacher/"+id);
    }
    addSubject = (id) => {
        this.props.ID = id;
        this.props.history.push("addExistingSubject/"+id);
    }

    deleteTeacher = (id) => {
        const path = TEACHERS + "/delete/" + id;
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
                    this.setState({teachers: this.state.teachers.filter(teacher => teacher.Id!==id)})
                });
            }else {
                response.text().then(message => alert(message))
            }
        })
        .catch(error => console.log(error));
    }

    render() {
        const heading=["FirstName", "LastName", "UserName", "Email","","",""]; 
        const teacherHeading=["FirstName", "LastName"];
        // const subjectss=this.state.subjectss;
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
                <Modal show={this.state.openDialog2} onClose={this.closeDetails2}>
                    <div>
                        <label>Select subject</label>
                        <SubjectDD state={this.state} />
                         {/* <button className="btn-update" onClick={()=>this.addSubject(this.state.IdSubject, Teacher.ID)}> Add subject</button> */}
                 </div>
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
                               this.state.teachers && this.state.teachers.map((teacher)=>
                                    <tr key={teacher.Id}>
                                        <td>{teacher.FirstName}</td>
                                        <td>{teacher.LastName}</td>
                                        <td>{teacher.UserName}</td>
                                        {(teacher.Email!==null)?
                                        <td>{teacher.Email}</td>:
                                        <td>/</td>
                                        }
                                        {/* <td key="Teachers"><button className="btn-update" onClick={()=>this.openDetails(subject.Teachers)}>Teachers</button></td>*/}
                                        <td key="Delete"><button className="btn-update" onClick={()=>this.deleteTeacher(teacher.Id)}> Delete</button></td>
                                        <td key="Update"><button className="btn-update" onClick={()=>this.updateTeacher(teacher.Id)}> Update</button></td> 
                                        <td key="AddSubject"><button className="btn-update" onClick={()=>this.openDetails2(teacher.Id)}> Add subject</button></td> 
                                    </tr>  
                                )
                            }
                        </tbody>
                    </table>
                } 
                {console.log(this.state.teachers)}
                {console.log(this.state.subjectss)}
                <Link to="/addTeacher">Add new teacher</Link>
            </div>
        )
    }
};

export default Teacher;