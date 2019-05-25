import React from 'react'

export default class TopicPills extends React.Component {
    constructor(props) {
        super(props);
        this.addTopic = this.addTopic.bind(this);
        this.inputHelper = this.inputHelper.bind(this);
        this.removeTopic = this.removeTopic.bind(this);
        this.state = {
            activeModule: this.props.activeModule,
            activeLesson: this.props.activeLesson,
            activeTopic: this.props.activeTopic,
            courseService: this.props.courseService,
            course: this.props.course,
            renderAgain: this.props.renderAgain,
            setActiveTopic: this.props.setActiveTopic,
            title: "",
            topicUpdate: {
                originalTitle: "",
                title: ""
            }
        }
    }

    addTopic() {
        var newTopic = {
            title: this.state.title === "" ? "New Topic" : this.state.title
        }

        var newModuleList = this.state.course.modules.map(moduleItem => {
            if (moduleItem.id === this.state.activeModule.id) {
                var newModuleLessons =  moduleItem.lessons.map(lessonItem => {
                    if (lessonItem.id === this.state.activeLesson.id) {
                        lessonItem.topics.push(newTopic);
                        return {
                            id: lessonItem.id,
                            title: lessonItem.title,
                            topics: lessonItem.topics
                        }
                    } else {
                        return lessonItem;
                    }
                })
                return {
                    id: moduleItem.id,
                    title: moduleItem.title,
                    lessons: newModuleLessons
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
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            activeModule: nextProps.activeModule,
            activeLesson: nextProps.activeLesson,
            activeTopic: nextProps.activeTopic,
            courseService: nextProps.courseService,
            course: nextProps.course
        })
    }

    inputHelper() {
        if (this.state.activeModule != null && this.state.activeLesson != null) {
            return (<li>
                        <input className="form-control"
                            placeholder="New Topic"
                            type="text"
                            onChange={this.titleChanged}
                            value={this.state.title}/>
                            <button className="btn btn-primary" onClick={this.addTopic}>Add</button>
                    </li>)
        }
    }

    removeTopic(topic) {
        this.state.activeLesson.topics = this.state.activeLesson.topics.filter(topicItem => topicItem != topic);
        var newModuleList = this.state.course.modules.map(moduleItem => {
            if (moduleItem.id === this.state.activeModule.id) {
                var newModuleLessons = moduleItem.lessons.map(lessonMapItem => {
                    if (lessonMapItem.id === this.state.activeLesson.id) {
                        var a = lessonMapItem.topics.filter(topicPillMapItem => topicPillMapItem != topic);
                        var b = {
                            id: lessonMapItem.id,
                            title: lessonMapItem.title,
                            topics: a
                        }
                        return b;
                    } else {
                        return lessonMapItem;
                    }
                })
                return ({
                    id: moduleItem.id,
                    title: moduleItem.title,
                    lessons: newModuleLessons
                })
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
        this.props.setActiveLesson(this.state.activeLesson);
    }

    renderHelper() {
        if (this.state.activeLesson != null && this.state.activeLesson.topics != null) {
            return this.state.activeLesson.topics.map((topic, index) => {
                var classNameInfo = "";
                if (this.state.activeTopic != null && topic.title === this.state.activeTopic.title) {
                    classNameInfo="nav-link active";
                    
                } else {
                    classNameInfo="nav-link"
                }
                if (topic.title === this.state.topicUpdate.originalTitle) {
                    return (<li className="list-group-item">
                                <input className="form-control"
                                    placeholder="New Topic"
                                    type="text"
                                    onChange={this.updateTitleChanged}
                                    value={this.state.topicUpdate.title}/>
                                <button onClick={this.submitTopic} className="btn btn-primary btn-block">
                                    "submit"
                                </button>
                            </li>)
                } else {
                    return (<li className="nav-item" key={index}>
                                <a className={classNameInfo} href="#" onClick={() => this.state.setActiveTopic(topic)}>{topic.title}
                                    <i className="fa fa-edit" onClick={(e) => {
                                        this.updateTopic(topic);
                                        e.stopPropagation();
                                    }}></i>
                                    <i className="fa fa-times-circle" onClick={(e) => {
                                        this.removeTopic(topic);
                                        e.stopPropagation();
                                    }}></i>
                                </a>
                            </li>)
                }
            })
        } else {
            return (<li className="nav-item" key={(new Date).getTime()}>
                        <a className="nav-link disabled">No Topics</a>
                    </li>)
        }
    }

    submitTopic = () => {
        var newModuleList = this.state.course.modules.map(moduleItem => {
            if (moduleItem.id === this.state.activeModule.id) {
                return {
                    id: moduleItem.id,
                    title: moduleItem.title,
                    lessons: moduleItem.lessons.map(lessonItem => {
                        if (lessonItem.id === this.state.activeLesson.id) {
                            return {
                                id: lessonItem.id,
                                title: lessonItem.title,
                                topics: lessonItem.topics.map(topicItem => {
                                    if (topicItem.title === this.state.topicUpdate.originalTitle) {
                                        return {
                                            title: this.state.topicUpdate.title
                                        };
                                    } else {
                                        return topicItem;
                                    }
                                })
                            }
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
    }

    titleChanged = (event) => {
        this.setState ({
            title: event.target.value
        })
    }

    updateTopic = (topic) => {
        this.setState({
            topicUpdate: {
                originalTitle: topic.title,
                title: topic.title
            }
        })
    }

    updateTitleChanged = (event) => {
        this.setState({
            topicUpdate: {
                originalTitle: this.state.topicUpdate.originalTitle,
                title: event.target.value,
            }
        })
    }


    render() {
        return(
            <ul className="nav nav-pills">
                {this.renderHelper()}
                {this.inputHelper()}
            </ul>
        )
    }
}