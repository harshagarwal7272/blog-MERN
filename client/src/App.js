import React, {Component} from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import Entry from './components/Entry';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home';
import Posts from './pages/posts';
import Author from './pages/author';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
      <div>
        <Container>
            <Router>
              <Switch>
                  <Route exact path='/' component={Entry} />
                  <Route path='/home' component={Home} />
                  <Route path='/post' component={Posts} />
                  <Route path='/author' component={Author} />                  
                  <Route path='/register' component={Register} />
                  <Route path='/login' component={Login} />
              </Switch>
            </Router>
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;