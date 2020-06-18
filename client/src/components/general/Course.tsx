import React from 'react'

interface PropsFromState {}

interface propsFromDispatch {}

type CourseProps = PropsFromState & propsFromDispatch;

export const Course: React.FC<CourseProps> = () => {
    return (
        <div>
            <h1 className="large text-title">Courses</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome 
            </p>
        </div>
    )
}
