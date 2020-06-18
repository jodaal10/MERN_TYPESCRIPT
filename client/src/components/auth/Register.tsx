import React, { Fragment, useState, ChangeEvent } from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import { User } from '../../types/user';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/user';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../reducers';

interface PropsFromState {
    isAuthenticated: boolean 
}

interface propsFromDispatch {
    setAlert: (msg: any) => any;
    register: (user: User) => any;
}
  
type RegisterProps = PropsFromState & propsFromDispatch;

const Register: React.FC<RegisterProps> = ({isAuthenticated,register}) => {
    const [formData, setFromData] = useState<User>({
        firstName:'',
        lastName: '',
        corporateEmail: '',
        id: 0
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setFromData({...formData, [e.target.name]: e.target.value});
    } 

    async function handleSubmit (
        e: React.FormEvent<HTMLFormElement>
      ): Promise<void> {
        e.preventDefault();
        let user: User = formData;
        register(user);
    };

    // redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }
    
    return (
        <Fragment>
            <h1 className="large text-title">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" 
                           placeholder="First Name" 
                           name="firstName"
                           onChange = {handleChange}
                           required />
                </div>
                <div className="form-group">
                    <input type="text" 
                           placeholder="Last Name" 
                           name="lastName" 
                           onChange = {handleChange}
                           required />
                </div>
                <div className="form-group">
                <   input type="email" 
                          placeholder="Corporate Email" 
                          name="corporateEmail"
                          onChange = {handleChange}
                          required />
                </div>
                <input type="submit" className="btnn btn-primarys" value="Register" />
            </form>
            <p className="my-1">
                Already have an account?<Link to="/login">Sign In</Link> 
            </p>
        </Fragment>
    )
};


const mapStateToProps = ({ user }: ApplicationState) => ({
    isAuthenticated: user.isAuthenticated,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): propsFromDispatch => {
    return {
      setAlert: (item) => {
         dispatch(setAlert(item));
      },
      register: (user) => {
          dispatch(register(user));
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);
