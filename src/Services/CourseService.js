import React from 'react';
import courses from './courses.json';

export default class CourseService {
    createCourse = (course) => {
        courses.add(course);
    }

    findAllCourses = () => {
        return courses;
    }

    findCourseById = (id) => {
        return courses.find(course => course.id == id);
    }

    updateCourse = (id, course) => {
        courses.filter(courseRoot => {
            if (courseRoot.id == id) {
                courseRoot = course;
            }
        })
    }

    deleteCourse = (id) => {

    }
}