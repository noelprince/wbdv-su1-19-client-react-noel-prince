import React from 'react'
import ModuleList from "./module-list.component.client";
import LessonTabs from "./lesson-tabs.component.client";
import TopicPills from "./topic-pills.component.client";


export default class CourseEditor extends React.Component {
    constructor(props) {
            super(props);
            const pathParts = window.location.href.split("/");
            const courseId = pathParts[4];
            const course = this.props.courseService.findCourseById(courseId);
            this.renderAgain = this.renderAgain.bind(this);
            this.setActiveModule = this.setActiveModule.bind(this);
            this.setActiveLesson = this.setActiveLesson.bind(this);
            this.setActiveTopic = this.setActiveTopic.bind(this);
            this.state = {
                courseId: courseId,
                course: course,
                courseService: this.props.courseService,
                activeModule: null,
                activeLesson: null,
                activeTopic: null,
            }
        }

    componentWillReceiveProps(nextProps) {
        this.setState({
            courseService: nextProps.courseService
        })
    }
    
    setActiveModule(module) {
        for (var i = 0; i < this.state.course.modules.length; i++) {
            if (module.id === this.state.course.modules[i].id) {
                this.setState({
                        activeModule: this.state.course.modules[i]
                })
                if (this.state.course.modules[i].lessons  != null && this.state.course.modules[i].lessons[0]  != null) {
                    this.setState({
                        activeLesson: this.state.course.modules[i].lessons[0]
                    })
                    if (this.state.course.modules[i].lessons[0].topics != null && this.state.course.modules[i].lessons[0].topics[0] != null) {
                        this.setState({
                            activeTopic: this.state.course.modules[i].lessons[0].topics[0]
                        })
                    } else {
                        this.setState({
                            activeTopic: null
                        })
                    }
                } else {
                    this.setState({
                        activeLesson: null,
                        activeTopic: null
                    })
                }
            }
        }
    }

    setActiveLesson(lesson) {
        for (var i=0; i < this.state.activeModule.lessons.length; i++) {
            if (this.state.activeModule.lessons[i].id === lesson.id) {
                this.setState({
                    activeLesson: this.state.activeModule.lessons[i]
                })
                if (this.state.activeModule.lessons[i].topics != null && this.state.activeModule.lessons[i].topics[0] != null) {
                    this.setState({
                        activeTopic: this.state.activeModule.lessons[i].topics[0]
                    })
                } else {
                    this.setState({
                        activeTopic: null
                    })
                }
            }
        }
    }

    setActiveTopic(topic) {
        for (var i=0; i < this.state.activeLesson.topics.length; i++) {
            if (this.state.activeLesson.topics[i] === topic) {
                this.setState({
                    activeTopic: this.state.activeLesson.topics[i]
                })
            }
        }
    }

    renderAgain() {
        var courses = this.state.courseService.findAllCourses();
        var course = null;
        for (var i = 0; i < courses.length; i++) {
            if  (courses[i].id === this.state.course.id) {
                this.setState({
                    course: courses[i]
                })
                var newActiveModule = null;
                var newActiveLesson = null;
                var newActiveTopic = null;
                if (this.state.activeModule != null) {
                    newActiveModule = courses[i].modules.find(moduleMapItem => this.state.activeModule.id === moduleMapItem.id);
                    this.setState({
                        activeModule: newActiveModule
                    })
                }
                if (newActiveModule != null && this.state.activeLesson != null) {
                    var newActiveLesson = newActiveModule.lessons.find(lessonMapItem => this.state.activeLesson.id === lessonMapItem.id);
                    this.setState({
                        activeLesson: newActiveLesson
                    })
                }
                if (newActiveLesson != null && this.state.activeTopic != null) {
                    var newActiveTopic = newActiveLesson.topics.find(topicMapItem => topicMapItem === this.state.activeTopic);
                    this.setState({
                        newActiveTopic
                    })
                }
                console.log(newActiveModule);
                console.log(newActiveLesson);
                console.log(newActiveTopic);
                if (newActiveModule === null) {
                    console.log("New Active Module was null");
                    this.setState({
                        activeModule: null,
                        activeLesson: null,
                        activeTopic: null
                    })
                } else if (newActiveLesson === null) {
                    console.log("New Actvie Lesson was null");
                    this.setState({
                        activeModule: newActiveModule,
                        activeLesson: null,
                        activeTopic: null

                    })
                } else if (newActiveTopic === null) {
                    console.log("New Active Topic was null");
                    this.setState({
                        activeModule: newActiveModule,
                        activeLesson: newActiveLesson,
                        activeTopic: null
                    })
                }
            }
        }
        this.setState({
            state: this.state
        })
    }

    render() {
        return(
            <div>
                <h1>Course Editor {this.state.courseId}</h1>
                <div className="row">
                    <div className="col-4 left">
                        <ModuleList activeModule={this.state.activeModule}
                                    courseService={this.state.courseService}
                                    course={this.state.course}
                                    renderAgain={this.renderAgain}
                                    setActiveModule={this.setActiveModule}/>
                    </div>
                    <div className="col-8 right">
                        <LessonTabs activeModule={this.state.activeModule}
                                    activeLesson={this.state.activeLesson}
                                    courseService={this.state.courseService}
                                    course={this.state.course}
                                    renderAgain={this.renderAgain}
                                    setActiveLesson={this.setActiveLesson}/>
                        <br/>
                        <TopicPills activeModule={this.state.activeModule}
                                    activeLesson={this.state.activeLesson}
                                    activeTopic={this.state.activeTopic}
                                    courseService={this.state.courseService}
                                    course={this.state.course}
                                    renderAgain={this.renderAgain}
                                    setActiveTopic={this.setActiveTopic}
                                    setActiveLesson={this.setActiveLesson}/>
                    </div>
                </div>
            </div>
        )
    }
}