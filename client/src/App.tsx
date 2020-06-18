import React,{Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Redux
import {Provider} from 'react-redux';
import store from './store';

//components
import Navbar from './components/layout/Navbar';
import {Landing} from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AlertComponent from './components/layout/Alert';
import setAuthToken from './utils/setToken';
import { Dashboard } from './components/dashboard/Dashboard';
import { Course } from './components/general/Course';
import CategoryComponent from './components/general/Category';
import { Progress } from './components/general/Progress';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}   

interface MainProps {}

const App: React.FC<MainProps> = () => {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <Navbar/>
            <Route exact path='/' component={Landing} />
            <section className="container">
              <AlertComponent/>
              <Switch>
                <Route excat path="/register" component={Register} />
                <Route excat path="/login" component={Login} />
                <Route excat path="/dashboard" component={Dashboard} />
                <Route excat path="/courses" component={Course} />
                <Route excat path="/categories" component={CategoryComponent} />
                <Route excat path="/progress" component={Progress} />
              </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

