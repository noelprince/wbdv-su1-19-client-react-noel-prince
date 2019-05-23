import React from 'react';
import {Link} from 'react-router-dom';


const CourseRow = ({course, deleteRow}) =>
    <tr>
        <td>
            <Link to={`/course-editor/${course.id}`}>{course.title}</Link>
        </td>
        <td>{course.ownedBy}</td>
        <td>{course.id}</td>
        <td><i className="fa fa-times-circle" id={course.id} onClick={deleteRow}></i></td>
    </tr>

export default CourseRow;