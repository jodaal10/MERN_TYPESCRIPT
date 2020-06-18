import React from 'react'

interface PropsFromState {}

interface propsFromDispatch {}

type ProgressProps = PropsFromState & propsFromDispatch;

export const Progress: React.FC<ProgressProps> = () => {
    return (
        <div>
            <h1 className="large text-title">Progress</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to progress
            </p>
        </div>
    )
}