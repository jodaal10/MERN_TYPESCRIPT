import React from 'react'
import { Alert } from '../../types/alert'
import { ApplicationState } from '../../reducers';
import { connect } from 'react-redux';

interface PropsFromState {
    data: Alert[];
}
interface propsFromDispatch {}
  
type AlertProps = PropsFromState & propsFromDispatch;

class AlertComponent extends React.Component<AlertProps> {

    constructor(prop:AlertProps) {
        super(prop)
        this.state = {
        }
    }
    render(){
        return (
            <div>
                {
                this.props.data !== null && 
                this.props.data.length > 0 && 
                this.props.data.map(alert =>(
                    <div key={alert.id} className ={`alert alert-${alert.alertType}`} > 
                        {alert.message}
                    </div>))
                }
            </div>
        )
    }
}

const mapStateToProps = ({ alert }: ApplicationState) => ({
    data: alert.data
  });

export default connect(mapStateToProps)(AlertComponent);
