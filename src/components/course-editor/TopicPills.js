import React from 'react'

export default class TopicPills extends React.Component {
    constructor(props) {
        super(props);
        this.removeTopic = this.removeTopic.bind(this);
        this.state = {
            activeModule: this.props.activeModule,
            activeLesson: this.props.activeLesson,
            activeTopic: this.props.activeTopic,
            courseService: this.props.courseService,
            course: this.props.course,
            renderAgain: this.props.renderAgain,
            setActiveTopic: this.props.setActiveTopic
        }
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
                        //console.log(lessonMapItem);
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
    }

    renderHelper() {
        console.log(this.state.activeLesson);
        if (this.state.activeLesson != null && this.state.activeLesson.topics != null) {
            return this.state.activeLesson.topics.map((topic, index) => {
                if (topic === this.state.activeTopic) {
                    return (<li className="nav-item" key={index}>
                                <a className="nav-link active" href="#" onClick={() => this.state.setActiveTopic(topic)}>{topic.title}
                                <i className="fa fa-times-circle" onClick={(e) => {
                                    this.removeTopic(topic);
                                    e.stopPropagation();
                                }}></i></a>
                            </li>)
                } else {
                    return (<li className="nav-item" key={index}>
                                <a className="nav-link" href="#" onClick={() => this.state.setActiveTopic(topic)}>{topic.title}
                                <i className="fa fa-times-circle" onClick={(e) => {
                                    this.removeTopic(topic);
                                    e.stopPropagation();
                                }}></i></a>
                            </li>)
                }
            })
        } else {
            return (<li className="nav-item" key={(new Date).getTime()}>
                        <a className="nav-link disabled">No Topics</a>
                    </li>)
        }
    }

    render() {
        return(
            <ul className="nav nav-pills">
                {this.renderHelper()}
            </ul>
        )
    }
}