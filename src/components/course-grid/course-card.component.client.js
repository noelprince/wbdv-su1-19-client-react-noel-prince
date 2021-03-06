import React from 'react';
import {Link} from 'react-router-dom';

const CourseCard = ({course}) =>
            <div className="card" styles={{width: '18rem'}}>
                <img className="card-img-top"
                     src="https://picsum.photos/300/200"/>
                <div className="card-body">
                    <h5 className="card-title">
                        {course.title}
                    </h5>
                    <p className="card-text">Card text.</p>
                    <Link to={`/course-editor/${course.id}`}><button className="btn btn-primary">More...</button></Link>
                </div>
            </div>

export default CourseCard;