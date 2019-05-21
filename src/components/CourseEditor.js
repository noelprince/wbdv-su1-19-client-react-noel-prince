import React from 'react'
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import TopicPills from "./TopicPills";
import CourseService from "../Services/CourseService";


export default class CourseEditor
    extends React.Component {
        constructor(props) {
            super(props);
            const courseId = props.match.params.courseId;
            this.courseService = new CourseService();
            const course = this.courseService.findCourseById(courseId);
            this.state = {
                courseId: courseId,
                course: course
            }
        }
    render() {
        return(
            <div>
                <h2>Course Editor {this.state.courseId}</h2>
                <div className="row">
                    <div className="col-4 left">
                        <ModuleList modules={this.state.course.modules}/>
                    </div>
                    <div className="col-8 right">
                        <LessonTabs/>
                        <br/>
                        <TopicPills/>
                    </div>
                </div>
            </div>
        )
    }
}