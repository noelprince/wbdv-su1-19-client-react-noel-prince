import React from 'react';
import './lesson-tabs.style.client.css';

export default class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    renderHelper() {
        if (this.props.activeModule != null && this.props.activeModule.lessons != null) {
            return this.props.activeModule.lessons.map((lesson) => {
                if (lesson.id === this.props.activeLesson.id) {
                    return (<li className="nav-item">
                                <a className="nav-link active" href="#" onClick={() => this.props.setActiveLesson(lesson)}>{lesson.title}</a><i className="fa fa-times-circle" onClick={this.didIwork}></i>
                            </li>)
                } else {
                    return (<li className="nav-item"
                                ><a className="nav-link" href="#" onClick={() => this.props.setActiveLesson(lesson)}>{lesson.title}</a><i className="fa fa-times-circle"></i>
                            </li>)
                }
            })
        } else {
            return (<li className="nav-item">
                        <a className="nav-link disabled" href="#">No Lessons</a>
                    </li>)
        }
    }

    render() {
        return(
            <ul className="nav nav-tabs">
                {this.renderHelper()}
            </ul>
        )
    }
}