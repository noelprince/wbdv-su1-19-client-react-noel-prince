import React from 'react'
import CourseCard from './CourseCard'
import ModuleList from "./ModuleList";
import CourseEditor from "./CourseEditor";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import CourseList from './CourseList';
import CourseGrid from './CourseGrid';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

export default class Whiteboard extends React.Component {
    render() {
        return (
            <Router>
                    <Route path="/course-grid"
                           exact component={CourseGrid}></Route>
                    <Route path="/"
                           exact component={CourseList}></Route>
                    <Route path="/course-editor/:courseId"
                           exact component={CourseEditor}></Route>
            </Router>
        )
    }
}

