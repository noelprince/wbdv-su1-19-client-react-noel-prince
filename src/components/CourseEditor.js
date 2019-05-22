import React from 'react'
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import TopicPills from "./TopicPills";


export default class CourseEditor
    extends React.Component {
        constructor(props) {
            super(props);
            const pathParts = window.location.href.split("/");
            const courseId = pathParts[4];
            const courseService = this.props.courseService;
            const course = courseService.findCourseById(courseId);
            console.log(course);
            this.state = {
                courseId: courseId,
                course: course,
                courseService: courseService
            }
        }

    render() {
        return(
            <div>
                <h2>Course Editor {this.state.courseId}</h2>
                <div className="row">
                    <div className="col-4 left">
                        <ModuleList courseService={this.state.courseService} course={this.state.course}/>
                    </div>
                    <div className="col-8 right">
                        <LessonTabs courseService={this.state.courseService} course={this.state.course}/>
                        <br/>
                        <TopicPills/>
                    </div>
                </div>
            </div>
        )
    }
}