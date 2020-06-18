import React, { Fragment, useState, ChangeEvent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { UserLogin } from '../../types/user';
import { connect } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/user';
import { ApplicationState } from '../../reducers';

interface PropsFromState {
    isAuthenticated: boolean
}

interface propsFromDispatch {
    setAlert: (msg: any) => any;
    login: (email: string, password: string) => any;
}

type LoginProps = PropsFromState & propsFromDispatch;

const Login: React.FC<LoginProps> = ({isAuthenticated,login}) => {
    const [formData, setFromData] = useState<UserLogin>({
        corporateEmail: '',
        password: ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setFromData({...formData, [e.target.name]: e.target.value});
    } 

    async function handleSubmit (
        e: React.FormEvent<HTMLFormElement>
      ): Promise<void> {
        e.preventDefault();
        login(formData.corporateEmail,formData.password)
    };

     // redirect if logged in
     if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }
    
    return (
        <Fragment>
            <h1 className="large text-title">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                < input type="email" 
                        placeholder="Corporate Email" 
                        name="corporateEmail"
                        onChange = {handleChange}
                        required />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange = {handleChange}
                />
                </div>
                <input type="submit" className="btnn btn-primarys" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account?<Link to="/register">Sign Up</Link> 
            </p>
        </Fragment>
    )
}

const mapStateToProps = ({ user }: ApplicationState) => ({
    isAuthenticated: user.isAuthenticated,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): propsFromDispatch => {
    return {
      setAlert: (item) => {
         dispatch(setAlert(item));
      },
      login: (email,password) => {
          dispatch(login(email,password));
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);