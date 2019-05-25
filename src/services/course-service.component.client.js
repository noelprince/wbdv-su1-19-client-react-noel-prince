import React from 'react';
import courses from './courses.json';

class CourseService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: courses
        }
    }
    createCourse = (course) => {
        this.state.courses.push(course);
    }

    findAllCourses = () => {
        return this.state.courses;
    }

    findCourseById = (id) => {
        return this.state.courses.find(course => course.id === id);
    }

    updateCourse = (id, course) => {
        var index = -1;
        for (var i=0; i < this.state.courses.length; i++) {
            if (this.state.courses[i].id === id) {
                index = i;
            }
        }
        this.state.courses[index] = course;
    }

    deleteCourse = (id) => {
        const coursesNew = this.state.courses.filter(course => course.id !== id);
        this.setState({
            courses: coursesNew
        })
    }
}

export default CourseService;