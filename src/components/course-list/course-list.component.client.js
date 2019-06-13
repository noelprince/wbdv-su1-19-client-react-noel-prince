import React from 'react';
import CourseRow from './course-list-item.component.client';
import {Link} from 'react-router-dom';
import './course-list.style.client.css';

export default class CourseList extends React.Component {
    constructor(props) {
        super(props);
        const courseService = this.props.courseService;
        this.addCourse = this.addCourse.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        courseService.findAllCourses()
            .then(courses => {
                console.log(courses)
                this.setState({courses: courses})
            })
        this.state = {
            courseName: "",
            courses: [],
            courseService: courseService
        }
    }

    addCourse() {
        const course = {
            title: this.state.courseName,
            modules: []
        }
        this.state.courseService.createCourse(course)
            .then(courses => {
                this.setState({
                    courses: courses
                })
            })
    }

    deleteRow(event) {
        const rowId = event.target.id;
        this.state.courseService.deleteCourse(rowId)
            .then(courses => {
                this.setState({
                    courses: courses
                })
            })
    }

    titleChange = (event) => {
        const courseName = event.target.value;
        this.setState({
            courseName: courseName
        })
    }

    render() {
        return (
            <div className="course-list">
                <div className="navbar navbar-expand-md bg-primary">
                    <i className="fa fa-home"></i>
                    <h2>Course Manager</h2>
                    <form className="form-inline col-sm-7">
                        <input className="form-control wbdv-navbar-add col-lg-12"
                            type="text"
                            placeholder="New Course Title"
                            onChange={this.titleChange}/>
                    </form>
                    <i className="fa fa-plus-circle wbdv-plus-circle" onClick={this.addCourse}></i>
                    <Link to={"/course-grid"}> <i className="fa fa-th-large"></i></Link>
                </div>
                <div className="list-group">
                    <table className="table">
                        <thead>
                            <tr className="wbdv-table-heading">
                                <td><h6>Title</h6></td>
                                <td><h6>Owned By</h6></td>
                                <td><h6>Last Modified</h6></td>
                            </tr>
                        </thead>
                        <tbody>
                        {console.log(this.state.courses)}
                        {
                            this.state.courses.map((course, index) => 
                                <CourseRow key={index} course={course} deleteRow={this.deleteRow}/>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}