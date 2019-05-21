import React from 'react';
import {Link} from 'react-router-dom'

const CourseRow = ({course}) =>
    <tr>
        <td>
            <Link to={`/course-editor/${course.id}`}>{course.title}</Link>
        </td>
        <td>{course.ownedBy}</td>
        <td>{course.id}</td>
    </tr>

export default CourseRow;