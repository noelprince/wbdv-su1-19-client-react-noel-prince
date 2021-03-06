import React from 'react';
import courses from './courses.json';

//const url = "http://localhost:8080"
const url = "https://wbdv-a5-noel-prince.herokuapp.com/"

class CourseService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: courses
        }
    }

    createCourse = (course) => {
        return fetch(`${url}/api/courses`, {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
        //this.state.courses.push(course);
    }

    findAllCourses = () => {
        return fetch(`${url}/api/courses`)
            .then(response => {
                return response.json()
            })
        //return this.state.courses;
    }

    findCourseById = (id) => {
        return fetch(`${url}/api/courses/${id}`)
            .then(response => {
                return response.json()
            })
    }

    updateCourse = (id, course) => {
        return (fetch(`${url}/api/courses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()))
        /*var index = -1;
        for (var i=0; i < this.state.courses.length; i++) {
            if (this.state.courses[i].id === id) {
                index = i;
            }
        }
        this.state.courses[index] = course;*/
    }

    deleteCourse = (id) => {
        return fetch(`${url}/api/courses/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
        /*const coursesNew = this.state.courses.filter(course => course.id !== id);
        this.state.courses = coursesNew;
        this.setState({
            courses: coursesNew
        })*/
    }
}

export default CourseService;