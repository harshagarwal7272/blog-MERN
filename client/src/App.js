import React, {Component} from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import Home from './pages/home';

// change the upload folder inside client

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