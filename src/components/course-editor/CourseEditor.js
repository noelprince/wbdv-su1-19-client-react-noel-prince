import React from 'react'
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import TopicPills from "./TopicPills";


export default class CourseEditor extends React.Component {
    constructor(props) {
            super(props);
            const pathParts = window.location.href.split("/");
            const courseId = pathParts[4];
            const courseService = this.props.courseService;
            const course = courseService.findCourseById(courseId);
            this.setActiveModule = this.setActiveModule.bind(this);
            this.setActiveLesson = this.setActiveLesson.bind(this);
            this.setActiveTopic = this.setActiveTopic.bind(this);
            this.state = {
                courseId: courseId,
                course: course,
                activeModule: null,
                activeLesson: null,
                activeTopic: null,
                courseService: courseService
            }
        }
    
    setActiveModule(module) {
        console.log(module);
        for (var i = 0; i < this.state.course.modules.length; i++) {
            if (module.id === this.state.course.modules[i].id) {
                console.log(module.id);
                console.log("step 1");
                this.setState({
                        activeModule: this.state.course.modules[i]
                })
                if (this.state.course.modules[i].lessons  != null && this.state.course.modules[i].lessons[0]  != null) {
                    console.log("step 2");
                    this.setState({
                        activeLesson: this.state.course.modules[i].lessons[0]
                    })
                    if (this.state.course.modules[i].lessons[0].topics != null && this.state.course.modules[i].lessons[0].topics[0] != null) {
                        console.log("step 3");
                        this.setState({
                            activeTopic: this.state.course.modules[i].lessons[0].topics[0]
                        })
                    } else {
                        this.setState({
                            activeTopic: null
                        })
                    }
                } else {
                    console.log("woops");
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

    render() {
        return(
            <div>
                <h2>Course Editor {this.state.courseId}</h2>
                <div className="row">
                    <div className="col-4 left">
                        <ModuleList courseService={this.state.courseService}
                                    course={this.state.course}
                                    setActiveModule={this.setActiveModule}/>
                    </div>
                    <div className="col-8 right">
                        <LessonTabs activeModule={this.state.activeModule}
                                    activeLesson={this.state.activeLesson}
                                    courseService={this.state.courseService}
                                    course={this.state.course}
                                    setActiveLesson={this.setActiveLesson}/>
                        <br/>
                        <TopicPills activeLesson={this.state.activeLesson}
                                    activeTopic={this.state.activeTopic}
                                    courseService={this.state.courseService}
                                    course={this.state.course}
                                    setActiveTopic={this.setActiveTopic}/>
                    </div>
                </div>
            </div>
        )
    }
}