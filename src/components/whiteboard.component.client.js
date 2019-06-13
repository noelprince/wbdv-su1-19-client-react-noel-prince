import React from 'react'
import CourseEditor from "./course-editor/course-editor.component.client";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CourseList from './course-list/course-list.component.client';
import CourseGrid from './course-grid/course-grid.component.client.js';
import CourseService from '../services/CourseService';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './whiteboard.style.client.css';
import {Provider} from 'react-redux';
import WidgetReducer from '../reducers/WidgetReducer';
import WidgetService from '../services/WidgetService';
import WidgetListContainer from '../container/WidgetListContainer';
import {createStore} from 'redux';

const store = createStore(WidgetReducer)

export default class Whiteboard extends React.Component {
    constructor(props) {
        super(props);
        this.widgetService = WidgetService.getInstance();
        this.state = {
            courseService: new CourseService(),
            widgets: this.widgetService.findAllWidgets()
        }
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Link to="/widget-list">Widget List</Link>
                    <Route path="/course-grid"
                            render = {() => <CourseGrid courseService={this.state.courseService}/>}></Route>
                    <Route exact path="/"
                            render = {() => <CourseList courseService={this.state.courseService}/>}></Route>
                    <Route path="/course-editor/:courseId"
                            render = {() => <CourseEditor courseService={this.state.courseService}/>}></Route>
                    <Route path="/widget-list"
                           render = {() => <WidgetListContainer/>}></Route>
                </Router>
            </Provider>
        )
    }
}

