import React from 'react';
import './lesson-tabs.style.client.css';

export default class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.removeLesson = this.removeLesson.bind(this);
        this.addLesson = this.addLesson.bind(this);
        this.state = {
            activeModule: this.props.activeModule,
            activeLesson: this.props.activeLesson,
            courseService: this.props.courseService,
            course: this.props.course,
            renderAgain: this.props.renderAgain,
            setActiveLesson: this.props.setActiveLesson,
            title: "New Lesson"
        }
    }

    addLesson() {
        var newLesson = {
            id: (new Date().getTime()),
            title: this.state.title === "" ? "New Lesson" : this.state.title,
            topics: []
        }
        var newModuleList = this.state.course.modules.map(moduleItem => {
            if (moduleItem.id === this.state.activeModule.id) {
                var newLessons = moduleItem.lessons;
                newLessons.push(newLesson);
                return {
                    id: moduleItem.id,
                    title: moduleItem.title,
                    lessons: newLessons
                }
            } else {
                return moduleItem;
            }
        })

        console.log(newModuleList);

        var newCourse = {
            id: this.state.course.id,
            title: this.state.course.title,
            modules: newModuleList
        }

        this.state.courseService.updateCourse(newCourse.id, newCourse);
        this.state.renderAgain();

        this.setState({
            title: "New Lesson"
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            activeModule: nextProps.activeModule,
            activeLesson: nextProps.activeLesson,
            courseService: nextProps.courseService,
            course: nextProps.course,
            renderAgain: nextProps.renderAgain,
            setActiveLesson: nextProps.setActiveLesson
        })
    }

    inputHelper() {
        console.log(this.state.activeModule);
        if (this.state.activeModule != null) {
            return (<li>
                        <input className="form-control"
                            placeholder="New Lesson"
                            type="text"
                            onChange={this.titleChanged}/>
                            <button className="btn btn-primary" onClick={this.addLesson}>Add</button>
                    </li>)
        }
    }

    removeLesson(lesson) {
        var newModuleList = this.state.course.modules.map(moduleItem => {
            if (moduleItem.id === this.state.activeModule.id) {
                return ({
                    id: moduleItem.id,
                    title: moduleItem.title,
                    lessons: moduleItem.lessons.filter(lessonMapItem => lessonMapItem.id != lesson.id)
                })
            } else {
                return moduleItem
            }
        })

        var newCourse = {
            id: this.state.course.id,
            title: this.state.course.title,
            modules: newModuleList
        }

        this.state.courseService.updateCourse(newCourse.id, newCourse);
        this.state.renderAgain();
        this.setState({
            activeModule: {
                id: this.state.activeModule.id,
                title: this.state.activeModule.title,
                lessons: this.state.activeModule.lessons.filter(lessonItem => lessonItem.id != lesson.id)
            }
        })
    }

    renderHelper() {
        if (this.state.activeModule != null && this.state.activeModule.lessons != null && this.state.activeModule.lessons.length != 0) {
            return this.state.activeModule.lessons.map((lesson) => {
                if (this.state.activeLesson != null && lesson.id === this.state.activeLesson.id) {
                    return (<li className="nav-item" key={lesson.id}>
                                <a className="nav-link active" href="#" onClick={() => this.state.setActiveLesson(lesson)}>{lesson.title}
                                <i className="fa fa-times-circle" onClick={(e) => {
                                    this.removeLesson(lesson);
                                    e.stopPropagation();
                                }}></i></a>
                            </li>)
                } else {
                    return (<li className="nav-item" key={lesson.id}>
                                <a className="nav-link" href="#" onClick={() => this.state.setActiveLesson(lesson)}>{lesson.title}
                                <i className="fa fa-times-circle" onClick={(e) => {
                                    this.removeLesson(lesson);
                                    }}></i></a>
                            </li>)
                }
            })
        } else {
            return (<li className="nav-item" key={(new Date).getTime()}>
                        <a className="nav-link disabled" href="#">No Lessons</a>
                    </li>)
        }
    }

    titleChanged = (event) => {
        this.setState ({
            title: event.target.value
        })
    }

    render() {
        return(
            <ul className="nav nav-tabs">
                {this.renderHelper()}
                {this.inputHelper()}
            </ul>
        )
    }
}