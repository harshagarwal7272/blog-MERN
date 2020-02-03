import React, {Component} from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import Home from './pages/home';
import Story from './pages/story';
import Author from './pages/author';
import Profile from './pages/profile';

// no automatic refresh of article upload.... fix it

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
                  <Route exact path='/' component={Home} />
                  <Route path='/story/:id' component={Story} />
                  <Route path='/author/:email' component={Author} />
                  <Route path='/profile' component={Profile} />
              </Switch>
            </Router>
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;