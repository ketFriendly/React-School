import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { STUDENTS, MARKS, PARENTS, TEACHERS, CLASSES, SUBJECTS } from '../../service/api';
import Modal from '../common/Modal';
import '../../style/components/subject/subject.css';
import '../../style/common/table.css';

class MarksDD extends Component{
    constructor(props,subjects,students) {
        super(props);
        this.subjects = subjects;
        console.log(this.subjects);
    }
    render(){
        let marks = [1,2,3,4,5];
        let optionItems = marks.map((mark) =>
                <option key={mark} value={mark}>{mark}</option>
            );

        return (
         <div>
             
             <select id="selected">
                {optionItems}
             </select>
             {/* <button className="btn-update" onClick={()=>this.handleSubject()}> Add subject</button> */}
         </div>
        )
    }
}
class Mark extends Component {
    constructor(props) {
        super(props);
        this.state = {marks: [], openDialog: false, mark:null, subjects: [], openDialog2:false, classes: [],cl:null , ts: [], subjectId:0, students:[],subjectName:'',className:'', stylee:null};
    } 
    componentDidMount(){
        const path = TEACHERS + "/getAllTeachersSubjects/" + localStorage.getItem("user");
        if(localStorage.getItem('token') === null || localStorage.getItem("role") !== "Teacher") {
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
    }
    openClasses(subjectId, subjectName){
        const teacherId = localStorage.getItem("user");
        const path1 = SUBJECTS+ "/" + subjectId + "/subjectsClasses/" + teacherId;
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  '+localStorage.getItem("token")
                }
            };
            fetch(path1, requestOptions)
            .then(response => {
                if(response.ok) {
                    response.json().then(data =>
                        this.setState({classes: data, openDialog:true, subjectId:subjectId, subjectName:subjectName})
                    )
                }else {
                    response.text().then(message => alert(message))
                }
            })
            .catch(error => console.log(error))  
            
            console.log(this.state.subjectName);
            // this.state.ts.filter(ts => ts.IdTeacher ===teacherId)
            // this.setState({classes: this.state.classes.filter(cl => cl.TeachesSubjects.IdTeachesSubject !==id)})
    }
    openStudents(id){
        const style = {
            display:'none'
        }
        const path2 = CLASSES + "/studentsInClass/"+id;
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  '+localStorage.getItem("token")
                }
            };
            fetch(path2, requestOptions)
            .then(response => {
                if(response.ok) {
                    response.json().then(data =>
                        this.setState({students:data, stylee:style})
                    )
                }else {
                    response.text().then(message => alert(message))
                }
            })
            .catch(error => console.log(error))  
           this.setState({openDialog2:true})
        // this.setState({students: this.state.students.filter(student => student.IdClass ===id)})
        
    }
    closeDetails = () => {
        this.setState({student:null, openDialog:false, openDialog2:false});
    }
    handleSubmitMarks = (event) =>{
        let elements = document.getElementsByName("nameMarks");
        let marks = [];
        const mark = {teacherId:'',studentId:'',subjectId:0,mark:0};
        elements.forEach(element => {
            let divID = element.childNodes[3];
            
            let idd = divID.innerHTML;
            let id = idd+'';

            let e = element.childNodes[2];
            let div = e.childNodes[0];
            let sel = div.childNodes[0];
            let ind = sel.selectedIndex;
            let markk = sel.options[ind].value;

            mark.studentId = id;
            mark.subjectId = this.state.subjectId;
            mark.teacherId = localStorage.getItem("user");
            mark.mark = markk;
            console.log(element.childNodes[0])
            console.log(id)
            console.log(element.childNodes[3])
            marks.push(mark);
        });
        let markStrings = '';
        const path = MARKS+"/submit";
         marks.forEach(function(mark) {
               const markString =  JSON.stringify({
                teacherId:mark.teacherId,
                studentId:mark.studentId,
                subjectId:mark.subjectId,
                mark: mark.mark
                })
                markStrings = markStrings + markString+ ",";
         }
        )
        markStrings = markStrings.slice(0,-1);
        markStrings = "["+markStrings+"]";
        console.log(markStrings);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            body: markStrings
        };
        fetch( path, requestOptions)
        .then(response => {
                if(response.ok) {
                    // response.json().then(data => {
                        this.setState({errorMessage: ''})
                        // this.props.history.push("/marks");
                    //});
                }else {
                    response.text().then(message => this.setState({errorMessage: message}))
                }
            })
        .catch(error => console.log(error))
        
        event.preventDefault();
        

    }
    render(){
        const heading = ["Subject Name", "Weekly Class No", ""]
        const classesHeading = ["Class number", "Grade", ""]
        const studentsHeading = ["Name", "Surname",""];
        return(
            <div className="subject_wrapper">
             <Modal show={this.state.openDialog} onClose={this.closeDetails}>{
                this.state.classes &&
                <div>
                    <h1>{this.state.subjectName}</h1>
                     <table>
                        <thead>
                            <tr>
                                {
                                    classesHeading.map((head,index) => <th key={index}>{head}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                                { 
                                    this.state.classes && this.state.classes.map((item,id)=>
                                        <tr key={id}>
                                            <td>{item.ClassNo}</td>
                                            <td>{item.Grade}</td>
                                            <td key="Class"><button className="btn-update" onClick={()=>this.openStudents(item.IdClass)}>Students</button></td>
                                        </tr>  
                                )}
                        </tbody>
                    </table>
                </div>
                   
                    }
            </Modal>
             <Modal show={this.state.openDialog2} onClose={this.closeDetails}>{
                this.state.students &&
                <div>
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
                                    this.state.students && this.state.students.map((item,id)=>
                                        <tr key={id} name="nameMarks">
                                            <td name="FirstName">{item.FirstName}</td>
                                            <td name="LastName">{item.LastName}</td>
                                            <td name = "mark"><MarksDD></MarksDD></td>
                                            <td name = {item.Id} className="Id">{item.Id}</td>
                                            {/* className="Id"value={item.Id} */}
                                            {/* <td key="Class"><button className="btn-update" onClick={()=>this.openStudents(item.IdClass)}>Students</button></td> */}
                                        </tr>  
                                    )}
                        </tbody>
                    </table>
                    <button onClick={this.handleSubmitMarks}>Submit</button>
                </div>
                    
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
                           this.state.subjects && this.state.subjects.map((subject, Id )=>
                                <tr key={Id}>
                                    <td>{subject.SubjectName}</td>
                                    <td>{subject.WeeklyClassNo}</td>
                                    {
                                        subject.Teachers !== null ? <td key="Class"><button className="btn-update" onClick={()=>this.openClasses(subject.SubjectDtoId, subject.SubjectName)}>Classes</button></td> : <td>"No class listens to this subject yet "</td>
                                    }
                                    
                                    {/* <td key="Parents"><button className="btn-update" onClick={()=>this.openParents(student.Parents)}> Parents</button></td>
                                    <td key="Delete"><button className="btn-update" onClick={()=>this.deleteStudent(student.Id)}> Delete</button></td>
                                    <td key="Update"><button className="btn-update" onClick={()=>this.updateStudent(student.Id)}> Update</button></td> */}
                                </tr>  
                            )
                        }
                    </tbody>
                </table>
            } 
               {/* // <Link to="/addStudent">Add new student</Link> */}
                </div>
            )
         }
    }

    export default Mark;