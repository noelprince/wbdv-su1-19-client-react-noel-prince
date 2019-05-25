import React from 'react';
import CourseCard from './course-card.component.client';
import {Link} from 'react-router-dom';
import '../course-list/course-list.style.client.css';

export default class CourseGrid extends React.Component {
    constructor(props) {
        super(props);
        const courseService = this.props.courseService;
        const courses = courseService.findAllCourses();
        this.addCourse = this.addCourse.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.state = {
            courses: courses,
            courseName: "",
            courseService: courseService
        }
    }

    addCourse() {
        const course = {
            id: (new Date()).getTime().toString(),
            title: this.state.courseName,
            modules: []
        }
        this.state.courseService.createCourse(course);
        this.setState({
            courses: this.state.courseService.findAllCourses()
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
            <div>
                <div className="navbar navbar-expand bg-primary">
                    <i className="fa fa-home"></i>
                    <h2>Course Manager</h2>
                    <form className="form-inline col-lg-7">
                        <input className="form-control wbdv-navbar-add col-lg-12"
                            type="text"
                            placeholder="New Course Title"
                            onChange={this.titleChange}/>
                    </form>
                    <i className="fa fa-plus-circle wbdv-plus-circle col-sm-1" onClick={this.addCourse}></i>
                    <Link to="/course-list"><i className="fa fa-th-large col-sm-1"></i></Link>
                </div>
                <div className="card-group">
                    {
                        this.state.courses.map((course) => <CourseCard key={course.id} course={course}/>)
                    }
                </div>
            </div>
        )
    }
}