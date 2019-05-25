import React from 'react'
import CourseEditor from "./course-editor/course-editor.component.client";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CourseList from './course-list/course-list.component.client';
import CourseGrid from './course-grid/course-grid.component.client.js';
import CourseService from '../services/course-service.component.client';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './whiteboard.style.client.css';

export default class Whiteboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseService: new CourseService()
        }
    }
    render() {
        return (
            <Router>
                <Route path="/course-grid"
                        render = {() => <CourseGrid courseService={this.state.courseService}/>}></Route>
                <Route exact path="/"
                        render = {() => <CourseList courseService={this.state.courseService}/>}></Route>
                <Route path="/course-editor/:courseId"
                        render = {() => <CourseEditor courseService={this.state.courseService}/>}></Route>
            </Router>
        )
    }
}

