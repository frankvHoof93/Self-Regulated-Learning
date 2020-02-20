import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Redirect } from 'react-router-dom';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { AuthState } from '../../redux/auth/Types';
import { AppState } from '../../redux/Index';
import { User } from '../../utils/interfaces/User';
import { LoginUser } from '../../redux/auth/Actions';

export interface OwnProps {
  history: any;
}

interface StateProps {
  auth: AuthState
}

interface DispatchProps {
  loginUser: (user: User) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
  id: number,
  name: string,
}

class LoginPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
    }
  }

  render() {
    const { loginUser, auth } = this.props;
    const { id, name } = this.state;

    if (auth.user != null)
      return (<Redirect to={{ pathname: '/' }} />)

    return (
      <div>
        <Form>
          <Form.Group controlId="formStudentId">
            <Form.Label>Student Id</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter student id"
              value={this.state.id.toString()}
              onChange={(value: any) => this.setState({ id: value.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={this.state.name}
              onChange={(value: any) => this.setState({ name: value.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={() => { loginUser({ id, name }) }}>Login</Button>
        </Form>
      </ div>
    )
  }
}


const mapStateToProps = (store: AppState): StateProps => {
  return {
    auth: store.auth
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): DispatchProps => {
  return {
    loginUser: (user: User) => dispatch(LoginUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
