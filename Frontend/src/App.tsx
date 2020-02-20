/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux';

import Navbar from './components/navbar/Index';
import HomePage from './containers/home/Index';
import LoginPage from './containers/login/Index';
import { AuthState } from './redux/auth/Types';
import { AppState } from './redux/Index';


export interface OwnProps {
  history: any;
};
interface StateProps {
  auth: AuthState
}

type Props = OwnProps & StateProps;

const App = (props: Props) => {
  const { history, auth } = props;

  return (
    <ConnectedRouter history={history}>
      <Router>
        <Navbar history={history} />
        <div style={{ paddingTop: 20 }}>
          <Container>
            <Switch>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </Container>
        </div>
      </Router>
    </ConnectedRouter>
  )
}

const mapStateToProps = (store: AppState): StateProps => {
  return {
    auth: store.auth
  };
};

export default connect(mapStateToProps)(App);