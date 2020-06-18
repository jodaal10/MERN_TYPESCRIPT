import React from 'react'

interface PropsFromState {}

interface propsFromDispatch {}

type DashboardProps = PropsFromState & propsFromDispatch;

export const Dashboard: React.FC<DashboardProps> = () => {
    return (
        <div>
            <h1 className="large text-title">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome 
            </p>
        </div>
    )
}
