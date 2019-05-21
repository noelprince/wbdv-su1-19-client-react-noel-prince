import React from 'react';
import CourseCard from './CourseCard';
import CourseList from './CourseList';
import CourseService from '../Services/CourseService';

export default class CourseGrid extends React.Component {
    constructor() {
        super();
        const courseService = new CourseService();
        const courses = courseService.findAllCourses();
        this.state = {
            courses: courses
        }
    }
    render() {
        return (
            <div>
                <h1>Course Grid</h1>
                <div className="card-group">
                    {
                        this.state.courses.map((course) => <CourseCard course={course}/>)
                    }
                </div>
            </div>
        )
    }
}

