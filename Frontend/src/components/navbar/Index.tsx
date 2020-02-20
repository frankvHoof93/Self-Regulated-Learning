/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { LinkContainer } from 'react-router-bootstrap'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { AppState } from '../../redux/Index';
import { fetchFeedback } from '../../redux/feedback/Actions';
import { AuthState } from '../../redux/auth/Types';
import { logoutUser } from '../../redux/auth/Actions';

export interface OwnProps {
  history: any;
}

interface StateProps {
  auth: AuthState;
}

interface DispatchProps {
  logoutUser: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const NavbarComponent = (props: Props) => {
  const { auth, logoutUser } = props;

  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand href="/">
          {' '}
            Proftaak S64 - 2
          </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-0">
          {
            !auth.user &&
            <LinkContainer to="/login">
              <Nav.Link>login</Nav.Link>
            </LinkContainer>
          }
          {
            auth.user &&
            <LinkContainer to="/#">
              <Nav.Link onClick={() => { logoutUser() }}>logout</Nav.Link>
            </LinkContainer>
          }

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (store: AppState): StateProps => {
  return {
    auth: store.auth,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): DispatchProps => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
