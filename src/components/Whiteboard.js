import React from 'react'
import CourseCard from './CourseCard'
import ModuleList from "./ModuleList";
import CourseEditor from "./CourseEditor";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import CourseList from './CourseList';
import CourseGrid from './CourseGrid';

export default class Whiteboard extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <h1>WhiteBoard</h1>
                    <Link to="/course-list">List</Link>
                    <Link to="/course-grid">Grid</Link>
                    <Link to="/course-editor">Editor</Link>
                    <Route path="/course-grid"
                           component={CourseGrid}></Route>
                    <Route path="/course-list"
                           component={CourseList}></Route>
                    <Route path="/course-editor"
                           component={CourseEditor}></Route>

                    <div className="card-group">
                        <CourseCard title="CS5200"/>
                        <CourseCard title="CS5610"/>
                        <CourseCard title="CS5500"/>
                    </div>
                </div>
            </Router>
        )
    }
}

