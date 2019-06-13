import React from 'react';

//const url = "http://localhost:8080"
const url = "https://wbdv-a5-noel-prince.herokuapp.com/"

class ModuleService extends React.Component {

    createModule = (courseId, module) => {
        console.log(courseId);
        return fetch(`${url}/api/courses/${courseId}/modules`, {
            method: 'POST',
            body: JSON.stringify(module),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }

    findAllModules = (courseId) => {
        return fetch(`${url}/api/courses/${courseId}/modules`)
            .then(response => response.json())
        //return this.state.courses;
    }

    findModuleById = (id) => {
        return this.state.courses.find(course => course.id === id);
    }

    updateModule = (id, courseId, module) => {
        console.log(module.title);
        console.log(module.id);
        return (fetch(`${url}/api/courses/${courseId}/modules/${id}`, {
            method: 'PUT',
            body: JSON.stringify(module),
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

    deleteModule = (id, courseId) => {
        return fetch(`${url}/api/courses/${courseId}/modules/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
        /*const coursesNew = this.state.courses.filter(course => course.id !== id);
        this.state.courses = coursesNew;
        this.setState({
            courses: coursesNew
        })*/
    }
}

export default ModuleService;