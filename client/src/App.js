import React, {Component} from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import Home from './pages/home';

// to do ....
// change add photo to add post everywhere
// file upload form doesn't show msg .... check.. .form is submitted even on empty data.
// error handling if post with the exact same title exists

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
                  <Route path='/' component={Home} />
              </Switch>
            </Router>
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;