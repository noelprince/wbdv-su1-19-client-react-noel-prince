import React from 'react';
import './lesson-tabs.style.client.css';

export default class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.removeLesson = this.removeLesson.bind(this);
        this.addLesson = this.addLesson.bind(this);
        this.updateLesson = this.updateLesson.bind(this);
        this.state = {
            activeModule: this.props.activeModule,
            activeLesson: this.props.activeLesson,
            courseService: this.props.courseService,
            course: this.props.course,
            lessonUpdate: {
                id: -1,
                title: "",
                topics: []
            },
            renderAgain: this.props.renderAgain,
            setActiveLesson: this.props.setActiveLesson,
            title: ""
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

        var newCourse = {
            id: this.state.course.id,
            title: this.state.course.title,
            modules: newModuleList
        }

        this.state.courseService.updateCourse(newCourse.id, newCourse);
        this.state.renderAgain();

        this.setState({
            title: ""
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
        if (this.state.activeModule != null) {
            return (<li>
                        <input className="form-control"
                            placeholder="New Lesson"
                            type="text"
                            onChange={this.titleChanged}
                            value={this.state.title}/>
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
            },
            state: this.state
        })
    }

    renderHelper() {
        if (this.state.activeModule !== null && this.state.activeModule.lessons !== null && this.state.activeModule.lessons.length != 0) {
            return this.state.activeModule.lessons.map((lesson) => {
                var activeLevel = "";
                if (this.state.activeLesson !== null && lesson.id === this.state.activeLesson.id) {
                    activeLevel="nav-link active"
                } else {
                    activeLevel="nav-link"
                }
                if (lesson.id === this.state.lessonUpdate.id) {
                    return (<li className="list-group-item">
                                <input className="form-control"
                                    placeholder="New Lesson"
                                    type="text"
                                    onChange={this.updateTitleChanged}
                                    value={this.state.lessonUpdate.title}/>
                                <button onClick={this.submitLesson} className="btn btn-primary btn-block">
                                    submit
                                </button>
                            </li>
                    )
                } else {
                    return (<li className="nav-item" key={lesson.id}>
                                <a className={activeLevel} href="#" onClick={() => this.state.setActiveLesson(lesson)}>{lesson.title}
                                <i className="fa fa-edit" onClick={(e) => {
                                    this.updateLesson(lesson);
                                    e.stopPropagation();
                                }}></i>
                                <i className="fa fa-times-circle" onClick={(e) => {
                                    this.removeLesson(lesson);
                                    e.stopPropagation();
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

    submitLesson = () => {
        var newModuleList = this.state.course.modules.map(moduleItem => {
            if (moduleItem.id === this.state.activeModule.id) {
                return {
                    id: moduleItem.id,
                    title: moduleItem.title,
                    lessons: moduleItem.lessons.map(lessonItem => {
                        console.log(lessonItem.id);
                        console.log(this.state.lessonUpdate.id);
                        if (lessonItem.id === this.state.lessonUpdate.id) {
                            return this.state.lessonUpdate;
                        } else {
                            return lessonItem;
                        }
                    })
                };
            } else {
                return moduleItem;
            }
        });

        var newCourse = {
            id: this.state.course.id,
            title: this.state.course.title,
            modules: newModuleList
        }

        this.setState({
            lessonUpdate: {
                id: -1
            },
            activeModule: this.state.activeModule,
            state: this.state
        })

        this.state.courseService.updateCourse(newCourse.id, newCourse);
        this.state.renderAgain();
        this.state.activeModule.modules = newModuleList;
    }

    titleChanged = (event) => {
        this.setState ({
            title: event.target.value
        })
    }

    updateLesson = (lesson) => {
        this.setState({
            lessonUpdate: {
                id: lesson.id,
                title: lesson.title,
                topics: lesson.topics
            }
        })
    }

    updateTitleChanged = (event) => {
        this.setState({
            lessonUpdate: {
                id: this.state.lessonUpdate.id,
                title: event.target.value,
                topics: this.state.lessonUpdate.topics
            }
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