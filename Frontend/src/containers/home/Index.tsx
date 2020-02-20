/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


import { AppState } from '../../redux/Index';
import { AuthState } from '../../redux/auth/Types';
import { FeedbackState } from '../../redux/feedback/Types';
import { fetchFeedback } from '../../redux/feedback/Actions'
import { API } from '../../utils/api/api';

export interface OwnProps {
  history: any;
}

interface StateProps {
  auth: AuthState;
  feedback: FeedbackState
}

interface DispatchProps {
  fetchFeedback: (studentId: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class HomePage extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
    }

    this.sendUpdateToCanvas = this.sendUpdateToCanvas.bind(this);
  }

  componentDidMount() {
    const { auth, fetchFeedback } = this.props;

    if (auth.user != null) {
      fetchFeedback(auth.user.id);
    }
  };

  sendUpdateToCanvas = () => {
    const { auth } = this.props;

    const studentId = auth.user != null ? auth.user.id : -1;
    API.Canvas.sendUpdateToCanvas(studentId)
      .then((response: AxiosResponse) => {
        console.error('data', response.data);

      })
      .catch((error: any) => {
        console.error('error', 'failed to send update to canvas!');
      })
  }

  render() {
    const { auth, feedback, fetchFeedback } = this.props;

    return (
      <div>
        {auth.user == null &&
          <p>Please <Link to="/login">login</Link> to view your feedback</p>}

        {auth.user &&
          <Container>
            <Row>
              <h2>Welcome, {auth.user.name}!</h2>
            </Row>

            <Row>
              <Col sm={8}>
                <h2>Feedback</h2>
                {
                  feedback.isFetching &&
                  <p>Loading Feedback</p>
                }
                {
                  !feedback.isFetching &&
                  feedback.feedback.map((item) => {
                    return (
                      <Card key={item.id} style={{ marginBottom: 5 }} body>{item.message}</Card>
                    );
                  })
                }
              </Col>
              <Col sm={4}>
                <h2>Actions</h2>
                <Button style={{ width: '100%' }} onClick={() => { this.sendUpdateToCanvas() }}>Simulate change to canvas</Button>
                <Button style={{ marginTop: 5, width: '100%' }} onClick={() => { fetchFeedback(auth.user != null ? auth.user.id : -1) }}>Fetch new feedback</Button>
              </Col>
            </Row>
          </Container>
        }
      </div>
    )
  };
}

const mapStateToProps = (store: AppState): StateProps => {
  return {
    auth: store.auth,
    feedback: store.feedback,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): DispatchProps => {
  return {
    fetchFeedback: (studentId: number) => dispatch(fetchFeedback(studentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
