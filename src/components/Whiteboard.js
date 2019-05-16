import React from 'react'
import CourseCard from './CourseCard'
import ModuleList from "./ModuleList";
import CourseEditor from "./CourseEditor";

export default class Whiteboard extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>WhiteBoard</h1>

                <CourseEditor/>

                <div className="card-group">
                    <CourseCard title="CS5200"/>
                    <CourseCard title="CS5610"/>
                    <CourseCard title="CS5500"/>
                </div>
            </div>
        )
    }
}

