import React from 'react'
import CourseEditor from "./course-editor/CourseEditor";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CourseList from './course-list/CourseList';
import CourseGrid from './course-grid/CourseGrid';
import CourseService from '../services/CourseService';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

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
                    <Route path="/course-list"
                           render = {() => <CourseList courseService={this.state.courseService}/>}></Route>
                    <Route path="/course-editor/:courseId"
                           render = {() => <CourseEditor courseService={this.state.courseService}/>}></Route>
            </Router>
        )
    }
}

