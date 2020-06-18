import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../../actions/user';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import { userState } from '../../types/user';


interface PropsFromState {
    userstate: userState
}

interface propsFromDispatch {
    logout: () => any;
}
  
type NavarProps = PropsFromState & propsFromDispatch;

const Navbar: React.FC<NavarProps> = ({logout,userstate}) => {

    const authLinks = (
        <ul>
            <li><Link to='/categories'>Categories</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to='/progress'>Progress</Link></li>
            <li><Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
                <a onClick={logout} href="/">
                <i className="fas fa-sign-out-alt"></i>{' '}
                <span className="hide-sm">Logout</span> </a>
            </li>
        </ul>
    );
    
    const guestLinks = (
        <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
        <h1>
            <Link to="/"><i className="fas fa-home"></i> FollowUp</Link>
        </h1>
            {(<Fragment>{userstate.isAuthenticated? authLinks: guestLinks}</Fragment>) }
        </nav>
    )
};

const mapStateToProps = ({ user }: ApplicationState) => ({
    userstate: user
});


const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): propsFromDispatch => {
    return {
      logout: () => {
         dispatch(logout());
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);